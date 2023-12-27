import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { Users } from "../database/models/users.js";
import { CustomError } from "../middlewares/CustomError.js";
import 'dotenv/config';

export class LoginService {
    async login(email, password) {
        if(!email || !password) {
            throw new CustomError("todos os campos são obrigatórios",400);
        };

        const user = await Users.findOne({
            where: {
                email: email
            }
        });

        if(!user) {
            throw new CustomError("email ou senha incorretos", 400);
        };

        const passCheck = await bcryptjs.compare(password, user.password);

        if(!passCheck) {
            throw new CustomError("email ou senha incorretos", 400);
        };

        const payload = jsonwebtoken.sign({
            id: user.id,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '1d' });

        return payload;
    };
};