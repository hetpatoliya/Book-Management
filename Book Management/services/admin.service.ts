import Admin from '../models/admin.model';
import { Iadmin } from '../interfaces/admin.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { constants } from '../utils/constants';

export class adminServices {

    public async signUp(admin: Iadmin): Promise<String> {

        const adminExist = await Admin.findOne({ username: admin.username });
        if (adminExist) {
            return constants.ADMIN_EXISTS;
        }

        const hashedPassword = await bcrypt.hash(admin.password.toString(), parseInt(process.env.SALT_ROUNDS!));
        const newAdmin = new Admin({ username: admin.username, password: hashedPassword });
        await newAdmin.save();
        return constants.ADMIN_SAVED;
    }

    public async login(admin: Iadmin): Promise<String> {

        const isAdmin = await Admin.findOne({ username: admin.username });
        if (!isAdmin) {
            return constants.ADMIN_NOT_EXISTS;
        }

        const isPassValid = await bcrypt.compare(admin.password.toString(), isAdmin.password.toString());
        if (!isPassValid) {
            return constants.PASSWORD_INVALID;
        }

        const token = jwt.sign({ adminId: isAdmin._id }, process.env.ADMIN_SECRET_KEY!, { expiresIn: '1h' });
        return `Admin login Successfull!
                Token : ${token}`;
    }
}