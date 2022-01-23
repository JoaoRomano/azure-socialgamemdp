import { Document, Model } from "mongoose";
import { Inject, Service } from "typedi";
import { IComentarioPersistence } from "../dataschema/IComentarioPersistence";
import { Comentario } from "../domain/Comentario/Comentario";
import { ComentarioMap } from "../mappers/ComentarioMapper";
import IComentarioRepo from "../services/IRepos/IComentarioRepo";

@Service()
export default class ComentarioRepo implements IComentarioRepo {
    private models: any;

    constructor(
        @Inject('comentarioSchema') private comentarioSchema: Model<IComentarioPersistence & Document>,
        @Inject('logger') private logger
    ) { }
    
    public async save(comentario: Comentario): Promise<Comentario> {
        try {
            const rawComentario: any = ComentarioMap.toPersistence(comentario);
            const postCreated = await this.comentarioSchema.create(rawComentario);
            return ComentarioMap.toDomain(postCreated);
        } catch (err) {
            throw err;
        }
    }
    
    public async findAll(): Promise<Comentario[]> {
        var comentarios: Comentario[] = [] ;
        const pesquisa = (await this.comentarioSchema.find()).values();

        var comentario = pesquisa.next();

        while(comentario.value != undefined){
            comentarios.push((await ComentarioMap.toDomain(comentario.value)) as Comentario);
            comentario = pesquisa.next();
        }

        return comentarios ;
    }
    
    public async findUserComentarios(userId: string): Promise<Comentario[]> {
        var comentarios: Comentario[] = [];
        const query = { userId: userId };
        const pesquisa = (await this.comentarioSchema.find(query)).values();

        var comentario = pesquisa.next();

        while (comentario.value != undefined) {
            comentarios.push((await ComentarioMap.toDomain(comentario.value)) as Comentario);
            comentario = pesquisa.next();
        }
        return comentarios;
    }
    
    public async findPostComentarios(postId: string): Promise<Comentario[]> {
        var comentarios: Comentario[] = [];
        const query = { postId: postId };
        const pesquisa = (await this.comentarioSchema.find(query)).values();

        var comentario = pesquisa.next();

        while (comentario.value != undefined) {
            comentarios.push((await ComentarioMap.toDomain(comentario.value)) as Comentario);
            comentario = pesquisa.next();
        }
        return comentarios;
    }
    
    public async exists(t: Comentario): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}