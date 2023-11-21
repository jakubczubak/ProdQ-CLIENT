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

  addItem: (item, parentID, dispatch) => {
    const list = cartManager.getItems();
    const content = {
      name: item.name,
      quantity: 1,
      item: item,
      parentID: parentID
    };

    let added = false;
    list.map((item) => {
      if (item.item.id === content.item.id && item.item.type === content.item.type) {
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
  addItemList: (itemList, parentID, dispatch) => {
    const list = cartManager.getItems();
    itemList.map((item) => {
      const content = {
        name: item.name,
        quantity: item.minQuantity - item.quantity,
        item: item,
        parentID: parentID
      };

      let added = false;
      list.map((item) => {
        if (item.item.id === content.item.id && item.item.type === content.item.type) {
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
    try {
      const list = cartManager.getItems();
      const itemList = await Promise.all(
        list.map(async (item) => {
          if (item.item.type === 'tool') {
            try {
              const toolGroup = await toolManager.getToolGroupByID(item.parentID);
              if (toolGroup) {
                const tool = toolGroup.tools.find((tool) => tool.id === item.item.id);
                if (tool) {
                  return item;
                }
              }
            } catch (error) {
              // Obsłuż błąd, gdy nie uda się pobrać grupy narzędzi
              console.error('Error fetching tool group:', error);
            }
          } else if (item.item.type === 'material') {
            try {
              const materialGroup = await materialManager.getMaterialGroupByID(item.parentID);
              if (materialGroup) {
                const material = materialGroup.materials.find(
                  (material) => material.id === item.item.id
                );
                if (material) {
                  return item;
                }
              }
            } catch (error) {
              // Obsłuż błąd, gdy nie uda się pobrać grupy materiałów
              console.error('Error fetching material group:', error);
            }
          }
          return null;
        })
      );

      const itemListWithoutNull = itemList.filter((item) => item !== null);
      localStorage.setItem(key, JSON.stringify(itemListWithoutNull));
      dispatch(setBoxQuantity(cartManager.accumulateQuantity()));
    } catch (error) {
      // Obsłuż ogólny błąd synchronizacji z serwerem
      console.error('Error synchronizing cart with server:', error);
    }
  }
};
