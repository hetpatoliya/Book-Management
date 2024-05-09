import Author from '../models/author.model';
import { Iauthor } from '../interfaces/author.interface';
import { constants } from '../utils/constants';

export class authorService {

    public async createAuthor(author: Iauthor, adminId: String): Promise<{ statusCode: number, message: String }> {

        let statusCode: number, message: String;

        if (!author.name || !author.biography || !author.nationality) {
            statusCode = constants.ERROR_STATUS_CODE
            message = constants.ENTER_VALID_VALUES
            return { statusCode, message };
        }
        const newAuthor = new Author({ name: author.name, biography: author.biography, nationality: author.nationality, createdBy: adminId })
        await newAuthor.save();
        statusCode = constants.SUCCESS_STATUS_CODE;
        message = constants.AUTHOR_CREATED;
        return { statusCode, message };
    }

    public async getAllAuthors(): Promise<{ allAuthors: Iauthor[], statusCode: number }> {
        const allAuthors = await Author.find();
        const statusCode = constants.SUCCESS_STATUS_CODE;
        return { allAuthors, statusCode };
    }

    public async updateAuthor(author: Iauthor, authorId: String, adminId: String): Promise<{ statusCode: number, message: string }> {
        let isAuthor = await Author.findOne({ _id: authorId });
        let statusCode: number, message: string;

        if (!isAuthor) {
            statusCode = constants.ERROR_STATUS_CODE;
            message = constants.AUTHOR_NOT_EXISTS;
            return { statusCode, message };
        }

        isAuthor = await Author.findOneAndUpdate({ _id: authorId }, {
            $set: {
                name: author.name,
                biography: author.biography,
                nationality: author.nationality,
                updatedBy: adminId
            }
        }, { new: true });
        statusCode = constants.SUCCESS_STATUS_CODE;
        message = constants.AUTHOR_UPDATED;
        return { statusCode, message };
    }

    public async deleteAuthor(authorId: String): Promise<{ statusCode: number, message: string }> {

        const isAuthor = await Author.findOne({ _id: authorId });
        let statusCode: number, message: string;

        if (!isAuthor) {
            statusCode = constants.ERROR_STATUS_CODE
            message = constants.AUTHOR_NOT_EXISTS;
            return { statusCode, message };
        }

        statusCode = constants.SUCCESS_STATUS_CODE;
        message = constants.AUTHOR_DELETED;
        await Author.findOneAndDelete({ _id: authorId });
        return { statusCode, message };
    }

    public async getAllAuthorsPaginated(page: number = 1, limit: number = 10, searchQuery?: string, filters?: any): Promise<{ authors: Iauthor[], totalAuthors: number }> {
        let query: any = {};
        if (searchQuery) {
            query.name = { $regex: searchQuery, $options: 'i' };
        }
        if (filters) {
            if (filters.nationality) {
                query.nationality = filters.nationality;
            }
        }

        const authors = await Author.find(query)
            .populate('createdBy', 'username')
            .populate('updatedBy', 'username')
            .skip((page - 1) * limit)
            .limit(limit);
        const totalAuthors = await Author.countDocuments(query);

        return { authors, totalAuthors };
    }
}