const key = 'INFRABOX_PRODUCTION_CART';
export const productionCartManager = {
  getItems: () => {
    return JSON.parse(localStorage.getItem(key)) || [];
  },
  accumulateQuantity: () => {
    const list = productionCartManager.getItems();
    const totalQuantity = list.reduce((acc, curr) => acc + curr.quantity, 0);
    return totalQuantity;
  },
  addItem: (item) => {
    const list = productionCartManager.getItems();
    const content = {
      name: item.name,
      quantity: 1,
      item: item
    };

    let added = false;
    list.map((item) => {
      if (item.id === content.item.id) {
        item.quantity += 1;
        added = true;
      }
    });

    if (!added) {
      list.push(content);
    }

    localStorage.setItem(key, JSON.stringify(list));
  },
  decreaseItem: (itemBox) => {
    const list = productionCartManager.getItems();

    list.map((item) => {
      if (item.name === itemBox.name) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          list.splice(list.indexOf(item), 1);
        }
      }
    });

    localStorage.setItem(key, JSON.stringify(list));
  },
  increaseItem: (itemBox) => {
    const list = productionCartManager.getItems();

    list.map((item) => {
      if (item.name === itemBox.name) {
        item.quantity += 1;
      }
    });

    localStorage.setItem(key, JSON.stringify(list));
  },
  removeItem: (itemBox) => {
    const list = productionCartManager.getItems();

    list.map((item) => {
      if (item.name === itemBox.name) {
        list.splice(list.indexOf(item), 1);
      }
    });

    localStorage.setItem(key, JSON.stringify(list));
  },
  clearAll: () => {
    localStorage.removeItem(key);
  }
};
