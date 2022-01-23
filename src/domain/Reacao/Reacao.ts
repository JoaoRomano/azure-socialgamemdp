import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Like } from "./Like";
import { ReacaoId } from "./ReacaoId";

interface ReacaoProps {
    userId: string,
    postId: string,
    like: Like,
}

export class Reacao extends AggregateRoot<ReacaoProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get reacaoId(): ReacaoId {
        return ReacaoId.caller(this.id)
    }

    get userId(): string {
        return this.props.userId;
    }

    get postId(): string {
        return this.props.postId;
    }

    get like(): Like {
        return this.props.like;
    }

    private constructor(props: ReacaoProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: ReacaoProps, id?: UniqueEntityID): Result<Reacao> {
        if(props.like === null || props.like === undefined || props.userId === null || props.userId === undefined || props.postId === null || props.postId === undefined){
          throw new Error("O id do user e/ou o id do post e/ou o like não devem ser nulos");
        }

        const comentario = new Reacao({
          userId: props.userId,
          postId: props.postId,
          like: props.like,
        }, id);
        return Result.ok<Reacao>(comentario);
    }
}