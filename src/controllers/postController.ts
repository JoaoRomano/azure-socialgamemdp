import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

import { Inject, Service } from 'typedi';
import config from "../../config";
import { BaseController } from '../core/infra/BaseController';



import { Result } from "../core/logic/Result";
import IPostDTO from '../dto/IPostDTO';
import IPostService from '../services/IServices/IPostService';
import IPostController from './IControllers/IPostController';

@Service()
export default class PostController extends BaseController implements IPostController {
    protected executeImpl(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    constructor(
        @Inject(config.services.post.name) private postServiceInstance: IPostService
    ) { super() }

    public async getPosts(req: Request, res: Response, next: NextFunction) {
        const posts = await this.postServiceInstance.getPosts();
        return res.json(posts).status(200);
    }

    public async getUserPosts(req: Request, res: Response, next: NextFunction){
        const userPosts = await this.postServiceInstance.getUserPosts(req.params.userId);
        return res.json(userPosts).status(200);
    }

    public async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const postOrError = await this.postServiceInstance.createPost(req.body as IPostDTO) as Result<IPostDTO>;
            const postDTO = postOrError.getValue();
            return res.json(postDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }

}