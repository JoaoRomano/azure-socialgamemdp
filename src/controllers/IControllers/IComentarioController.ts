import { Request, Response, NextFunction } from 'express';

export default interface IPostController  {
  createComentario(req: Request, res: Response, next: NextFunction);
  getComentarios(req: Request, res: Response, next: NextFunction);
  getUserComentarios(req: Request, res: Response, next: NextFunction);
  getPostComentarios(req: Request, res: Response, next: NextFunction);
}