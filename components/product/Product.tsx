import Stars from "@/components/product/Stars";
import ImageDisplay from "@/components/product/ImageDisplay";
import {IProduct} from "@/lib/models/product";

export default function Product({product, rating}: {product: IProduct, rating: number}) {
  return (
    <div className="grid gap-6">
      <ImageDisplay images={product.images}/>
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {product.description}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold">{product.price}</span>
          <div className="flex items-center gap-0.5">
            <Stars rating={rating} />
          </div>
        </div>
      </div>
    </div>
  );
}
