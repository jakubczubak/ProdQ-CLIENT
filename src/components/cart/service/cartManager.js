const key = 'INFRABOX_CART';

export const cartManager = {
  getCart: () => {
    return JSON.parse(localStorage.getItem(key)) || [];
  },

  addItem: (item) => {
    const list = cartManager.getCart();
    const content = {
      name: item.name,
      quantity: 1,
      item: item
    };

    let added = false;
    list.map((item) => {
      if (item.name === content.name) {
        item.quantity += 1;
        added = true;
      }
    });

    if (!added) {
      list.push(content);
    }

    localStorage.setItem(key, JSON.stringify(list));
  }
};
