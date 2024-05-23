import { Request, Response } from "express";
import { AdminServices } from "../services/admin.service";
import { constants } from "../utils/constants";

const adminServices = new AdminServices();


export class AdminController {

    public async signUp(req: Request, res: Response): Promise<void> {
        try {
            const data = await adminServices.signUp(req.body);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS, message: error.message
            });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const data = await adminServices.login(req.body);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS, message: error.message
            });
        }
    }
}