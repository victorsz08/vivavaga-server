import { CompanyService } from "../services/companyService.js";
import { CustomError } from "../middlewares/CustomError.js";

const companyService = new CompanyService();

export class CompanyController {
    static async create(req, res) {
        const { name, price_per_hour, city, state } = req.body;
        const userId = req.user.id;

        try {
            const company = await companyService.create({ name, price_per_hour, city, state, userId });
            res.status(201).send(company);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message:err.message});
            };
            res.status(500).send({message:"Erro Interno" + err.message});
        };
    };

    static async getCompanies(req, res) {
        const query = req.query;

        try {
            const companies = await companyService.getCompanies(query);
            res.status(200).send(companies);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message:err.message});
            };
            res.status(500).send({message:"Erro Interno" + err.message});  
        };
    };

    static async getCompanyById(req, res) {
        const { id } = req.params;

        try {
            const company = await companyService.getCompanyById(id);
            res.status(200).send(company);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message:err.message});
            };
            res.status(500).send({message:"Erro Interno" + err.message});  
        };
    };

    static async getCompanyByOwner(req, res) {
        const id = req.user.id;
        
        try {
            const company = await companyService.getCompanyByOwner(id);
            res.status(200).send(company);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message:err.message});
            };
            res.status(500).send({message:"Erro Interno" + err.message});  
        };
    };

    static async updateCompany(req, res) {
        const { name, price_per_hour, city, state } = req.body;
        const { id } = req.params;

        try {
            const company = await companyService.updateCompany({ id, name, price_per_hour, city, state });
            res.status(200).send(company);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message:err.message});
            };
            res.status(500).send({message:"Erro Interno" + err.message});
        };
    };

    static async deleteCompany(req, res) {
        const { id } = req.params;

        try {
            await companyService.deleteCompany(id);
            res.status(200).send({message:"empresa deletada"});
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message:err.message});
            };
            res.status(500).send({message:"Erro Interno" + err.message});
        };
    };
};