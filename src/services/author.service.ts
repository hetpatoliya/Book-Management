import { Author } from '../models/Author';
import { IAuthor } from '../interfaces/Author';
import { constants } from '../utils/constants';
import mongoose, { ObjectId } from 'mongoose';
import { injectable } from 'inversify';

@injectable()
export class AuthorService {

    public async createAuthor(author: IAuthor, adminId: string): Promise<{ statusCode: number, message: String, author?: IAuthor }> {

        if (!author.name || !author.biography || !author.nationality) {
            return { statusCode: constants.ERROR_STATUS_CODE, message: constants.ENTER_VALID_VALUES };
        }
        const adm = new mongoose.Schema.Types.ObjectId(adminId);
        const newAuthor = await Author.create({ ...author, createdBy: adm }) as unknown as IAuthor;
        return { statusCode: constants.SUCCESS_STATUS_CODE, message: constants.AUTHOR_CREATED, author: newAuthor };
    }

    public async getAllAuthors(): Promise<{ allAuthors: IAuthor[], statusCode: number }> {
        const allAuthors = await Author.find() as IAuthor[];
        return { allAuthors, statusCode: constants.SUCCESS_STATUS_CODE };
    }

    public async updateAuthor(author: IAuthor, authorId: String, adminId: String): Promise<{ statusCode: number, message: string, author?: IAuthor }> {
        let isAuthor = await Author.findOne({ _id: authorId }) as IAuthor;

        if (!isAuthor) {
            return { statusCode: constants.ERROR_STATUS_CODE, message: constants.AUTHOR_NOT_EXISTS };
        }

        isAuthor = await Author.findByIdAndUpdate(authorId, {
            ...author,
            updatedBy: adminId
        }, { new: true }) as IAuthor;

        // isAuthor = await Author.findByIdAndUpdate(isAuthor!._id, {
        //     name: author.name,
        //     biography: author.biography,
        //     nationality: author.nationality,
        //     updatedBy: adminId
        // });

        return { statusCode: constants.SUCCESS_STATUS_CODE, message: constants.AUTHOR_UPDATED, author: isAuthor };
    }

    public async deleteAuthor(authorId: String): Promise<{ statusCode: number, message: string }> {

        const isAuthor = await Author.findOne({ _id: authorId });
        let statusCode: number, message: string;

        if (!isAuthor) {
            return { statusCode: constants.ERROR_STATUS_CODE, message: constants.AUTHOR_NOT_EXISTS };
        }

        statusCode = constants.SUCCESS_STATUS_CODE;
        message = constants.AUTHOR_DELETED;
        await Author.findByIdAndDelete(authorId);
        return { statusCode: constants.SUCCESS_STATUS_CODE, message: constants.AUTHOR_DELETED };
    }

    public async getAllAuthorsPaginated(page: number = 1, limit: number = 10, searchQuery?: string, filters?: any): Promise<{ authors: any | IAuthor[], totalAuthors: number }> {
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