import { Users } from "../database/models/users.js";
import bcryptjs from "bcryptjs"; 
import { CustomError } from "../middlewares/CustomError.js";
import { v4 as uuidv4 } from "uuid";
import '../database/models/index.js';




export class UserService {
    async create(dto) {
        const { name, lastname, email, password } = dto;

        if(!name || !lastname || !email || !password){
            throw new CustomError("Todos os campos são obrigatórios", 400);
        };

        const emailExists = await Users.findOne({
            where: { email: email}
        });

        if(emailExists){
            throw new CustomError("email indisponível", 400);
        };

        const passHash = await bcryptjs.hash(password, 10);

        await Users.create({
            id: uuidv4(),
            name: name,
            lastname: lastname,
            email: email,
            password: passHash
        });

        return;
    };

    async getUsers(query) {
        const { sort, order, page, perPage } = query;

        const perPageOptions = parseInt(perPage) || 10;
        const pageOptions = parseInt(page) || 1;

        const queryOptions = {
            order: [],
            offset: (pageOptions -1) / perPageOptions,
            limit: perPageOptions,
            attributes: { exclude: ['password'] }
        };

        if(sort && order) {
            queryOptions.push([sort,order]);
        };

        const users = await Users.findAll(queryOptions);

        if(users.length === 0) {
            throw new CustomError("nenhum usuário encontrado", 204);
        };

        return users;

    }

    async getUserById(id) {
        const user = await Users.findOne({
            where: { id: id },
            attributes: { exclude: ['password']}
        });

        if(!user) {
            throw new CustomError("usuário não encontrado", 204);
        };

        return user;
    };

    async updateUser(dto) {
        const { name, lastname, email, id } = dto;

        const user = await this.getUserById(id);

        if(email !== user.email) {
            const emailExists = await Users.findOne({
                where: { email: email }
            });

            if(emailExists) {
                throw new CustomError("email indisponível", 400);
            };

            user.email = email;
        };

        if(name) {
            user.name = name
        };

        if(lastname) {
            user.lastname = lastname
        };

        return user;
    };

    async deleteUser(id) {
        const user = await this.getUserById(id);

        await Users.destroy({
            where: {
                 id: user.id 
            }
        });

        return;
    };
};
