import mongoose from "mongoose";
import { IReacaoPersistence } from "../../dataschema/IReacaoPersistence";

const Reacao = new mongoose.Schema(
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
        like: {
            type: Boolean,
            required: [true, 'Por favor, insira o valor do like'],
            index: true,
        }
    },
    { timestamps: true },
);

export default mongoose.model<IReacaoPersistence & mongoose.Document>('Reacao', Reacao);