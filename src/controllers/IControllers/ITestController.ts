import { Request, Response, NextFunction } from 'express';

export default interface IReacaoController  {
    deleteAllRecords(req: Request, res: Response, next: NextFunction);
}