import {model, models, Schema, Types} from "mongoose";

export interface IReview {
    author: {
        name: string,
        email: string,
    },
    rating: number,
    content: string,
    productId: Types.ObjectId,
}

const AuthorSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
})

const ReviewSchema = new Schema<IReview>({
    productId: {type: Schema.Types.ObjectId, required: true, ref: "Product"},
    author: {type: AuthorSchema, required: true},
    rating: {type: Number},
    content: {type: String, required: true},
})

const Review = models?.Review || model<IReview>("Review", ReviewSchema)

export default Review