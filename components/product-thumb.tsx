import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";

export function ProductThumb({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-[4px] border border-[#c5cbcd] hover:shadow-md transition-all duration-200 overflow-hidden p-4 ${isOutOfStock ? "opacity-50" : ""}`}
    >
      <div className="relative aspect-square max-h-[136px] w-full overflow-hidden flex items-center justify-center">
        {product.image && (
          <Image
            className="max-h-[136px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product Image"}
            width={200}
            height={136}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">Out of stock</span>
          </div>
        )}
      </div>

      <div className="">
        <h2 className="text-[13px] font-base text-[#0457c8] truncate">
          {product.name}
        </h2>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description
            ?.map((block) =>
              block._type === "block"
                ? block.children?.map((child) => child.text).join("")
                : ""
            )
            .join("")}
        </p>
        <p className="mt-2 text-[25px] font-bold text-gray-800">
          {product.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
    </Link>
  );
}
