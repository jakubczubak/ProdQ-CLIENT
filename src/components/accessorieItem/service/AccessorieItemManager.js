import { showNotification } from '../../common/service/showNotification';
import { cartManager } from '../../cart/service/cartManager';
import { accessorieManager } from '../../accessories/service/AccessorieManager';

export const accessorieItemManager = {
  createAccessorieItem: async function (data, accessorieItemName, queryClient, dispatch) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/accessorie/item/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          },
          body: JSON.stringify(data)
        }
      );

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification(
          `Accessorie item created successfully - ${accessorieItemName}`,
          'success',
          dispatch
        );
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          `Failed to create accessorie - ${accessorieItemName}. Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        `Network error: Unable to create accessorie - ${accessorieItemName}. Check console for more info.`,
        'error',
        dispatch
      );
    }
  },

  updateAccessorieItem: async function (data, accessorieItemName, queryClient, dispatch) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/accessorie/item/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          },
          body: JSON.stringify(data)
        }
      );

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification(
          `Accessorie item updated successfully - ${accessorieItemName}`,
          'info',
          dispatch
        );
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        showNotification(
          `Failed to update accessorie item - ${accessorieItemName}. Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        `Network error: Unable to update accessorie item - ${accessorieItemName}. Check console for more info.`,
        'error',
        dispatch
      );
    }
  },

  deleteTool: async function (item, queryClient, dispatch) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/accessorie/item/delete/${item.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          },
          body: JSON.stringify(item)
        }
      );

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Accessorie item deleted successfully', 'info', dispatch);
        cartManager.syncCartWithServer(dispatch);
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        showNotification(
          `Failed to delete accessorie item. Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to delete accessorie item. Check console for more info.',
        'error',
        dispatch
      );
    }
  },
  getNumberOfMissingAccessories: async function () {
    const accessorieGroups = await accessorieManager.getAccessories();
    let totalMissing = 0; // Zmienna do sumowania brakujących ilości

    for (const accessorieGroup of accessorieGroups) {
      for (const accessorieItem of accessorieGroup.accessorieItems) {
        if (accessorieItem.quantity < accessorieItem.minQuantity) {
          // Oblicz różnicę pomiędzy minimalną ilością a faktyczną ilością
          totalMissing += accessorieItem.minQuantity - accessorieItem.quantity;
        }
      }
    }

    return totalMissing; // Zwróć sumę brakujących ilości
  },
  getValueOfAccessoriesInMagazine: async function () {
    const accessorieGroups = await accessorieManager.getAccessories();
    let value = 0;
    for (const accessorieGroup of accessorieGroups) {
      for (const accessorieItem of accessorieGroup.accessorieItems) {
        value += accessorieItem.quantity * accessorieItem.price;
      }
    }
    return value.toFixed(2);
  },
  calculateValueOfAccessorieInAccessorieGroup: (accessorieGroup) => {
    let value = 0;
    for (const accessorieItem of accessorieGroup.accessorieItems) {
      value += accessorieItem.quantity * accessorieItem.price;
    }
    return value;
  }
};
