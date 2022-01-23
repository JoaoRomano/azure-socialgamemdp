import 'reflect-metadata';

import * as sinon from 'sinon';
import Container from "typedi";
import { Comentario } from '../domain/Comentario/Comentario';
import { Texto } from '../domain/Shared/Texto';
import IComentarioDTO from "../dto/IComentarioDTO";
import LoggerInstance from "../loaders/logger";
import ComentarioService from "./comentarioService";
import IComentarioRepo from "./IRepos/IComentarioRepo";

describe('ComentarioService', () => {
    beforeEach(() => {
    });

    it('Sucesso comentarioService', async () => {
        const comentarioDTO: IComentarioDTO = {
            id: '123',
            userId: '1',
            postId: '2',
            texto: 'texto',
            tags: [],
            data: new Date("2022-01-07T20:01:33.094Z")
        }

        Container.set('logger', LoggerInstance);

        let comentarioSchemaInstance = require("../persistence/schemas/comentarioSchema").default;
		Container.set("comentarioSchema", comentarioSchemaInstance);

		let comentarioRepoClass = require("../repos/comentarioRepo").default;
		let comentarioRepoInstance = Container.get(comentarioRepoClass);
		Container.set("ComentarioRepo", comentarioRepoInstance);

        comentarioRepoInstance = Container.get("ComentarioRepo");
        sinon.stub(comentarioRepoInstance, "save").returns(
            Comentario.create({
                userId: comentarioDTO.userId,
                postId: comentarioDTO.postId,
                texto: Texto.create(comentarioDTO.texto).getValue(),
                tags: [],
                data: new Date("2022-01-07T20:01:33.094Z")
            }).getValue()
        );

        const service = new ComentarioService(comentarioRepoInstance as IComentarioRepo, Container.get('logger'));

        const result = await service.createComentario(comentarioDTO);

        sinon.assert.match(result.getValue().userId, comentarioDTO.userId);
        sinon.assert.match(result.getValue().postId, comentarioDTO.postId);
        sinon.assert.match(result.getValue().texto, comentarioDTO.texto);
        sinon.assert.match(result.getValue().tags, comentarioDTO.tags);
        sinon.assert.match(result.getValue().data, comentarioDTO.data);
    })
})