import { Like } from "./Like";


describe('Like', () => {
    const erroDefault = "O like tem de ter um valor boleano valido";

    it('Sucesso create', () => {
        const result = Like.create(false).getValue();
        expect(result.value).toEqual(false);
    });

    it('Erro create com valor nulo', () => {
        expect(() => Like.create(null)).toThrowError(
            Error(erroDefault)
        );
    });

    it('Sucesso create com valor undefined', () => {
        expect(() => Like.create(undefined)).toThrowError(
            Error(erroDefault)
        );
    });
});