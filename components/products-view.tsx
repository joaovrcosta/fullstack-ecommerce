import { Category, Product } from "@/sanity.types";
import { ProductGrid } from "./product-grid";
import { CategorySelectorComponent } from "./ui/category-selector";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

export const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className="flex flex-col">
      {/* categories */}
      <div className="w-full sm:w-[200px]">
        <CategorySelectorComponent categories={categories} />
      </div>

      {/* products */}
      <div className="flex-1">
        <div>
          <ProductGrid products={products} />
          <hr className="w-1/2 sm:3/4" />
        </div>
      </div>
    </div>
  );
};
