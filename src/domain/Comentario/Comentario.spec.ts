import { v4 } from "uuid";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Tag } from "../Shared/Tag";
import { Texto } from "../Shared/Texto"
import { Comentario } from "./Comentario"

interface ComentarioProps {
    userId: string,
    postId: string,
    texto: Texto,
    tags: Tag[],
    data: Date
}

describe('Comentario', () => {
    const erroDefault = "O id do user e/ou o id do post e/ou o texto e/ou a data não devem ser nulos";

    it('Sucesso create', () => {
        const expectedId = v4();
        const props: ComentarioProps = {
            userId: v4(),
            postId: v4(),
            texto: Texto.create('Teste').getValue(),
            tags: [],
            data: new Date("2022-01-07T20:01:33.094Z")
        };

        const result = Comentario.create(props, new UniqueEntityID(expectedId)).getValue();
        expect(result.id.toString()).toEqual(expectedId);
    });

    it('Erro create com userId nulo', () => {
        const props: ComentarioProps = {
            userId: null,
            postId: v4(),
            texto: Texto.create('Teste').getValue(),
            tags: [],
            data: new Date("2022-01-07T20:01:33.094Z")
        };

        expect(() => Comentario.create(props)).toThrowError(
            Error(erroDefault)
        );
    });

    it('Erro create com userId undefined', () => {
        const props: ComentarioProps = {
            userId: undefined,
            postId: v4(),
            texto: Texto.create('Teste').getValue(),
            tags: [],
            data: new Date("2022-01-07T20:01:33.094Z")
        };

        expect(() => Comentario.create(props)).toThrowError(
            Error(erroDefault)
        );
    });

    it('Erro create com postId nulo', () => {
        const props: ComentarioProps = {
            userId: v4(),
            postId: null,
            texto: Texto.create('Teste').getValue(),
            tags: [],
            data: new Date("2022-01-07T20:01:33.094Z")
        };

        expect(() => Comentario.create(props)).toThrowError(
            Error(erroDefault)
        );
    });

    it('Erro create com postId undefined', () => {
        const props: ComentarioProps = {
            userId: v4(),
            postId: undefined,
            texto: Texto.create('Teste').getValue(),
            tags: [],
            data: new Date("2022-01-07T20:01:33.094Z")
        };

        expect(() => Comentario.create(props)).toThrowError(
            Error(erroDefault)
        );
    });

    it('Erro create com texto nulo', () => {
        const props: ComentarioProps = {
            userId: v4(),
            postId: v4(),
            texto: null,
            tags: [],
            data: new Date("2022-01-07T20:01:33.094Z")
        };

        expect(() => Comentario.create(props)).toThrowError(
            Error(erroDefault)
        );
    });

    it('Erro create com texto undefined', () => {
        const props: ComentarioProps = {
            userId: v4(),
            postId: v4(),
            texto: undefined,
            tags: [],
            data: new Date("2022-01-07T20:01:33.094Z")
        };

        expect(() => Comentario.create(props)).toThrowError(
            Error(erroDefault)
        );
    });
})