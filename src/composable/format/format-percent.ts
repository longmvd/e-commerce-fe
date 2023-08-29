import i18n from "@/i18n";
/**
 * Convert decimal number discount to string
 * @param number
 * @param isDecimal
 * @returns
 */
export function formatDiscountPercentText(
  number: number,
  isDecimal: boolean = true
) {
  const { t } = i18n.global;
  let ans = number;
  if (isDecimal) {
    ans = number * 100;
  }
  return t("i18nCommon.DiscountPercent", { percent: ans });
}
