import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Texto } from "../Shared/Texto";
import { Tag } from "../Shared/Tag";
import { PostId } from "./PostId";


interface PostProps {
  userId: string,
  texto: Texto,
  tags: Tag[],
  data: Date
}

export class Post extends AggregateRoot<PostProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get postId(): PostId {
    return PostId.caller(this.id)
  }

  get userId(): string {
    return this.props.userId;
  }

  get texto(): Texto {
    return this.props.texto;
  }

  get tags(): Tag[] {
    return this.props.tags
  }

  get data(): Date {
    return this.props.data
  }


  private constructor(props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: PostProps, id?: UniqueEntityID): Result<Post> {

    /*const guardedProps = [
      { argument: props.userId, argumentName: 'userId' },
      { argument: props.texto, argumentName: 'texto' },
      { argument: props.tags, argumentName: 'tags' }
    ];
    
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Post>(guardResult.message)
    }     */
    if (props.texto === null || props.texto === undefined || props.userId === null || props.userId === undefined
      || props.data === null) {
      throw new Error("O id do user, texto e data não devem ser nulos");
    }
    const post = new Post({
      userId: props.userId,
      texto: props.texto,
      tags: props.tags,
      data: props.data
    }, id);
    return Result.ok<Post>(post);

  }
}