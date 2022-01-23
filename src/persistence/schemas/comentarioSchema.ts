import mongoose from "mongoose";
import { IComentarioPersistence } from "../../dataschema/IComentarioPersistence";

const Comentario = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },
        userId: {
            type: String,
            required: true,
            index: true,
        },
        postId: {
            type: String,
            required: true,
            index: true,
        },
        texto: {
            type: String,
            required: [true, 'Por favor, insira o texto do post'],
            index: true,
        },
        tags: {
            type: [{ type: String }],
            index: true,
        },

        data: {
            type: Date,
            required : true,
            index: true,
        }
    },
    { timestamps: true },
);

export default mongoose.model<IComentarioPersistence & mongoose.Document>('Comentario', Comentario);