import { Service, Inject } from 'typedi';
import config from '../../config';

import { Document, Model } from 'mongoose';

import { IPostPersistence } from '../dataschema/IPostPersistence';
import { PostMap } from '../mappers/PostMapper';
import { Post } from '../domain/Post/Post';
import IPostRepo from '../services/IRepos/IPostRepo';

@Service()
export default class PostRepo implements IPostRepo {
    private models: any;

    constructor(
        @Inject('postSchema') private postSchema: Model<IPostPersistence & Document>,
        @Inject('logger') private logger
    ) { }

    public async findAll(): Promise<Post[]> {
        
        var posts:Post[] = [] ;
        const pesquisa = (await this.postSchema.find()).values();
        
        var post = pesquisa.next();
        while(post.value != undefined){
            posts.push((await PostMap.toDomain(post.value)) as Post);
            post = pesquisa.next();
        }

        return posts ;
    }

    public async findUserPosts(userId : string) : Promise<Post[]>{
        
        var posts:Post[] = [] ;
        const pesquisa = (await this.postSchema.find({userId: userId})).values();
        
        var post = pesquisa.next();
        while(post.value != undefined){
            posts.push((await PostMap.toDomain(post.value)) as Post);
            post = pesquisa.next();
        }

        return posts ;
    }



    exists(t: Post): Promise<boolean> {
        throw new Error('Method not implemented.');
    }


    public async save(post: Post): Promise<Post> {
        try {
            const rawPost: any = PostMap.toPersistence(post);
            const postCreated = await this.postSchema.create(rawPost);
            return PostMap.toDomain(postCreated);
        } catch (err) {
            throw err;
        }
    }

    

}