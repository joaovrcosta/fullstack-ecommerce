import AddToCartButton from "@/components/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { ChevronRight, Heart, RefreshCw } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 60;

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="space-y-3">
          <div className="h-[70px] w-[70px] border"></div>
          <div className="h-[70px] w-[70px] border"></div>
          <div className="h-[70px] w-[70px] border"></div>
        </div>
        {/* IMAGEM */}
        <div
          className={`relative mt-12 flex items-center justify-center w-full md:flex-1 ${
            isOutOfStock ? "opacity-50" : ""
          }`}
        >
          {product.image && (
            <div className="w-full max-w-[640px] max-h-[640px] flex items-center justify-center mx-auto">
              <Image
                src={imageUrl(product.image).url()}
                alt={product.name ?? "Product Image"}
                width={640}
                height={640}
                className="object-contain w-full h-full max-w-[640px] max-h-[640px]"
              />
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of stock</span>
            </div>
          )}
        </div>

        {/* DESCRIÇÃO */}
        <div className="flex flex-col justify-between w-full md:w-[400px]">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="text-xl font-semibold mb-4">
            <span className="text-[24px]"> ${product.price?.toFixed(2)}</span>
          </div>

          <div>
            <h3>Trade-In and Save</h3>
            <div className="border border-[#c5cbcd] flex items-center justify-between p-4 rounded-lg mt-2 mb-2">
              <div className="flex items-center justify-center w-[20%]">
                <RefreshCw />
              </div>
              <div className="flex flex-col">
                <span>
                  Save up to $45.00 when you trade in a similar device.
                </span>
                <span>Check your trade-in value.</span>
              </div>
              <ChevronRight />
            </div>
          </div>

          {Array.isArray(product.description) && (
            <div className="prose max-w-none mb-6">
              <PortableText value={product.description} />
            </div>
          )}

          <div className="mt-4 flex gap-4">
            <AddToCartButton product={product} disabled={isOutOfStock} />
            <button className="p-4 rounded-[4px] border flex items-center justify-center gap-3">
              <Heart size={20} />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
