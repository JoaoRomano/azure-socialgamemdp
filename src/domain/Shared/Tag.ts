
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { Texto } from "./Texto";

interface TagProps {
  value: string;
}

export class Tag extends ValueObject<TagProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: TagProps) {
    super(props);
  }

  public static create(tag: string): Result<Tag> {
    const min_length = 1;
    const max_length = 255;

    if (tag === null || tag === undefined || tag.length < min_length || tag.length > max_length) {
      throw new Error("Tag deve ter entre " + min_length + " e " + max_length + " carateres");
    }
    if(!tag.match(/^[a-zA-Z0-9]*$/)){
      throw new Error("Tag deve ser alfanumérica");
    }

    return Result.ok<Tag>(new Tag({ value: tag }))

  }
}