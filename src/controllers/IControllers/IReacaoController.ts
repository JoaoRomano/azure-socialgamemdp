import { Request, Response, NextFunction } from 'express';

export default interface IReacaoController  {
  createReacao(req: Request, res: Response, next: NextFunction);
  getReacoes(req: Request, res: Response, next: NextFunction);
  getUserReacaoPost(req: Request, res: Response, next: NextFunction);
  getUserReacoesDiff(req: Request, res: Response, next: NextFunction);
  getUserReacoesDiffByUser(req: Request, res: Response, next: NextFunction);
  getPostReacoes(req: Request, res: Response, next: NextFunction);
}