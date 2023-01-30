export const calculatePrice = (weight, pricePerKg) => {
  const price = pricePerKg * weight;
  return price.toFixed(2);
};
