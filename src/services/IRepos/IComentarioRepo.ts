import { Repo } from "../../core/infra/Repo";
import { Comentario } from "../../domain/Comentario/Comentario";

export default interface IComentarioRepo extends Repo<Comentario> {
	save(comentario: Comentario): Promise<Comentario>;
	findAll() : Promise<Comentario[]>;
	findUserComentarios(userId : string) : Promise<Comentario[]>;
	findPostComentarios(postId : string) : Promise<Comentario[]>;
}