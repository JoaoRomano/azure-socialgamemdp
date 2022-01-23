import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import { Comentario } from "../domain/Comentario/Comentario";
import { Tag } from "../domain/Shared/Tag";
import { Texto } from "../domain/Shared/Texto";

import IComentarioDTO from "../dto/IComentarioDTO";
import { ComentarioMap } from "../mappers/ComentarioMapper";
import IComentarioRepo from "./IRepos/IComentarioRepo";
import IComentarioService from "./IServices/IComentarioService";

@Service()
export default class ComentarioService implements IComentarioService {
    constructor(
        @Inject(config.repos.comentario.name) private comentarioRepo: IComentarioRepo,
        @Inject('logger') private logger,
    ) { }
    
    public async createComentario(comentarioDTO: IComentarioDTO): Promise<Result<IComentarioDTO>> {
        try {
            const texto = Texto.create(comentarioDTO.texto).getValue();

            const tags: Tag[] = [];

            comentarioDTO.tags.forEach(
                tag => tags.push(Tag.create(tag).getValue())
            );

            const comentarioOrError = Comentario.create(
                {
                    userId: comentarioDTO.userId,
                    postId: comentarioDTO.postId,
                    texto: texto,
                    tags: tags,
                    data: comentarioDTO.data
                }
            )

            const comentarioResult = comentarioOrError.getValue();

            await this.comentarioRepo.save(comentarioResult);

            const comentarioDTOResult = ComentarioMap.toDTO(comentarioResult) as IComentarioDTO;

            return Result.ok<IComentarioDTO>(comentarioDTOResult);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
    
    public async getComentarios(): Promise<Result<IComentarioDTO[]>> {
        const comentariosDTO = [];
        const comentarios = await this.comentarioRepo.findAll();
       
        comentarios.forEach(comentario => comentariosDTO.push(ComentarioMap.toDTO(comentario)));

        return Result.ok<IComentarioDTO[]>(comentariosDTO);
    }
    
    public async getUserComentarios(userId: string): Promise<Result<IComentarioDTO[]>> {
        throw new Error("Method not implemented.");
    }
    
    public async getPostComentarios(postId: string): Promise<Result<IComentarioDTO[]>> {
        throw new Error("Method not implemented.");
    }

}