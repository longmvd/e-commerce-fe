import i18n from '@/i18n';

export function getPriceAfterDiscount(price: number, discount: number[]) {
  return price * discount;
}

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
