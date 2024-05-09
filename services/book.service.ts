import { Ibook } from '../interfaces/book.interface';
import Book from '../models/book.model';
import { constants } from '../utils/constants';

export class bookService {

    public async addBook(book: Ibook, adminId: String): Promise<{ statusCode: number, message: string }> {

        let statusCode: number, message: string;

        if (!book.title || !book.author || !book.category || !book.isbn || !book.description || !book.price) {
            statusCode = constants.ERROR_STATUS_CODE;
            message = constants.ENTER_VALID_VALUES;
            return { statusCode, message };
        }

        const newbook = new Book({
            title: book.title,
            author: book.author,
            category: book.category,
            isbn: book.isbn,
            description: book.description,
            price: book.price,
            createdBy: adminId
        });
        await newbook.save();
        statusCode = constants.SUCCESS_STATUS_CODE;
        message = constants.BOOK_ADDED;
        return { statusCode, message };
    }

    public async retrieveBook(): Promise<{ allBooks: Ibook[], statusCode: number }> {
        const allBooks = await Book.find();
        const statusCode = constants.SUCCESS_STATUS_CODE;
        return { allBooks, statusCode };
    }

    public async updateBook(book: Ibook, bookId: String, adminId: String): Promise<{ statusCode: number, message: string }> {
        const isBook = await Book.findOne({ _id: bookId });
        let statusCode: number, message: string;

        if (!isBook) {
            statusCode = constants.ERROR_STATUS_CODE;
            message = constants.BOOK_NOT_EXISTS;
            return { statusCode, message };
        }
        const updatedBook = await Book.findByIdAndUpdate({ _id: bookId }, {
            $set: {
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                category: book.category,
                description: book.description,
                price: book.price,
                updatedBy: adminId
            }
        }, { new: true });
        statusCode = constants.SUCCESS_STATUS_CODE;
        message = constants.BOOK_UPDATED;
        return { statusCode, message };
    }

    public async deleteBook(bookId: String): Promise<{ statusCode: number, message: string }> {

        const isBook = await Book.findOne({ _id: bookId });
        let statusCode: number, message: string;
        if (!isBook) {
            statusCode = constants.ERROR_STATUS_CODE;
            message = constants.BOOK_NOT_EXISTS;
            return { statusCode, message };
        }

        statusCode = constants.SUCCESS_STATUS_CODE;
        message = constants.BOOK_DELETED;
        await Book.findOneAndDelete({ _id: bookId });
        return { statusCode, message };
    }

    public async getAllBooksPaginated(page: number = 1, limit: number = 10, searchQuery?: string, filters?: any): Promise<{ books: Ibook[], totalBooks: number }> {
        let query: any = {};

        if (searchQuery) {
            query.title = { $regex: searchQuery, $options: 'i' };
        }

        if (filters) {
            if (filters.category) {
                query.category = filters.category;
            }
            if (filters.isbn) {
                query.isbn = filters.isbn;
            }
            if (filters.description) {
                query.description = filters.description;
            }
            if (filters.author) {
                query.author = filters.author;
            }
            if (filters.price) {
                query.price = filters.price;
            }
        }

        const books = await Book.find(query)
            .populate('author', 'name -_id')
            .populate('category', 'category')
            .populate('createdBy', 'username')
            .populate('updatedBy', 'username')
            .skip((page - 1) * limit)
            .limit(limit);
        const totalBooks = await Book.countDocuments(query);

        return { books, totalBooks };
    }
}