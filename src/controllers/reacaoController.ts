import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";
import { BaseController } from "../core/infra/BaseController";
import { Result } from "../core/logic/Result";
import IReacaoDTO from "../dto/IReacaoDTO";
import IReacaoService from "../services/IServices/IReacaoService";
import IReacaoController from "./IControllers/IReacaoController";

@Service()
export default class ReacaoController extends BaseController implements IReacaoController {
    protected executeImpl(): Promise<any> {
        throw new Error('Method not implemented');
    }

    constructor(
        @Inject(config.services.reacao.name) private reacaoServiceInstance: IReacaoService
    ) {
        super();
    }
    
    public async createReacao(req: Request, res: Response, next: NextFunction) {
        try {
            const reacaoOrError = await this.reacaoServiceInstance.createReacao(req.body as IReacaoDTO) as Result<IReacaoDTO>;
            const reacaoDTO = reacaoOrError.getValue();
            return res.json(reacaoDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }
    
    public async getReacoes(req: Request, res: Response, next: NextFunction) {
        const reacoes = await this.reacaoServiceInstance.getReacoes();
        return res.json(reacoes).status(200);
    }
    
    public async getUserReacaoPost(req: Request, res: Response, next: NextFunction) {
        const reacao = await this.reacaoServiceInstance.getUserReacaoPost(req.params.userId,req.params.postId);
        return res.json(reacao).status(200);
    }

    public async getUserReacoesDiff(req: Request, res: Response, next: NextFunction) {
        const userReacoes = await this.reacaoServiceInstance.getUserReacoesDiff(req.params.userId);
        return res.json(userReacoes).status(200);
    }

    public async getUserReacoesDiffByUser(req: Request, res: Response, next: NextFunction) {
        const userReacoes = await this.reacaoServiceInstance.getUserReacoesDiffByUser(req.params.recetorId, req.params.emissorId);
        return res.json(userReacoes).status(200);
    }
    
    public async getPostReacoes(req: Request, res: Response, next: NextFunction) {
        throw new Error("Method not implemented.");
    }
}