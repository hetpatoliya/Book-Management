import { Request, Response } from "express";
import { adminServices } from "../services/admin.service";
import { constants } from "../utils/constants";

const admins = new adminServices();


export class adminController {

    public async signUp(req: Request, res: Response): Promise<void> {
        try {
            const data = await admins.signUp(req.body);
            res.json({ message: data });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS, message: error.message
            });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const data = await admins.login(req.body);
            res.json({ message: data });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS, message: error.message
            });
        }
    }
}