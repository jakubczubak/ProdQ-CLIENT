import { setProductionBoxQuantity } from '../../../redux/actions/Action';

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
  addItem: (item, dispatch) => {
    const list = productionCartManager.getItems();
    const content = {
      name: item.partName,
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
    dispatch(setProductionBoxQuantity(productionCartManager.accumulateQuantity()));
  },
  decreaseItem: (itemBox, dispatch) => {
    const list = productionCartManager.getItems();

    list.map((item) => {
      if (item.partName === itemBox.partName) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          list.splice(list.indexOf(item), 1);
        }
      }
    });

    localStorage.setItem(key, JSON.stringify(list));
    dispatch(setProductionBoxQuantity(productionCartManager.accumulateQuantity()));
  },
  increaseItem: (itemBox, dispatch) => {
    const list = productionCartManager.getItems();

    list.map((item) => {
      if (item.partName === itemBox.partName) {
        item.quantity += 1;
      }
    });

    localStorage.setItem(key, JSON.stringify(list));
    dispatch(setProductionBoxQuantity(productionCartManager.accumulateQuantity()));
  },
  removeItem: (itemBox, dispatch) => {
    const list = productionCartManager.getItems();

    list.map((item) => {
      if (item.partName === itemBox.partName) {
        list.splice(list.indexOf(item), 1);
      }
    });

    localStorage.setItem(key, JSON.stringify(list));
    dispatch(setProductionBoxQuantity(productionCartManager.accumulateQuantity()));
  },
  clearAll: (dispatch) => {
    localStorage.removeItem(key);
    dispatch(setProductionBoxQuantity(productionCartManager.accumulateQuantity()));
  }
};
