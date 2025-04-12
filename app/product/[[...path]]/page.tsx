import AddReview from "@/components/product/AddReview";
import Product from "@/components/product/Product";
import Review from "@/components/product/Review";
import AddProduct from "@/components/product/AddProduct";
import DeleteProduct from "@/components/delete/DeleteProduct";
import {getProductById} from "@/lib/actions/products";
import {getReviewsAndRating} from "@/lib/actions/reviews";

export const revalidate = 1;

export default async function Page({ params }: { params: { path: string[] } }) {
  const method = params.path[0];
  const id = params.path[1];

  if (method === "new") {
    return <AddProduct />;
  }

  const product = await getProductById(id);
  const { reviews, averageRating } = await getReviewsAndRating(id);

  if (method === "edit") {
    return <AddProduct edit id={id} product={product} />;
  }
  if (method === "delete") {
    return <DeleteProduct id={id} />;
  }

  if (!product) {
    return <div className="h-screen flex justify-center items-center text-3xl">No Product found 😔</div>
  }

  return (
    <div className="pt-20 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4">
      <Product product={product} rating={averageRating}/>
      <div className="flex flex-col gap-y-5">
        <span className="text-2xl font-bold h-fit">Customer Reviews</span>
        <div className="grid gap-5">
          {reviews.map((review:any, index:any) => (
              <Review key={index} review={review} />
          ))}
        </div>
      </div>
      <div className="md:col-span-2">
        <AddReview id={id}/>
      </div>
    </div>
  );
}
