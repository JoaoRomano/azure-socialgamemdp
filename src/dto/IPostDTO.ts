export default interface IPostDTO {
    id: string,
    userId: string,
    texto: string,
    tags: string[],
    data: Date
}