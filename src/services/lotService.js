import { CustomError } from "../middlewares/CustomError.js";
import { Companies } from "../database/models/companies.js";
import { Lots } from "../database/models/lots.js";
import moment from "moment";


export class LotService {
    async create(dto) {
        const { client, plate, type_vehicle, id } = dto;

        if(!client || !plate || !type_vehicle) {
            throw new CustomError("todos os campos são obrigatórios", 400);
        };

        const company = await Companies.findOne({
            where: {
                id: id
            },
            include: {
                model: Lots,
                as: "company_lot"
            }
        });

        if(!company) {
            throw new CustomError("empresa não encontrada", 204);
        };

        const pricePerHour = company.price_per_hour;

        const lot = await Lots.create({
            client: client,
            plate: plate,
            price: pricePerHour,
            type_vehicle: type_vehicle
        });

        console.log(lot)

        await lot.setCompany_lot(company);

        const newLot = await Lots.findOne({
            where: {
                id: lot.id
            },
            include: {
                model: Companies,
                as: "company_lot",
                attributes: ["id","name","price_per_hour","city","state"]
            }
        });

        return newLot;
    };

    async getLotsByCompany(dto) {
        const { id, query } = dto;
        const { sort, order, page, perPage } = query;
        console.log(id)

        const pageOptions = parseInt(page) || 1;
        const perPageOptions = parseInt(perPage) || 10;

        const queryOptions = {
            order: [],
            offset: (pageOptions -1) / perPageOptions,
            limit: perPageOptions,
            where: {
                company: id
            }
        };

        if(sort && order) {
            queryOptions.order.push([sort, order.toUpperCase()]);
        };

        const lots = await Lots.findAll(queryOptions);

        if(!lots) {
            throw new CustomError("nenhum registro de estacionamento", 204);
        };

        return lots;
    };

    async getLotById(id) {
        const lot = await Lots.findOne({
            were: {
                id: id
            },
            include: {
                model: Companies,
                as: "company_lot",
                attributes: ["id","name","city","state","price_per_hour"]
            }
        });

        if(!lot) {
            throw new CustomError("registro de estacionamento não encontrado", 204);
        };

        return lot;
    };

    async updateLot(dto) {
        const { client, plate, type_vehicle, id } = dto;

        const lot = await Lots.findOne({
            where: {
                id: id
            }
        });

        if(!lot) {
            throw new CustomError("registro não encontrado", 204);
        };

        if(client) {
            lot.client = client;
        };

        if(plate) {
            lot.plate = plate;
        };
        
        if(type_vehicle) {
            lot.type_vehicle = type_vehicle;
        };

        await lot.save();

        return lot;
    };

    async closeLot(dto) {
        const { id, status } = dto;


        const lot = await Lots.findOne({
            where: {
                id: id
            },
            include: {
                model: Companies,
                as: "company_lot",
                attributes: ["price_per_hour"]
            }
        });


        if(!lot) {
            throw new CustomError("registro não encontrado", 204);
        };

        if(status) {
            lot.status = status;
        };


        const createdAt = moment(lot.created_at);

        const totalHours = moment().diff(createdAt, 'hours');

        const pricePerHour = lot.company_lot.price_per_hour;

        if(totalHours > 1) {
            lot.price = totalHours * pricePerHour;
        }

        lot.price = pricePerHour;



        await lot.save();

        return lot;
    };

}