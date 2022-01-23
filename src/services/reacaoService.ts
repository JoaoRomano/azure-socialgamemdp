import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import { Like } from "../domain/Reacao/Like";
import { Reacao } from "../domain/Reacao/Reacao";
import IReacaoDTO from "../dto/IReacaoDTO";
import { ReacaoMap } from "../mappers/ReacaoMapper";
import IPostRepo from "./IRepos/IPostRepo";
import IReacaoRepo from "./IRepos/IReacaoRepo";
import IReacaoService from "./IServices/IReacaoService";

@Service()
export default class ReacaoService implements IReacaoService {
    constructor(
        @Inject(config.repos.reacao.name) private reacaoRepo: IReacaoRepo,
        @Inject(config.repos.post.name) private postRepo: IPostRepo,
        @Inject('logger') private logger,
    ) { }
    
    public async createReacao(reacaoDTO: IReacaoDTO): Promise<Result<IReacaoDTO>> {
        try {
            const like = Like.create(reacaoDTO.like).getValue();

            const reacaoOrError = Reacao.create(
                {
                    userId: reacaoDTO.userId,
                    postId: reacaoDTO.postId,
                    like: like
                }
            )

            const reacaoResult = reacaoOrError.getValue();

            await this.reacaoRepo.save(reacaoResult);

            const reacaoDTOResult = ReacaoMap.toDTO(reacaoResult) as IReacaoDTO;

            return Result.ok<IReacaoDTO>(reacaoDTOResult);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
    
    public async getReacoes(): Promise<Result<IReacaoDTO[]>> {
        const reacoesDTO = [];
        const reacoes = await this.reacaoRepo.findAll();
       
        reacoes.forEach(reacao => reacoesDTO.push(ReacaoMap.toDTO(reacao)));

        return Result.ok<IReacaoDTO[]>(reacoesDTO);
    }
    
    public async getUserReacaoPost(userId: string, postId:string): Promise<Result<IReacaoDTO>> {
        const  reacao = await this.reacaoRepo.findUserReacaoPost(userId,postId);

        if(reacao === null){
            return Result.ok<IReacaoDTO>(null);
        }

        return  Result.ok<IReacaoDTO>(ReacaoMap.toDTO(reacao));
    }

    public async getUserReacoesDiff(userId: string): Promise<Result<number>> {
        let userReacoes = [];
        const userPosts = await this.postRepo.findUserPosts(userId);
        for (const userPost of userPosts) {
            const reacoes = await this.reacaoRepo.findPostReacoes(userPost.id.toString());
            userReacoes.push(...reacoes);
        }
        let diferenca = 0;
        userReacoes.forEach(userReacao => {
            if (userReacao.like.value) {
                diferenca++;
            } else {
                diferenca--;
            }
        });
        return Result.ok<number>(diferenca);
    }

    public async getUserReacoesDiffByUser(recetorId: string, emissorId: string) {
        let userReacoes: Reacao[] = [];
        const userPosts = await this.postRepo.findUserPosts(recetorId);
        for (const userPost of userPosts) {
            const reacoes = await this.reacaoRepo.findPostReacoesByUser(emissorId, userPost.id.toString());
            userReacoes.push(...reacoes);
        }
    
        let diferenca = 0;        
        userReacoes.forEach(userReacao => {
            if (userReacao.like.value) {
                diferenca++;
            } else {
                diferenca--;
            }
        });
        return Result.ok<number>(diferenca);
    }
    
    public async getPostReacoes(postId: string): Promise<Result<IReacaoDTO[]>> {
        throw new Error("Method not implemented.");
    }

}