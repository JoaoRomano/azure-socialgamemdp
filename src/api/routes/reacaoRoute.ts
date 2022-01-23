import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import IReacaoController from '../../controllers/IControllers/IReacaoController';

const route = Router();

export default (app: Router) => {
    app.use('/reacoes', route);

    const ctrl = Container.get(config.controllers.reacao.name) as IReacaoController;

    route.get('',
        (req, res, next) => ctrl.getReacoes(req, res, next)
    );

    route.get('/:postId/:userId',
        (req, res, next) => ctrl.getUserReacaoPost(req, res, next)
    );

    route.get('/:postId',
        (req, res, next) => ctrl.getPostReacoes(req, res, next)
    );

    route.get('/:userId/diferenca',
        (req, res, next) => ctrl.getUserReacoesDiff(req, res, next)
    );

    route.get('/:recetorId/:emissorId/diferenca', 
        (req, res, next) => ctrl.getUserReacoesDiffByUser(req, res, next)
    );

    route.post('',
        celebrate({
            body: Joi.object({
                userId: Joi.string().required(),
                postId: Joi.string().required(),
                like: Joi.boolean().required()
            })
        }),
        (req, res, next) => ctrl.createReacao(req, res, next)
    )
}