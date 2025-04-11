import {model, Schema, models} from "mongoose";

export interface IProduct{
    name: string,
    description: string,
    images: string[],
    price: number,
    category: string,
}

const ProductSchema = new Schema<IProduct>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    images: [{type: String, required: true}],
})

const Product = models?.Product || model<IProduct>("Product", ProductSchema);

export default Product