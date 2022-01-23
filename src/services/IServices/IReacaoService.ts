import { Result } from "../../core/logic/Result";
import IReacaoDTO from "../../dto/IReacaoDTO";

export default interface IReacaoService {
    createReacao(reacaoDTO: IReacaoDTO): Promise<Result<IReacaoDTO>>;
    getReacoes(): Promise<Result<IReacaoDTO[]>>;
    getUserReacaoPost(userId: string,postId: string): Promise<Result<IReacaoDTO>>;
    getUserReacoesDiff(userId: string): Promise<Result<number>>;
    getUserReacoesDiffByUser(recetorId: string, emissorId: string): Promise<Result<number>>;
    getPostReacoes(postId: string): Promise<Result<IReacaoDTO[]>>;
}