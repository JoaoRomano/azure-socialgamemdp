import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import IComentarioController from '../../controllers/IControllers/IComentarioController';

const route = Router();

export default (app: Router) => {
    app.use('/comentarios', route);

    const ctrl = Container.get(config.controllers.comentario.name) as IComentarioController;

    route.get('',
        (req, res, next) => ctrl.getComentarios(req, res, next)
    );

    route.get('/:userId',
        (req, res, next) => ctrl.getUserComentarios(req, res, next)
    );

    route.get('/:postId',
        (req, res, next) => ctrl.getPostComentarios(req, res, next)
    );

    route.post('',
        celebrate({
            body: Joi.object({
                userId: Joi.string().required(),
                postId: Joi.string().required(),
                texto: Joi.string().required(),
                tags: Joi.array().required(),
                data: Joi.date().required()
            })
        }),
        (req, res, next) => ctrl.createComentario(req, res, next)
    )
}