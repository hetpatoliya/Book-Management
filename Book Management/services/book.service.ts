import { Ibook } from '../interfaces/book.interface';
import Book from '../models/book.model';
import { constants } from '../utils/constants';

export class bookService {

    public async addBook(book: Ibook, adminId: String): Promise<String> {

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
        return constants.BOOK_ADDED;
    }

    public async retrieveBook(): Promise<Ibook[]> {
        const books = await Book.find();
        return books;
    }

    // public async getAllBooksPaginated(page: number, limit: number): Promise<Ibook[]> {
    //     const skip = (page - 1) * limit;
    //     const books = await Book.find().skip(skip).limit(limit);
    //     return books;
    // }

    public async updateBook(book: Ibook, bookId: String, adminId: String): Promise<String> {
        const isBook = await Book.findOne({ _id: bookId });

        if (!isBook) {
            return constants.BOOK_NOT_EXISTS;
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
        return constants.BOOK_UPDATED;
    }

    public async deleteBook(bookId: String): Promise<String> {

        const isBook = await Book.findOne({ _id: bookId });
        if (!isBook) {
            return constants.BOOK_NOT_EXISTS;
        }
        await Book.findOneAndDelete({ _id: bookId });
        return constants.BOOK_DELETED;
    }

    // public async searchBooks(id: string, query: string): Promise<Ibook[]> {
    //     const searchResults = await Book.find({
    //         $and: [
    //             { userId: id },
    //             {
    //                 $or: [
    //                     { title: { $regex: query, $options: 'i' } },
    //                     { description: { $regex: query, $options: 'i' } },
    //                     { author: { $regex: query, $options: 'i' } },
    //                     { category: { $regex: query, $options: 'i' } }
    //                 ]
    //             }
    //         ]
    //     });
    //     return searchResults;
    // }

    // async filterBooksByCategory(category: string): Promise<Ibook[]> {
    //     const filteredBooks = await Book.find({ category });
    //     return filteredBooks;
    // }

    public async getAllBooksPaginated(page: number = 1, limit: number = 10, searchQuery?: string, filters?: any): Promise<{ books: Ibook[], totalBooks: number }> {
        let query: any = {};
        
        if (searchQuery) {
            query.title = { $regex: searchQuery, $options: 'i' };
        }
        
        if (filters) {
            if (filters.category) {
                query.category = filters.category;
            }
            // if (filters.title) {
            //     query.title = filters.title;
            // }
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
            .populate('author', 'name')
            .populate('category', 'category')
            .populate('createdBy', 'username')
            .populate('updatedBy', 'username') 
            .skip((page - 1) * limit)
            .limit(limit);
        const totalBooks = await Book.countDocuments(query);

        return { books, totalBooks };
    }
}