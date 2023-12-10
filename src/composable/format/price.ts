import i18n from '@/i18n';

// export function getPriceAfterDiscount(price: number, discount: number[]) {
//   return price * discount;
// }

export function formatCurrencyDisplay(price: number) {
  const locale = i18n.global.locale.value;
  const currency = locale == 'vi' ? 'VND' : 'USD';
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  });

  return formatter.format(price);
}

export function CalculateTotalPriceAfterDiscount(items?: any[]) {
  return formatCurrencyDisplay(
    items?.reduce((total: number, item: any) => {
      const discountedPrice = item.Price - item.Price * (item?.Discount ?? 0);

      // Calculate the total price for each item (considering quantity)
      const totalPriceForProduct = discountedPrice * item.Quantity;

      // Accumulate the total price
      return total + totalPriceForProduct;
    }, 0) ?? 0
  );
}
