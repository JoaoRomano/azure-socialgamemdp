import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPostController from '../../controllers/IControllers/IPostController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/post', route);

  const ctrl = Container.get(config.controllers.post.name) as IPostController;

  route.post('',
    celebrate({
      body: Joi.object({
        userId: Joi.string().required(),
        texto: Joi.string().required(),
        tags: Joi.array().required(),
        data: Joi.date().required()
      })
    }),
    (req, res, next) => ctrl.createPost(req, res, next) 
  );

  route.get('',
    (req, res, next) => ctrl.getPosts(req, res, next) 
  );

  route.get('/:userId',
    (req, res, next) => ctrl.getUserPosts(req, res, next) 
  );
};