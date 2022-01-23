import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');
  /* ------------------- Schemas -----------------*/
  const postSchema = {
    name: 'postSchema',
    schema: '../persistence/schemas/postSchema',
  };

  const comentarioSchema = {
    name: 'comentarioSchema',
    schema: '../persistence/schemas/comentarioSchema',
  }

  const reacaoSchema = {
    name: 'reacaoSchema',
    schema: '../persistence/schemas/reacaoSchema',
  }

  /* ------------------- Controllers ---------------*/
  const postController = {
    name: config.controllers.post.name,
    path: config.controllers.post.path
  }

  const comentarioController = {
    name: config.controllers.comentario.name,
    path: config.controllers.comentario.path
  }
  
  const reacaoController = {
    name: config.controllers.reacao.name,
    path: config.controllers.reacao.path,
  }

  const testController = {
    name: config.controllers.test.name,
    path: config.controllers.test.path
  }

  /* -------------------- Repos ----------------------*/
  const postRepo = {
    name: config.repos.post.name,
    path: config.repos.post.path
  }

  const comentarioRepo = {
    name: config.repos.comentario.name,
    path: config.repos.comentario.path
  }

  const reacaoRepo = {
    name: config.repos.reacao.name,
    path: config.repos.reacao.path
  }

  /* -------------------- Service ---------------------*/
  const postService = {
    name: config.services.post.name,
    path: config.services.post.path
  }

  const comentarioService = {
    name: config.services.comentario.name,
    path: config.services.comentario.path
  }

  const reacaoService = {
    name: config.services.reacao.name,
    path: config.services.reacao.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      postSchema,
      comentarioSchema,
      reacaoSchema,
    ],
    controllers: [
      postController,
      comentarioController,
      reacaoController,
      testController
    ],
    repos: [
      postRepo,
      comentarioRepo,
      reacaoRepo,
    ],
    services: [
      postService,
      comentarioService,
      reacaoService,
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
