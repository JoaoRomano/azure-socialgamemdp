import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";
import { BaseController } from "../core/infra/BaseController";
import { Result } from "../core/logic/Result";
import IComentarioDTO from "../dto/IComentarioDTO";

import IComentarioService from "../services/IServices/IComentarioService";
import IComentarioController from "./IControllers/IComentarioController";

@Service()
export default class ComentarioController extends BaseController implements IComentarioController {
    protected executeImpl(): Promise<any> {
        throw new Error('Method not implemented');
    }

    constructor(
        @Inject(config.services.comentario.name) private comentarioServiceInstance: IComentarioService
    ) {
        super();
    }
    
    public async createComentario(req: Request, res: Response, next: NextFunction) {
        try {
            const comentarioOrError = await this.comentarioServiceInstance.createComentario(req.body as IComentarioDTO) as Result<IComentarioDTO>;
            const comentarioDTO = comentarioOrError.getValue();
            return res.json(comentarioDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }
    
    public async getComentarios(req: Request, res: Response, next: NextFunction) {
        const comentarios = await this.comentarioServiceInstance.getComentarios();
        return res.json(comentarios).status(200);
    }
    
    public async getUserComentarios(req: Request, res: Response, next: NextFunction) {
        throw new Error("Method not implemented.");
    }
    
    public async getPostComentarios(req: Request, res: Response, next: NextFunction) {
        throw new Error("Method not implemented.");
    }
}