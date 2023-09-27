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
      if (item.item.id === content.item.id) {
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
  //auto add item to cart
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
        if (item.item.id === content.item.id) {
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
  syncCartWithServer: async (dispatch) => {
    const list = cartManager.getItems();
    const itemList = await Promise.all(
      list.map(async (item) => {
        if (item.item.type === 'tool') {
          let toolStillExist = false;
          const toolGroup = await toolManager.getToolGroupByID(item.item.parent_id);
          if (toolGroup) {
            const tool = toolGroup.toolList.find((tool) => tool.id === item.item.id);
            if (tool) {
              toolStillExist = true;
            }
          }
          if (toolStillExist) {
            return item;
          } else {
            return null;
          }
        } else if (item.item.type === 'material') {
          let materialStillExist = false;
          const materialGroup = await materialManager.getMaterialGroupByID(item.item.parent_id);
          if (materialGroup) {
            const material = materialGroup.materialList.find(
              (material) => material.id === item.item.id
            );
            if (material) {
              materialStillExist = true;
            }
          }
          if (materialStillExist) {
            return item;
          } else {
            return null;
          }
        }
      })
    );

    const itemListWithoutNull = itemList.filter((item) => item !== null);
    localStorage.setItem(key, JSON.stringify(itemListWithoutNull));
    dispatch(setBoxQuantity(cartManager.accumulateQuantity()));
  },
};
