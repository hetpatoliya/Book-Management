import Author from '../models/author.model';
import { Iauthor } from '../interfaces/author.interface';
import { constants } from '../utils/constants';

export class authorService {

    public async createAuthor(author: Iauthor, adminId: String): Promise<String> {

        if(!author.name || !author.biography || !author.nationality){
            return constants.ENTER_VALID_VALUES;
        }
        const newAuthor = new Author({ name: author.name, biography: author.biography, nationality: author.nationality, createdBy: adminId })
        await newAuthor.save();
        return constants.AUTHOR_CREATED;
    }

    public async getAllAuthors(): Promise<Iauthor[]> {
        const authors = await Author.find();
        return authors;
    }

    public async updateAuthor(author: Iauthor, authorId: String, adminId: String): Promise<String> {
        let isAuthor = await Author.findOne({ _id: authorId });

        if (!isAuthor) {
            return constants.AUTHOR_NOT_EXISTS;
        }

        isAuthor = await Author.findOneAndUpdate({ _id: authorId }, {
            $set: {
                name: author.name,
                biography: author.biography,
                nationality: author.nationality,
                updatedBy: adminId
            }
        }, { new: true })
        return constants.AUTHOR_UPDATED;
    }

    public async deleteAuthor(authorId: String): Promise<String> {

        const isAuthor = await Author.findOne({ _id: authorId });

        if (!isAuthor) {
            return constants.AUTHOR_NOT_EXISTS;
        }

        await Author.findOneAndDelete({ _id: authorId });
        return constants.AUTHOR_DELETED;
    }

    // public async getAllAuthorsPaginated(page: number, limit: number): Promise<Iauthor[]> {
    //     const skip = (page - 1) * limit;
    //     const authors = await Author.find().skip(skip).limit(limit);
    //     return authors;
    // }

    // public async searchAuthors(query: string): Promise<Iauthor[]> {
    //     const searchResults = await Author.find({
    //         $or: [
    //             { name: { $regex: query, $options: 'i' } },
    //             { biography: { $regex: query, $options: 'i' } },
    //             { nationality: { $regex: query, $options: 'i' } }
    //         ]
    //     });
    //     return searchResults;
    // }

    // async filterAuthorsByNationality(nationality: string): Promise<Iauthor[]> {
    //     const filteredAuthors = await Author.find({ nationality });
    //     return filteredAuthors;
    // }

    public async getAllAuthorsPaginated(page: number = 1, limit: number = 10, searchQuery?: string, filters?: any): Promise<{ authors: Iauthor[], totalAuthors: number }> {
        let query: any = {};
        if (searchQuery) {
            query.name = { $regex: searchQuery, $options: 'i' };
        }
        if (filters) {
            if (filters.nationality) {
                query.nationality = filters.nationality;
            }
            // if (filters.biography) {
            //     query.biography = filters.biography;
            // }
        }

        const authors = await Author.find(query)
            .populate('createdBy', 'username')
            .populate('updatedBy', 'username')
            .skip((page - 1) * limit)
            .limit(limit);
        const totalAuthors = await Author.countDocuments(query);

        return { authors, totalAuthors };
    }

    // public async signUpAuthor(author:Iauthor,authorId:String):Promise<String>{
    //     const isAuthorHasUsername = await Author.findOne({_id:authorId});
    //     if(isAuthorHasUsername.username)
    //     return constants.AUTHOR_SIGNUP;
    // }
}