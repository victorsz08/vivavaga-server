import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';


export const auth = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).send({message:"token não informado"});
    };

    const [, accessToken] = token.split(" ");

    try {
        jsonwebtoken.verify(accessToken, process.env.SECRET_KEY);

        const decoded = jsonwebtoken.decode(accessToken);

        req.user = decoded;

        next();
    } catch (err) {
        res.status(401).send({message: "usuário não autorizado"});
    };
};