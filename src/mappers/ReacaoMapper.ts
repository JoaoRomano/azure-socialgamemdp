import { Mapper } from "../core/infra/Mapper";
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Reacao } from "../domain/Reacao/Reacao";
import IReacaoDTO from "../dto/IReacaoDTO";
import { Like } from "../domain/Reacao/Like";

export class ReacaoMap extends Mapper<Reacao> {

  public static toDTO(reacao: Reacao): IReacaoDTO {
    return {
        id: reacao.id.toString(),
        userId: reacao.userId,
        postId: reacao.postId,
        like: reacao.like.value
    } as IReacaoDTO;
  }

  public static async toDomain (raw: any): Promise<Reacao> {
    const reacaoLikeOrError = Like.create(raw.like);

    const reacaoOrError = Reacao.create({
        userId: raw.userId,
        postId: raw.postId,
        like: reacaoLikeOrError.getValue(),
    }, new UniqueEntityID(raw.domainId));

    reacaoOrError.isFailure ? console.log(reacaoOrError.error) : '';
    
    return reacaoOrError.isSuccess ? reacaoOrError.getValue() : null;
  }

  public static toPersistence (reacao: Reacao): any {
    const a = {
        domainId: reacao.id.toString(),
        userId: reacao.userId,
        postId: reacao.postId,
        like: reacao.like.value
    }
    return a;
  }
}