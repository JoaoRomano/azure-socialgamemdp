import { Result } from "../../core/logic/Result";
import IComentarioDTO from "../../dto/IComentarioDTO";

export default interface IComentarioService {
    createComentario(comentarioDTO: IComentarioDTO): Promise<Result<IComentarioDTO>>;
    getComentarios(): Promise<Result<IComentarioDTO[]>>;
    getUserComentarios(userId: string): Promise<Result<IComentarioDTO[]>>;
    getPostComentarios(postId: string): Promise<Result<IComentarioDTO[]>>;
}