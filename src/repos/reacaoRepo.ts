import { Console } from "console";
import { Document, FilterQuery, Model } from "mongoose";
import { Inject, Service } from "typedi";
import { IReacaoPersistence } from "../dataschema/IReacaoPersistence";
import { Reacao } from "../domain/Reacao/Reacao";
import { ReacaoMap } from "../mappers/ReacaoMapper";
import IReacaoRepo from "../services/IRepos/IReacaoRepo";
import ReacaoService from "../services/reacaoService";

@Service()
export default class ReacaoRepo implements IReacaoRepo {
    private models: any;

    constructor(
        @Inject('reacaoSchema') private reacaoSchema: Model<IReacaoPersistence & Document>,
        @Inject('logger') private logger
    ) { }
    public async findUserReacaoPost(userId: string, postId: string): Promise<Reacao> {
        const query = { postId: postId, userId: userId };
        const roleRecord = await this.reacaoSchema.findOne(query as FilterQuery<IReacaoPersistence & Document>);
        
        if (roleRecord != null || roleRecord != undefined) {
            return ReacaoMap.toDomain(roleRecord);
        }
        return null;
    }


    public async save(reacao: Reacao): Promise<Reacao> {
        try {
            const rawReacao: any = ReacaoMap.toPersistence(reacao);
            const reacaoCreated = await this.reacaoSchema.create(rawReacao);
            return ReacaoMap.toDomain(reacaoCreated);
        } catch (err) {
            throw err;
        }
    }

    public async findAll(): Promise<Reacao[]> {
        var reacoes: Reacao[] = [];
        const pesquisa = (await this.reacaoSchema.find()).values();

        var reacao = pesquisa.next();

        while (reacao.value != undefined) {
            reacoes.push((await ReacaoMap.toDomain(reacao.value)) as Reacao);
            reacao = pesquisa.next();
        }

        return reacoes;
    }

    public async findUserReacoes(userId: string): Promise<Reacao[]> {
        var reacoes: Reacao[] = [];
        const query = { userId: userId };
        const pesquisa = (await this.reacaoSchema.find(query)).values();

        var reacao = pesquisa.next();

        while (reacao.value != undefined) {
            reacoes.push((await ReacaoMap.toDomain(reacao.value)) as Reacao);
            reacao = pesquisa.next();
        }
        return reacoes;
    }

    public async findPostReacoes(postId: string): Promise<Reacao[]> {
        var reacoes: Reacao[] = [];
        const query = { postId: postId };
        const pesquisa = (await this.reacaoSchema.find(query)).values();

        var reacao = pesquisa.next();

        while (reacao.value != undefined) {
            reacoes.push((await ReacaoMap.toDomain(reacao.value)) as Reacao);
            reacao = pesquisa.next();
        }
        return reacoes;
    }

    public async findPostReacoesByUser(userId: string, postId: string): Promise<Reacao[]> {
        var reacoes: Reacao[] = [];
        const query = { postId: postId, userId: userId };
        const pesquisa = (await this.reacaoSchema.find(query)).values();

        var reacao = pesquisa.next();

        while (reacao.value != undefined) {
            reacoes.push((await ReacaoMap.toDomain(reacao.value)) as Reacao);
            reacao = pesquisa.next();
        }
        return reacoes;
    }

    public async exists(t: Reacao): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}