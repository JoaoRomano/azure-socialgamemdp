export interface IComentarioPersistence {
    _id: string;
    userId: string;
    postId: string;
    texto: string;
    tags: string[];
    data: Date;
}
