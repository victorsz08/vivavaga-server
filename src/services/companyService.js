import { v4 as uuidv4 } from 'uuid';
import { Users } from "../database/models/users.js";
import { Companies } from "../database/models/companies.js";
import { CustomError } from "../middlewares/CustomError.js";
import { Op } from 'sequelize';
import '../database/models/index.js';


export class CompanyService {
    async create(dto) {
        const { name, price_per_hour, city, state, userId } = dto;

        if(!name || !price_per_hour || !city || !state || !userId) {
            throw new CustomError("todos os campos são obrigatórios", 400);
        };

        const user = await Users.findOne({
            where: {
                id: userId
            },
            include: {
                model: Companies,
                as: "owner_company",
                attributes: ['id','name','price_per_hour']
            }
        });

        if(!user) {
            throw new CustomError("usuário não encontrado", 204);
        };

        const company = await Companies.create({
            id: uuidv4(),
            name: name,
            price_per_hour: price_per_hour,
            city: city,
            state: state
        });

        await company.setOwner_company(user);

        const newCompany = await Companies.findOne({
            where: {
                id: company.id
            },
            include: {
                model: Users,
                as: "owner_company",
                attributes: ["id","name","lastname","email"]
            }
        });

        return newCompany;
    };

    async getCompanies(query) {
        const { sort, order, page, perPage, search } = query;

        const perPageOptions = parseInt(perPage) || 10;
        const pageOptions = parseInt(page) || 1;

        const queryOptions = {
            order: [],
            limit: perPageOptions,
            offset: (pageOptions -1) / perPageOptions,
            where: {},
            include: {
                model: Users,
                as: "owner_company",
                attributes: ["id","name","lastname","email"]
            }
        };

        if(sort && order) {
            queryOptions.order.push([sort, order.toUpperCase()]);
        };

        if(search) {
            queryOptions.where = {
                name: { [Op.like] : `%${search}%` }
            }
        };

        const companies = await Companies.findAll(queryOptions);

        if(companies.length === 0) {
            throw new CustomError("nenhuma empresa encontrada", 204);
        };

        return companies;
    };

    async getCompanyById(id) {
        const company = await Companies.findOne({
            where: {
                id: id
            }
        });

        if(!company) {
            throw new CustomError("empresa não encontrada", 204);
        };

        return company;
    };

    async getCompanyByOwner(id) {
        const company = await Companies.findOne({
            where: {
                owner: id
            }
        });


        if(!company) {
            throw new CustomError("empresa não enconrada", 204);
        };

        return company;
    };

    async updateCompany(dto) {
        const { name, price_per_hour, city, state, id } = dto;

        const company = await this.getCompanyById(id);

        if(name) {
            company.name = name;
        };

        if(price_per_hour) {
            company.price_per_hour = price_per_hour;
        };

        if(city) {
            company.city = city;
        };

        if(state) {
            company.state = state;
        };

        await company.save();

        return company;
    };

    async deleteCompany(id) {
        const company = await this.getCompanyById(id);

        await Companies.destroy({
            where: {
                id: company.id
            }
        });

        return;
    };
};