//implementar depois quando for necessário chamar 
import { Container } from 'typedi';
import { Mapper } from "../core/infra/Mapper";


import IPostDTO from '../dto/IPostDTO';
import { Post } from '../domain/Post/Post';
import { Texto } from '../domain/Shared/Texto';
import { Tag } from '../domain/Shared/Tag';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import IFeedPostDTO from '../dto/IFeedPostDTO';
import ReacaoRepo from '../repos/reacaoRepo';
import ComentarioRepo from '../repos/comentarioRepo';
import { Comentario } from '../domain/Comentario/Comentario';
import { ComentarioMap } from './ComentarioMapper';


export class PostMap extends Mapper<Post> {

  public static toDTO(post: Post): IPostDTO {
    var tags: string[] = [];
    post.tags.forEach((tag) => tags.push(tag.value));
    return {
      id: post.id.toString(),
      userId: post.userId,
      texto: post.texto.value,
      tags: tags,
      data: post.data
    } as IPostDTO;
  }

  public static async toFeedPostDTO(post: Post): Promise<IFeedPostDTO> {
    //tags
    const tags: string[] = [];
    post.tags.forEach((tag) => tags.push(tag.value));
    //obter número de reacões reações
    const repoReacoes = Container.get(ReacaoRepo);
    const reacoes = await repoReacoes.findPostReacoes(post.id.toString());
    var likes = 0;
    var dislikes = 0;
    reacoes.forEach((reacao) => {
      if (reacao.like.value) {
        likes++;
      } else {
        dislikes++;
      }
    });
    //obter comentarios
    const repoComentarios = Container.get(ComentarioRepo);
    const comentarios = await repoComentarios.findPostComentarios(post.id.toString());
    const comentariosDTO = [];
    comentarios.forEach((comentario) => comentariosDTO.push(ComentarioMap.toDTO(comentario)));

    return {
      id: post.id.toString(),
      userId: post.userId,
      texto: post.texto.value,
      tags: tags,
      likes: likes,
      dislikes: dislikes,
      comentarios: comentariosDTO,
      data: post.data
    } as IFeedPostDTO;
  }


  public static async toDomain(raw: any): Promise<Post> {
    const postTextoOrError = Texto.create(raw.texto);
    const tagsOrError = [];
    raw.tags.forEach(tag => {
      tagsOrError.push(Tag.create(tag).getValue())
    });


    const userOrError = Post.create({
      userId: raw.userId,
      texto: postTextoOrError.getValue(),
      tags: tagsOrError,
      data: raw.data
    }, new UniqueEntityID(raw.domainId))

    userOrError.isFailure ? console.log(userOrError.error) : '';

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence(post: Post): any {
    const tags: string[] = [];
    post.tags.forEach(tag => tags.push(tag.value));
    const a = {
      domainId: post.id.toString(),
      userId: post.userId,
      texto: post.texto.value,
      tags: tags,
      data: post.data
    }
    return a;
  }
}