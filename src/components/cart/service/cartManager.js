import { setBoxQuantity } from '../../../redux/actions/Action';

const key = 'INFRABOX_CART';

export const cartManager = {
  getItems: () => {
    return JSON.parse(localStorage.getItem(key)) || [];
  },

  accumulateQuantity: () => {
    const list = cartManager.getItems();
    const totalQuantity = list.reduce((acc, curr) => acc + curr.quantity, 0);
    return totalQuantity;
  },

  addItem: (item, dispatch) => {
    const list = cartManager.getItems();
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
    dispatch(setBoxQuantity(cartManager.accumulateQuantity()));
  },

  decreaseItem: (itemBox, dispatch) => {
    const list = cartManager.getItems();

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
    dispatch(setBoxQuantity(cartManager.accumulateQuantity()));
  },

  increaseItem: (itemBox, dispatch) => {
    const list = cartManager.getItems();

    list.map((item) => {
      if (item.name === itemBox.name) {
        item.quantity += 1;
      }
    });

    localStorage.setItem(key, JSON.stringify(list));
    dispatch(setBoxQuantity(cartManager.accumulateQuantity()));
  },

  removeItem: (itemBox, dispatch) => {
    const list = cartManager.getItems();

    list.map((item) => {
      if (item.name === itemBox.name) {
        list.splice(list.indexOf(item), 1);
      }
    });

    localStorage.setItem(key, JSON.stringify(list));
    dispatch(setBoxQuantity(cartManager.accumulateQuantity()));
  },
  clearAll: (dispatch) => {
    localStorage.removeItem(key);
    dispatch(setBoxQuantity(cartManager.accumulateQuantity()));
  }
};
