import { Request } from "express";

export interface adminIdextended extends Request {
    adminId?: String
}

export interface authorIdextended extends Request {
    authorId?: String
}

export interface bookIdextended extends Request {
    bookId?: String
}

export interface categoryIdextended extends Request {
    categoryId?: String
}