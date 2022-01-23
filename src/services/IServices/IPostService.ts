import { Result } from "../../core/logic/Result";
import IFeedPostDTO from "../../dto/IFeedPostDTO";
import IPostDTO from "../../dto/IPostDTO";

export default interface IRoleService  {
  createPost(postDTO: IPostDTO): Promise<Result<IPostDTO>>;
  getPosts(): Promise<Result<IPostDTO[]>>;
  getUserPosts(userId: string): Promise<Result<IFeedPostDTO[]>>;
}
