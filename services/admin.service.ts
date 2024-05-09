import Admin from '../models/admin.model';
import { Iadmin } from '../interfaces/admin.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { constants } from '../utils/constants';

export class adminServices {

    public async signUp(admin: Iadmin): Promise<{ statusCode: number, message: string }> {

        const adminExist = await Admin.findOne({ username: admin.username });
        let statusCode: number, message: string;
        if (adminExist) {
            statusCode = constants.ERROR_STATUS_CODE;
            message = constants.ADMIN_EXISTS;
            return { statusCode, message };
        }

        const hashedPassword = await bcrypt.hash(admin.password.toString(), parseInt(process.env.SALT_ROUNDS!));
        const newAdmin = new Admin({ username: admin.username, password: hashedPassword });
        await newAdmin.save();
        statusCode = constants.SUCCESS_STATUS_CODE;
        message = constants.ADMIN_SAVED;
        return { statusCode, message };
    }

    public async login(admin: Iadmin): Promise<{ statusCode: number, message: string, token?: string }> {

        const isAdmin = await Admin.findOne({ username: admin.username });
        let statusCode: number, message: string;
        if (!isAdmin) {
            statusCode = constants.ERROR_STATUS_CODE;
            message = constants.ADMIN_NOT_EXISTS;
            return { statusCode, message };
        }

        const isPassValid = await bcrypt.compare(admin.password.toString(), isAdmin.password.toString());
        if (!isPassValid) {
            statusCode = constants.ERROR_STATUS_CODE;
            message = constants.PASSWORD_INVALID;
            return { statusCode, message };
        }

        const token = jwt.sign({ adminId: isAdmin._id }, process.env.ADMIN_SECRET_KEY!, { expiresIn: '1h' });
        statusCode = constants.SUCCESS_STATUS_CODE;
        message = constants.ADMIN_LOGIN;
        return { statusCode, message, token };
    }
}