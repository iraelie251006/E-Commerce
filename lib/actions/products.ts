"use server";

import dbConnect from "@/lib/db";
import Product, {IProduct} from "@/lib/models/product";
import {revalidateTag, unstable_cache as cache} from "next/cache";

export const createProduct = async(product:IProduct) => {
    await dbConnect();
    try {
        const newProduct = await Product.create(product)

        return newProduct._id.toString();
    } catch (error) {
        console.log("Error Creating New Product: ", error);
        throw new Error("Error Creating New Product");
    }
}

const _getProductById = async(productId:string) => {
    await dbConnect();
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return null;
        }
        return product;
    } catch (error) {
        console.log("Error Creating GetProductById: ", error);
        return null;
    }
}

export const getProductById = cache(_getProductById, ["getProductById"], {tags: ["Product"]} )

export const updateProduct = async(productId:string, data: Partial<IProduct>) => {
    await dbConnect();

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, data, {new: true})

        revalidateTag("Product");
        return updatedProduct._id.toString();
    } catch (e) {
        console.log("Error Creating UpdateProduct: ", e);
        return null;
    }
}

export const deleteProduct = async(productId:string) => {
    await dbConnect();

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        revalidateTag("Product");
        return deletedProduct.deletedCount === 1;
    } catch (e) {
        console.log("Error Deleting Product: ", e);
        return false;
    }
}

export const getProducts = async(page: number, search: string, minPrice: number, category: string) => {
    await dbConnect();

    const limit = 5;
    const skip = (page - 1) * limit;
    try {
        const pipeline = [
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'reviews',
                },
            },
            {
                $project: {
                    name: 1,
                    images: {$first: '$images'},
                    averageRating: {
                        $avg: '$reviews.rating',
                    },
                },
            },

                {
                    $skip: skip
                },
            {
                $limit: limit
            },
        ];
        const products = await Product.aggregate(pipeline);
        console.log(products);
        return products;
    } catch (e) {
        console.log(e);
        return [];
    }
}