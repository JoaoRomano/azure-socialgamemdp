import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Tag } from "../Shared/Tag";
import { Texto } from "../Shared/Texto";
import { ComentarioId } from "./ComentarioId";

interface ComentarioProps {
    userId: string,
    postId: string,
    texto: Texto,
    tags: Tag[],
    data: Date
}

export class Comentario extends AggregateRoot<ComentarioProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get comentarioId(): ComentarioId {
        return ComentarioId.caller(this.id)
    }

    get userId(): string {
        return this.props.userId;
    }

    get postId(): string {
        return this.props.postId;
    }

    get texto(): Texto {
        return this.props.texto;
    }

    get tags(): Tag[] {
        return this.props.tags;
    }

    get data(): Date {
        return this.props.data;
    }

    private constructor(props: ComentarioProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: ComentarioProps, id?: UniqueEntityID): Result<Comentario> {
        if(props.texto === null || props.texto === undefined || props.userId === null || props.userId === undefined || 
            props.postId === null || props.postId === undefined || props.data === null){
          throw new Error("O id do user e/ou o id do post e/ou o texto e/ou a data não devem ser nulos");
        }

        const comentario = new Comentario({
          userId: props.userId,
          postId: props.postId,
          texto: props.texto,
          tags: props.tags,
          data: props.data
        }, id);
        return Result.ok<Comentario>(comentario);
    }
}