const key = 'INFRABOX_CART';

export const cartManager = {
  getCart: () => {
    return JSON.parse(localStorage.getItem(key)) || [];
  },

  addItem: (item) => {
    const cart = cartManager.getCart();
    const content = {
      name: item.name,
      quantity: 1,
      item: item
    };

    const stringifiedContent = JSON.stringify(content);
    localStorage.setItem(key, stringifiedContent);
  }
};
