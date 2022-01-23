import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface LikeProps {
  value: boolean;
}

export class Like extends ValueObject<LikeProps> {
  get value(): boolean {
    return this.props.value;
  }

  private constructor(props: LikeProps) {
    super(props);
  }

  public static create(like: boolean): Result<Like> {
    if (like === null || like === undefined) {
      throw new Error("O like tem de ter um valor boleano valido");
    }

    return Result.ok<Like>(new Like({ value: like }))
  }
}