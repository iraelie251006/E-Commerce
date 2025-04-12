"use server";

import dbConnect from "@/lib/db";
import Review, {IReview} from "@/lib/models/review";
import mongoose from "mongoose";
import {revalidateTag, unstable_cache as cache} from "next/cache";
async function _getReviewsAndRating (productId: string) {
    await dbConnect()
    try {
        const reviews = await Review.find({productId});

        const averageRatingResult = await Review.aggregate([
            // only grab records with the given productId
            {$match: {productId: new mongoose.Types.ObjectId(productId)}},
            // group the records and return an average rating
            {$group: {_id: null, average: {$avg: "$rating"}}}
        ])

        const averageRating = averageRatingResult[0]?.average || 0;
        return {reviews, averageRating};
    } catch (e) {
        console.error("Retrieving reviews: ", e);
        return {reviews: [], averageRating: 0};
    }
}

export const getReviewsAndRating = cache(_getReviewsAndRating, ["getReviewsAndRating"], {tags: ["getReviewsAndRating"]})

export async function createReview (review: IReview) {
    await dbConnect();

    try {
        const newReview = await Review.create(review);
        revalidateTag("getReviewsAndRating");
        return newReview._id.toString();
    } catch (error) {
        console.error(error);
        return null;
    }
}