import { Request, Response, NextFunction } from "express";
import { Document, Model, Mongoose } from "mongoose";
import { Inject, Service } from "typedi";
import { Logger } from "winston";
import { BaseController } from "../core/infra/BaseController";
import { IComentarioPersistence } from "../dataschema/IComentarioPersistence";
import { IPostPersistence } from "../dataschema/IPostPersistence";
import { IReacaoPersistence } from "../dataschema/IReacaoPersistence";
import mongoose from "mongoose";
import ITestController from "./IControllers/ITestController";

@Service()
export default class TestController extends BaseController implements ITestController {
    protected executeImpl(): Promise<any> {
        throw new Error('Method not implemented');
    }

    constructor(
        @Inject('postSchema') private postSchema: Model<IPostPersistence & Document>,
        @Inject('comentarioSchema') private comentarioSchema: Model<IComentarioPersistence & Document>,
        @Inject('reacaoSchema') private reacaoSchema: Model<IReacaoPersistence & Document>,
        @Inject('logger') private logger: Logger
    ) {
        super();
    }
    
    public async deleteAllRecords(req: Request, res: Response, next: NextFunction) {
        const collections = await mongoose.connection.db.collections();

        for (let collection of collections) {
            await collection.deleteMany({});
        }

        return res.json({ message: 'All documents removed.' }).status(200);
    }
}