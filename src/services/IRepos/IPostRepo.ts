import { Repo } from "../../core/infra/Repo";
import { Post }  from "../../domain/Post/Post";

export default interface IPostRepo extends Repo<Post> {
	save(post: Post): Promise<Post>;
	findAll() : Promise<Post[]>;
	findUserPosts(userId : string) : Promise<Post[]>;
}
  