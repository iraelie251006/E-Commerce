"use server";

import dbConnect from "@/lib/db";
import Review from "@/lib/models/review";
import mongoose from "mongoose";

export async function getReviewsAndRating (productId: string) {
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