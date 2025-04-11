import { SalesBanner } from "@/components/sales-banner";
import { ProductsView } from "@/components/products-view";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="flex w-full">
      <div className="w-[40%]">
        <SalesBanner />
      </div>

      <div className="flex flex-1 flex-col items-center justify-top min-h-screen  p-4">
        <ProductsView products={products} categories={categories} />
        <div className="flex w-full mt-3 space-x-3">
          <div className="w-full border border-[#c5cbcd] p-5">oi</div>
          <div className="bg-red-50 w-full">oi</div>
        </div>
      </div>
    </div>
  );
}
