export const COUPON_CODES = {
  BFRIDAY: "BFRIDAY",
  TOPDEALS: "TOPDEALS",
  BBOUT: "BBOUT",
  XMAS2025: "XMAS2025",
  NEWYEAR2025: "NEWYEAR2025",
} as const;
export type CouponCode = keyof typeof COUPON_CODES;
