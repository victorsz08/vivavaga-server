import { LotService } from "../services/lotService.js";
import { CustomError } from "../middlewares/CustomError.js";

const lotService = new LotService();

export class LotController {
    static async create(req, res) {
        const { client, plate, type_vehicle } = req.body;
        const { id } = req.params;

        try {
            const lot = await lotService.create({ id, client, plate, type_vehicle });
            res.status(201).send(lot);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message:err.message});
            };
            res.status(500).send({message:"Erro interno"+err.message});
        };
    };

    static async getLotsByCompany(req, res) {
        const { id } = req.params;
        const query = req.query;

        try {
            const lots = await lotService.getLotsByCompany({id, query});
            res.status(200).send(lots);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message:err.message});
            };
            res.status(500).send({message:"Erro interno"+err.message});
        };
    };

    static async getLotById(req, res) {
        const { id } = req.params;

        try {
            const lot = await lotService.getLotById(id);
            res.status(200).send(lot);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message:err.message});
            };
            res.status(500).send({message:"Erro interno"+err.message});
        };
    };

    static async closeLot(req, res) {
        const { id } = req.params;
        const { status } = req.body;

        try {
            const lot = await lotService.closeLot({id,status});
            res.status(200).send(lot);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message:err.message});
            };
            res.status(500).send({message:"Erro interno"+err.message});
        };
    };

    static async updateLot(req, res) {
        const { id } = req.params;
        const { client, plate, type_vehicle } = req.body;

        try {
            const lot = await lotService.updateLot({ id, client, plate, type_vehicle });
            res.status(200).send(lot);
        } catch (err) {
            if(err instanceof CustomError) {
                return res.status(err.statusCode).send({message:err.message});
            };
            res.status(500).send({message:"Erro interno"+err.message});
        };
    };
};

