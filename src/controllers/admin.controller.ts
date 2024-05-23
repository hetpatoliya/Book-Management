import { Request, Response } from "express";
import { AdminServices } from "../services/admin.service";
import { constants } from "../utils/constants";
import { controller, httpPost } from "inversify-express-utils";
import { inject } from 'inversify';

@controller('/admin')
export class AdminController {

    constructor(@inject(AdminServices) public adminServices: AdminServices) { }

    @httpPost('/signUp')
    public async signUp(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.adminServices.signUp(req.body);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS, message: error.message
            });
        }
    }

    @httpPost('/login')
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.adminServices.login(req.body);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS, message: error.message
            });
        }
    }
}