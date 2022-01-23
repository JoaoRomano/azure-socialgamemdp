import { IPostPersistence } from '../../dataschema/IPostPersistence';
import mongoose from 'mongoose';

const Post = new mongoose.Schema(
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
            required: true,
            index: true,
        }
    },
    { timestamps: true },
);

export default mongoose.model<IPostPersistence & mongoose.Document>('Post', Post);
