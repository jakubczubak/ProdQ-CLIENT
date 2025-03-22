import { setBoxQuantity } from '../../../redux/actions/Action';
import { materialManager } from '../../material/service/materialManager';
import { toolManager } from '../../tool/service/toolManager';
import { showNotification } from '../../common/service/showNotification';

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

    list.forEach((item) => {
      if (item.name === itemBox.name) {
        let decrement;
        // Logika dekrementacji
        if (item.item.type === 'tool') {
          decrement = 1; // Narzędzia zawsze -1
        } else if (item.item.type === 'material') {
          // Płyty: x, y, z != 0 i diameter = 0
          if (
            item.item.x !== 0 &&
            item.item.y !== 0 &&
            item.item.z !== 0 &&
            item.item.diameter === 0
          ) {
            decrement = 1; // Płyty -1
          }
          // Pręty/rury: x, y, z = 0 i diameter != 0
          else if (
            item.item.x === 0 &&
            item.item.y === 0 &&
            item.item.z === 0 &&
            item.item.diameter !== 0
          ) {
            decrement = 0.1; // Pręty/rury -0.1
          } else {
            decrement = 1; // Domyślnie -1, jeśli nie pasuje do żadnego przypadku
          }
        }

        // Zaokrąglenie, aby uniknąć problemów z precyzją liczb zmiennoprzecinkowych
        const newQuantity = Math.round((item.quantity - decrement) * 1000000) / 1000000;
        if (newQuantity > 0) {
          item.quantity = newQuantity;
        } else {
          list.splice(list.indexOf(item), 1); // Usunięcie, jeśli ilość <= 0
        }
      }
    });

    localStorage.setItem(key, JSON.stringify(list));
    dispatch(setBoxQuantity(cartManager.accumulateQuantity()));
  },

  increaseItem: (itemBox, dispatch) => {
    const list = cartManager.getItems();

    list.forEach((item) => {
      if (item.name === itemBox.name) {
        let increment;
        // Logika inkrementacji
        if (item.item.type === 'tool') {
          increment = 1; // Narzędzia zawsze +1
        } else if (item.item.type === 'material') {
          // Płyty: x, y, z != 0 i diameter = 0
          if (
            item.item.x !== 0 &&
            item.item.y !== 0 &&
            item.item.z !== 0 &&
            item.item.diameter === 0
          ) {
            increment = 1; // Płyty +1
          }
          // Pręty/rury: x, y, z = 0 i diameter != 0
          else if (
            item.item.x === 0 &&
            item.item.y === 0 &&
            item.item.z === 0 &&
            item.item.diameter !== 0
          ) {
            increment = 0.1; // Pręty/rury +0.1
          } else {
            increment = 1; // Domyślnie +1, jeśli nie pasuje do żadnego przypadku
          }
        }

        // Zaokrąglenie, aby uniknąć problemów z precyzją liczb zmiennoprzecinkowych
        item.quantity = Math.round((item.quantity + increment) * 1000000) / 1000000;
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
              console.error('Error fetching tool group:', error);
              showNotification(
                'The content of your cart is outdated. An error occurred while synchronizing the cart with the server.',
                'error',
                dispatch
              );
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
              console.error('Error fetching material group:', error);
              showNotification(
                'The content of your cart is outdated. An error occurred while synchronizing the cart with the server.',
                'error',
                dispatch
              );
            }
          }
          return null;
        })
      );

      const itemListWithoutNull = itemList.filter((item) => item !== null);
      localStorage.setItem(key, JSON.stringify(itemListWithoutNull));
      dispatch(setBoxQuantity(cartManager.accumulateQuantity()));
    } catch (error) {
      console.error('Error synchronizing cart with server:', error);
      showNotification(
        'Error synchronizing cart with server. Check console for more info.',
        'error',
        dispatch
      );
    }
  }
};