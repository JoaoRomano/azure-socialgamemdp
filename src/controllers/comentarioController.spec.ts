import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import IComentarioService from "../services/IServices/IComentarioService";
import IComentarioDTO from '../dto/IComentarioDTO';
import ComentarioController from './comentarioController';
import LoggerInstance from '../loaders/logger';

describe('ComentarioController', () => {
	beforeEach(() => {
    });

    it('Sucesso createComentario', async () => {
        let body = { 
            "userId": '1',
            "postId": '2',
            "texto": 'texto',
            "tags": [],
            "data":"2022-01-07T20:01:33.094Z"
        };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

        Container.set('logger', LoggerInstance);

		let comentarioSchemaInstance = require("../persistence/schemas/comentarioSchema").default;
		Container.set("comentarioSchema", comentarioSchemaInstance);

		let comentarioRepoClass = require("../repos/comentarioRepo").default;
		let comentarioRepoInstance = Container.get(comentarioRepoClass);
		Container.set("ComentarioRepo", comentarioRepoInstance);

		let comentarioServiceClass = require("../services/comentarioService").default;
		let comentarioServiceInstance = Container.get(comentarioServiceClass);
		Container.set("ComentarioService", comentarioServiceInstance);

		comentarioServiceInstance = Container.get("ComentarioService");
		sinon.stub(comentarioServiceInstance, "createComentario").returns( Result.ok<IComentarioDTO>( {
            "id":"123",
            "userId": req.body.userId,
            "postId": req.body.postId,
            "texto": req.body.texto,
            "tags": req.body.tags,
            "data": req.body.data
        } ));

		const ctrl = new ComentarioController(comentarioServiceInstance as IComentarioService);

		await ctrl.createComentario(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match(
            {
                "userId": req.body.userId,
                "postId": req.body.postId,
                "texto": req.body.texto,
                "tags": req.body.tags,
                "data": req.body.data
            }
        ));
	});
});


