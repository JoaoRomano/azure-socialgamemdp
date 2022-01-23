export default interface IComentarioDTO {
    id: string,
    userId: string,
    postId: string,
    texto: string,
    tags: string[],
    data: Date
}