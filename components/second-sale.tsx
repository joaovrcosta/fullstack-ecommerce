import { CouponCode } from "@/sanity/lib/sales/couponCodes";
import { getActiveSalesByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCoupon";

type SecondSalesBannerProps = {
  couponCode: CouponCode;
  badgeColor?: string;
};

export async function SecondSalesBanner({
  couponCode,
  badgeColor = "#0046be",
}: SecondSalesBannerProps) {
  const sale = await getActiveSalesByCouponCode(couponCode);

  if (!sale?.isActive) return null;

  return (
    <div className="w-full border border-[#c5cbcd] p-5 h-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <div
            className="p-[4px] inline-block"
            style={{ backgroundColor: badgeColor }}
          >
            <h2 className="text-[15px] font-bold text-white">{sale.title}</h2>
          </div>
          <p className="text-left text-base mt-3">{sale.description}</p>
          <div className="flex">
            <div className="mt-3">
              <span className="font-bold text-sm">View {sale.title} deals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
