export const calcualteTotalPrice = (price, quantity) => {
  const totalPrice = price * quantity;
  return totalPrice.toFixed(2);
};
