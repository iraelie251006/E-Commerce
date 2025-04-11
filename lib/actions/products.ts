"use server";

import dbConnect from "@/lib/db";
import Product, {IProduct} from "@/lib/models/product";

export const createProduct = async(product:IProduct) => {
    await dbConnect();
    try {
        const newProduct = await Product.create(product)

        const productId: string = newProduct._id.toString();
        return productId;
    } catch (error) {
        console.log("Error Creating New Product: ", error);
        throw new Error("Error Creating New Product");
    }
}