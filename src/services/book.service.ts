import { IBook } from '../interfaces/Book';
import { Book } from '../models/Book';
import { constants } from '../utils/constants';
import { injectable } from 'inversify';

@injectable()
export class BookService {

    public async addBook(book: IBook, adminId: String): Promise<{ statusCode: number, message: string, book?: IBook }> {

        if (!book.title || !book.author || !book.category || !book.isbn || !book.description || !book.price) {
            return { statusCode: constants.ERROR_STATUS_CODE, message: constants.ENTER_VALID_VALUES };
        }

        const newbook = Book.create({
            ...book,
            createdBy: adminId
        }) as unknown as IBook;
        return { statusCode: constants.SUCCESS_STATUS_CODE, message: constants.BOOK_ADDED, book: newbook };
    }

    public async retrieveBook(): Promise<{ allBooks: IBook[], statusCode: number }> {
        const allBooks = await Book.find() as IBook[];
        return { allBooks, statusCode: constants.SUCCESS_STATUS_CODE };
    }

    public async updateBook(book: IBook, bookId: String, adminId: String): Promise<{ statusCode: number, message: string, book?: IBook }> {
        const isBook = await Book.findOne({ _id: bookId });

        if (!isBook) {
            return { statusCode: constants.ERROR_STATUS_CODE, message: constants.BOOK_NOT_EXISTS };
        }
        const updatedBook = await Book.findByIdAndUpdate(bookId, {
            ...book,
            updatedBy: adminId
        }, { new: true }) as IBook;

        return { statusCode: constants.SUCCESS_STATUS_CODE, message: constants.BOOK_UPDATED, book: updatedBook };
    }

    public async deleteBook(bookId: String): Promise<{ statusCode: number, message: string }> {

        const isBook = await Book.findOne({ _id: bookId });
        if (!isBook) {
            return { statusCode: constants.ERROR_STATUS_CODE, message: constants.BOOK_NOT_EXISTS };
        }

        await Book.findOneAndDelete({ _id: bookId });
        return { statusCode: constants.SUCCESS_STATUS_CODE, message: constants.BOOK_DELETED };
    }

    public async getAllBooksPaginated(page: number = 1, limit: number = 10, searchQuery?: string, filters?: any): Promise<{ statusCode: number, books: any | IBook[], totalBooks: number }> {
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

        return { statusCode: constants.SUCCESS_STATUS_CODE, books, totalBooks };
    }
}