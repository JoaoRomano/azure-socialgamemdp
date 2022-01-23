
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { result } from "lodash";

interface TextoProps {
  value: string;
}

export class Texto extends ValueObject<TextoProps> {


  get value(): string {
    return this.props.value;
  }

  private constructor(props: TextoProps) {
    super(props);
  }

  public static create(texto: string): Result<Texto> {
    const max_length = 10000;
    const min_length = 1;

    if (texto === null || texto === undefined || texto.length < min_length || texto.length > max_length) {
      throw new Error("O texto deve ter entre " + min_length + " e " + max_length + " e carateres");
    }

    return Result.ok<Texto>(new Texto({ value: texto }))
  }
}