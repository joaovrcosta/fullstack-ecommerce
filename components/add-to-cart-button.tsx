"use client";

import { Product } from "@/sanity.types";
import useBasketStore from "@/stores/cart-store";
import { ShoppingCart } from "lucide-react";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToCartButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItemIfNotExists } = useBasketStore();

  return (
    <button
      onClick={() => addItemIfNotExists(product)}
      disabled={disabled}
      className={`flex gap-4 px-4 py-4 cursor-pointer rounded-[4px] text-black font-semibold transition-colors duration-200 w-full items-center justify-center ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#ffe000] hover:bg-[#ffe000]/80"
      }`}
    >
      <ShoppingCart />
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
