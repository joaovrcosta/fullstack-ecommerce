import { SalesBanner } from "@/components/sales-banner";
import { ProductsView } from "@/components/products-view";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { SecondSalesBanner } from "@/components/second-sale";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="flex w-full max-h-[640px] overflow-hidden mt-4">
      <div className="flex w-full">
        {/* Coluna da esquerda com o SalesBanner */}
        <div className="w-[40%] overflow-hidden">
          <SalesBanner />
        </div>

        {/* Coluna da direita com produtos e banners */}
        <div className="flex flex-1 flex-col items-center justify-start pl-4 pr-4 pt-4 pb-0 overflow-y-auto">
          <ProductsView products={products} categories={categories} />
          <div className="flex w-full mt-3 space-x-4">
            <SecondSalesBanner couponCode="BBOUT" />
            <SecondSalesBanner couponCode="TOPDEALS" badgeColor="#e81e25" />
          </div>
        </div>
      </div>
    </div>
  );
}
