import { v4 } from "uuid";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Like } from "./Like";
import { Reacao } from "./Reacao";

interface ReacaoProps {
    userId: string,
    postId: string,
    like: Like,
}

describe('Reacao', () => {
    const errorDefault = "O id do user e/ou o id do post e/ou o like não devem ser nulos";

    it('Sucesso create', () => {
        const expectedId = v4();
        const props: ReacaoProps = {
            userId: v4(),
            postId: v4(),
            like: Like.create(false).getValue()
        };

        const result = Reacao.create(props, new UniqueEntityID(expectedId)).getValue();
        expect(result.id.toString()).toEqual(expectedId);
    });

    it('Error create com userId nulo', () => {
        const props: ReacaoProps = {
            userId: null,
            postId: v4(),
            like: Like.create(false).getValue()
        };

        expect(() => Reacao.create(props)).toThrowError(
            Error(errorDefault)
        );
    });

    it('Error create com userId undefined', () => {
        const props: ReacaoProps = {
            userId: undefined,
            postId: v4(),
            like: Like.create(false).getValue()
        };

        expect(() => Reacao.create(props)).toThrowError(
            Error(errorDefault)
        );
    });

    it('Error create com postId nulo', () => {
        const props: ReacaoProps = {
            userId: v4(),
            postId: null,
            like: Like.create(false).getValue()
        };

        expect(() => Reacao.create(props)).toThrowError(
            Error(errorDefault)
        );
    });

    it('Error create com postId undefined', () => {
        const props: ReacaoProps = {
            userId: v4(),
            postId: undefined,
            like: Like.create(false).getValue()
        };

        expect(() => Reacao.create(props)).toThrowError(
            Error(errorDefault)
        );
    });

    it('Error create com like nulo', () => {
        const props: ReacaoProps = {
            userId: v4(),
            postId: v4(),
            like: null
        };

        expect(() => Reacao.create(props)).toThrowError(
            Error(errorDefault)
        );
    });

    it('Error create com like undefined', () => {
        const props: ReacaoProps = {
            userId: v4(),
            postId: v4(),
            like: undefined
        };

        expect(() => Reacao.create(props)).toThrowError(
            Error(errorDefault)
        );
    });
});