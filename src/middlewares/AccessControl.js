import { Companies } from "../database/models/companies.js";
import { Lots } from "../database/models/lots.js";



export const canCompany = async (req, res, next) => {
    const userId = req.user.id;
    const companyId = req.params.id;

    const company = await Companies.findOne({
        where: {
            id: companyId
        }
    });

    try {
        if(userId !== company.owner) {
            return res.status(401).send({message: "O usuário so pode alterar ou deletar os dados da propria empresa"});
        };

        next();
    } catch (err) {
        res.status(401).send({message:"Usuário não autorizado"});
    };
};

export const canUser = async (req, res, next) => {
    const userId = req.user.id;
    const id = req.params.id;

    try {
        if(userId !== id) {
            return res.status(401).send({message:"O usuário não tem permissão para alterar ou deletar os dados de outros usuários"});
        };

        next();
    } catch (err) {
        res.status(401).send({message: "Usuário não autorizado"});
    };
};


export const canLot = async (req, res, next) => {
    const userId = req.user.id;
    const lotId = req.params.id;

    const company = await Companies.findOne({
        where: {
            owner: userId
        }
    });

    const lot = await Lots.findOne({
        where: {
            id: lotId
        }
    });

    try {
        if(lot.company !== company.id) {
            return res.status(401).status({message: "O usuário não tem permissão de alterar dados de outros usuários"})
        }

        next();
    } catch (err) {
        res.status(401).send({message:"Usuário não Autorizado"});
    };
};




