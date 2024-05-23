import { Request } from "express";

export interface IRequestExtended extends Request {
    adminId?: string,
    categoryId?: string,
    bookId?: string,
    authorId?: string,
}