const key = 'INFRABOX_CART';

export const cartManager = {
  getCart: () => {
    return JSON.parse(localStorage.getItem(key)) || [];
  },

  addItem: (item) => {
    console.log(item.id);
    const cart = Array.from(cartManager.getCart());
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.item.id === item.id);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      cart.push({ name: item.name, quantity: item.quantity, item: item });
    }

    const stringifiedContent = JSON.stringify(cart);
    localStorage.setItem(key, stringifiedContent);
  }
};
