import ProductResult from "@/components/search/ProductResult";
import SearchFilters from "@/components/search/SearchFilters";
import {getProducts} from "@/lib/actions/products";
import Pagination from "@/components/search/pagination";

export default async function Component({searchParams}: {searchParams: { name: string, category: string, minPrice: string, page: string}}) {

    const page = parseInt(searchParams.page) || 1;
    const minPrice = parseInt(searchParams.minPrice) || 0;
    const name = searchParams.name || "";
    const category = searchParams.category || "";

  const products = await getProducts(page, name, minPrice, category)

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-8 px-4 md:px-8 py-20">
      <div className="bg-white rounded-lg shadow-sm dark:bg-gray-950 p-6 space-y-6">
        <SearchFilters />
          <Pagination />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductResult key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
