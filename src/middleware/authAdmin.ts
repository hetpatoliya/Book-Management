import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { IRequestExtended } from "../interfaces/Other";
import { constants } from "../utils/constants";

const authenticateAdmin = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: constants.MISSING_TOKEN });
    }

    jwt.verify(token.split(' ')[1], process.env.ADMIN_SECRET_KEY!, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: constants.INVALID_TOKEN });
        }

        req.adminId = (decoded as { adminId: string }).adminId;
        next();
    });
}

export default authenticateAdmin;