import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSalesByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCoupon";

export async function SalesBanner() {
  const sale = await getActiveSalesByCouponCode(COUPON_CODES.BFRIDAY);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-[#0046be] to-black text-white px-6 py-10 mx-4 mt-2 shadow-lg rounded-[4px] h-full flex items-center justify-center">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl sm:text-2xl font-bold mb-4">{sale.title}</h2>
        <p className="text-lg font-regular mb-6">{sale.description}</p>
        <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
          <span className="font-bold text-base sm:text-xl">
            Use Code: <span className="text-[#0046be]">{sale.couponCode}</span>
          </span>
          <span className="ml-2 font-bold text-base sm:text-xl">
            for {sale.discountAmount} % OFF
          </span>
        </div>
      </div>
    </div>
  );
}
