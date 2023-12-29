import { LoginService } from "../services/loginService.js";
import { CustomError } from "../middlewares/CustomError.js";

const loginService = new LoginService();

export class LoginController {
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const payload = await loginService.login(email, password);
            res.cookie('email', email, { httpOnly: true });
            res.status(200).send(payload);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message:err.message});
            };
            
            res.status(500).send({message:"Erro Interno" + err.message});
        };
    };
};