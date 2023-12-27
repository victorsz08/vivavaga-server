import { UserService } from "../services/userService.js";
import { CustomError } from "../middlewares/CustomError.js";

const userService = new UserService();

export class UserController {
    static async create(req, res) {
        const { name, lastname, email, password } = req.body;

        try {
            await userService.create({ name, lastname, email, password });
            res.status(201).send({message: "Cadastro Concluído"});
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message: err.message});
            };

            res.status(500).send({message:"Erro Interno" + err.message});
        };
    };

    static async getUsers(req, res) {
        const query = req.query;

        try {
            const users = await userService.getUsers(query);
            res.status(200).send(users);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message: err.message});
            };

            res.status(500).send({message:"Erro Interno" + err.message});
        };
    };

    static async getUserById(req, res) {
        const { id } = req.params;
        

        try {
            const user = await userService.getUserById(id);
            res.status(200).send(user);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message: err.message});
            };

            res.status(500).send({message:"Erro Interno" + err.message});
        };
    };

    static async updateUser(req, res) {
        const { id } = req.params;
        const { name, lastname, email } = req.body;

        try {
            const user = await userService.updateUser({ id, name, lastname, email });
            res.status(200).send(user);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message: err.message});
            };

            res.status(500).send({message:"Erro Interno" + err.message});
        };
    };

    static async deleteUser(req, res) {
        const { id } = req.params;

        try {
            await userService.deleteUser(id);
            res.status(200).send({message: "usuário deletado"});
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message: err.message});
            };

            res.status(500).send({message:"Erro Interno" + err.message});
        };
    };
};