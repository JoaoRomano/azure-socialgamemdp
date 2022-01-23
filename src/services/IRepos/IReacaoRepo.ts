import { Repo } from "../../core/infra/Repo";
import { Reacao } from "../../domain/Reacao/Reacao";

export default interface IReacaoRepo extends Repo<Reacao> {
	save(reacao: Reacao): Promise<Reacao>;
	findAll() : Promise<Reacao[]>;
	findUserReacaoPost(userId : string,postId : string): Promise<Reacao>
	findUserReacoes(userId : string) : Promise<Reacao[]>;
	findPostReacoes(postId : string) : Promise<Reacao[]>;
	findPostReacoesByUser(userId: string, postId : string) : Promise<Reacao[]>;
}