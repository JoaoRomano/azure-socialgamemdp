import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { Comentario } from "../domain/Comentario/Comentario";
import { Tag } from "../domain/Shared/Tag";
import { Texto } from "../domain/Shared/Texto";
import IComentarioDTO from "../dto/IComentarioDTO";

export class ComentarioMap extends Mapper<Comentario> {
    
    public static toDTO( comentario: Comentario ): IComentarioDTO {
        var tags: string[] = []; 
        comentario.tags.forEach((tag) => tags.push(tag.value));
        return {
            id: comentario.id.toString(),
            userId: comentario.userId,
            postId: comentario.postId,
            texto: comentario.texto.value,
            tags: tags,
            data: comentario.data
        } as IComentarioDTO;
    }

    public static async toDomain (raw: any): Promise<Comentario> {
        const comentarioTextoOrError = Texto.create(raw.texto);
        const tagsOrError = [];
        raw.tags.forEach(tag => {
            tagsOrError.push(Tag.create(tag).getValue())
        });
        
        const userOrError = Comentario.create({
            userId: raw.userId,
            postId: raw.postId,
            texto: comentarioTextoOrError.getValue(),
            tags: tagsOrError,
            data: raw.data
        }, new UniqueEntityID(raw.domainId))
    
        userOrError.isFailure ? console.log(userOrError.error) : '';
        
        return userOrError.isSuccess ? userOrError.getValue() : null;
    }

    public static toPersistence (comentario: Comentario): any {
        const tags: string[] = [];
        comentario.tags.forEach(tag => tags.push(tag.value));
        const a = {
            domainId: comentario.id.toString(),
            userId: comentario.userId,
            postId: comentario.postId,
            texto: comentario.texto.value,
            tags: tags,
            data: comentario.data
        }
        return a;
    }
}