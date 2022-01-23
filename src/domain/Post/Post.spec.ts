import { v4 } from "uuid";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Tag } from "../Shared/Tag"
import { Texto } from "../Shared/Texto"
import { Post } from "./Post";

interface PostProps {
    userId: string,
    texto: Texto,
    tags: Tag[],
    data: Date
}

describe('Post', () => {
    const erroDefault = "O id do user, texto e data não devem ser nulos";

    it('Sucesso create', () => {
        const expectedId = v4();
        const props: PostProps = {
            userId: v4(),
            texto: Texto.create('teste').getValue(),
            tags: [],
            data: new Date("2022-01-07T20:01:33.094Z")
        }

        const result = Post.create(props, new UniqueEntityID(expectedId)).getValue();
        expect(result.id.toString()).toEqual(expectedId);
    });

    it('Erro create com userId nulo', () => {
        const props: PostProps = {
            userId: null,
            texto: Texto.create('Teste').getValue(),
            tags: [],
            data: new Date("2022-01-07T20:01:33.094Z")
        };

        expect(() => Post.create(props)).toThrowError(
            Error(erroDefault)
        );
    });

    it('Erro create com userId undefined', () => {
        const props: PostProps = {
            userId: undefined,
            texto: Texto.create('Teste').getValue(),
            tags: [],
            data: new Date("2022-01-07T20:01:33.094Z")
        };

        expect(() => Post.create(props)).toThrowError(
            Error(erroDefault)
        );
    });

    it('Erro create com texto nulo', () => {
        const props: PostProps = {
            userId: v4(),
            texto: null,
            tags: [],
            data: new Date("2022-01-07T20:01:33.094Z")
        };

        expect(() => Post.create(props)).toThrowError(
            Error(erroDefault)
        );
    });

    it('Erro create com texto undefined', () => {
        const props: PostProps = {
            userId: v4(),
            texto: undefined,
            tags: [],
            data: new Date("2022-01-07T20:01:33.094Z")
        };

        expect(() => Post.create(props)).toThrowError(
            Error(erroDefault)
        );
    });
})