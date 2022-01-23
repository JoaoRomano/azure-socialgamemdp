import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import IPostService from './IServices/IPostService';
import { Result } from '../core/logic/Result';
import IPostDTO from '../dto/IPostDTO';
import IPostRepo from './IRepos/IPostRepo';
import { Texto } from '../domain/Shared/Texto';
import { Post } from '../domain/Post/Post';
import { Tag } from '../domain/Shared/Tag';
import { PostMap } from '../mappers/PostMapper';
import { PromiseProvider } from 'mongoose';
import IFeedPostDTO from '../dto/IFeedPostDTO';

@Service()
export default class PostService implements IPostService {
    constructor(
        @Inject(config.repos.post.name) private postRepo: IPostRepo,
        @Inject('logger') private logger,
    ) { }

    public async getPosts(): Promise<Result<IPostDTO[]>> {
        const postsDTO = [];
        const posts = await this.postRepo.findAll();

        posts.forEach(post => postsDTO.push(PostMap.toDTO(post)));

        return Result.ok<IPostDTO[]>(postsDTO);
    }

    public async getUserPosts(userId: string): Promise<Result<IFeedPostDTO[]>> {
        const postsDTO = [];
        const posts = await this.postRepo.findUserPosts(userId);
        for (const post of posts) {
            const postDto = await PostMap.toFeedPostDTO(post);
            postsDTO.push(postDto);
        }
        return Result.ok<IFeedPostDTO[]>(postsDTO);
    }

    public async createPost(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
        try {
            const texto = Texto.create(postDTO.texto).getValue();

            const tags: Tag[] = [];

            postDTO.tags.forEach(tag =>
                tags.push(Tag.create(tag).getValue())
            );

            const postOrError = Post.create(
                {
                    userId: postDTO.userId,
                    texto: texto,
                    tags: tags,
                    data: postDTO.data
                }
            );

            const postResult = postOrError.getValue();

            await this.postRepo.save(postResult);

            const postDTOResult = PostMap.toDTO(postResult) as IPostDTO;

            return Result.ok<IPostDTO>(postDTOResult);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }

    }
}
