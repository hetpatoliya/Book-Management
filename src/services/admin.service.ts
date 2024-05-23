import { Admin } from '../models/Admin';
import { IAdmin } from '../interfaces/Admin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { constants } from '../utils/constants';
import { injectable } from 'inversify';

@injectable()
export class AdminServices {

    public async signUp(admin: IAdmin): Promise<{ statusCode: number, message: string, admin?: IAdmin }> {

        const adminExist = await Admin.findOne({ username: admin.username });

        if (adminExist) {
            return { statusCode: constants.ERROR_STATUS_CODE, message: constants.ADMIN_EXISTS };
        }

        const newAdmin = await Admin.create(admin) as IAdmin;
        return { statusCode: constants.SUCCESS_STATUS_CODE, message: constants.ADMIN_SAVED, admin: newAdmin };
    }

    public async login(admin: IAdmin): Promise<{ statusCode: number, message: string, token?: string }> {

        const isAdmin = await Admin.findOne({ username: admin.username });
        if (!isAdmin) {
            return { statusCode: constants.ERROR_STATUS_CODE, message: constants.ADMIN_NOT_EXISTS };
        }

        const isPassValid = await bcrypt.compare(admin.password.toString(), isAdmin.password!.toString());
        if (!isPassValid) {
            return { statusCode: constants.ERROR_STATUS_CODE, message: constants.PASSWORD_INVALID };
        }

        const token = jwt.sign({ adminId: isAdmin._id }, process.env.ADMIN_SECRET_KEY!, { expiresIn: '1h' });
        return { statusCode: constants.SUCCESS_STATUS_CODE, message: constants.ADMIN_LOGIN, token: token };
    }
}