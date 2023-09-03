import { setBoxQuantity } from '../../../redux/actions/Action';
import { materialManager } from '../../material/service/materialManager';
import { toolManager } from '../../tool/service/toolManager';

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

  addItemList: (itemList, dispatch) => {
    const list = cartManager.getItems();

    itemList.map((item) => {
      const content = {
        name: item.name,
        quantity: item.min_quantity - item.quantity,
        item: item
      };

      let added = false;
      list.map((item) => {
        if (item.name === content.name) {
          item.quantity += content.quantity - item.quantity;
          added = true;
        }
      });

      if (!added) {
        list.push(content);
      }
    });

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
  },
  syncCartWithServer: (dispatch) => {
    const list = cartManager.getItems();
    const itemList = list.map((item) => {
      if (item.item.type === 'tool') {
        return item;
      } else if (item.item.type === 'material') {
        return item;
      }
    });
    localStorage.setItem(key, JSON.stringify(itemList));
    dispatch(setBoxQuantity(cartManager.accumulateQuantity()));
  }
};
