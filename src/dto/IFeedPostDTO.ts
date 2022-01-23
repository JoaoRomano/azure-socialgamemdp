import IComentarioDTO from "./IComentarioDTO";
import IReacaoDTO from "./IReacaoDTO";

export default interface IPostDTO {
    id: string,
    userId: string,
    texto: string,
    tags: string[],
    likes: number,
    dislikes: number,
    comentarios: IComentarioDTO[],
    data: Date
}