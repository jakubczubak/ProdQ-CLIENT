import { showNotification } from '../../common/service/showNotification';
import { cartManager } from '../../cart/service/cartManager';

export const materialManager = {
  getMaterialGroups: async function () {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/material_group/get`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch material groups: ' + response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.error('Network error:', error.message);
      throw new Error('Network error: Unable to fetch material groups');
    }
  },
  createMaterialGroup: async function (data, queryClient, dispatch) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/material_group/create`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${userToken}`
          },
          body: data
        }
      );

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Material group created successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          `Failed to create material group. Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to create material group. Check console for more info.',
        'error',
        dispatch
      );
    }
  },
  updateMaterialGroup: async function (data, queryClient, dispatch) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/material_group/update`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${userToken}`
          },
          body: data
        }
      );

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Material group updated successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          `Failed to update material group. Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to update material group. Check console for more info.',
        'error',
        dispatch
      );
    }
  },
  deleteMaterialGroup: async function (id, queryClient, dispatch) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/material_group/delete/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      );

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Material group deleted successfully.', 'info', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          'Failed to delete material group. Check console for more info.',
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to delete material group. Check console for more info.',
        'error',
        dispatch
      );
    }
  },
  getMaterialGroupByID: async function (id) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/material_group/get/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch material group: ' + response.statusText);
      }

      return response.json();
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error('Failed to fetch material group');
    }
  },
  createMaterial: async function (dataToSend, queryClient, dispatch) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(`${process.env.REACT_APP_API_SERVER_IP}/api/material/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Material added successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(`Failed to add material. Check console for more info.`, 'error', dispatch);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to add material. Check console for more info.',
        'error',
        dispatch
      );
    }
  },
  updateMaterial: async function (data, queryClient, dispatch) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(`${process.env.REACT_APP_API_SERVER_IP}/api/material/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Material updated successfully.', 'info', dispatch);
      } else {
        const errorText = await response.text();
        showNotification(
          `Failed to update material: Check console for more info.`,
          'error',
          dispatch
        );
        console.error('Server Response:', response.status, errorText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to update material. Check console for more info.',
        'error',
        dispatch
      );
    }
  },

  deleteMaterial: async function (id, queryClient, dispatch) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/material/delete/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          }
        }
      );

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Material deleted successfully.', 'info', dispatch);
        cartManager.syncCartWithServer(dispatch);
      } else {
        const errorText = await response.text();
        console.error('Error:', response.status, errorText);
        showNotification(
          `Failed to delete material: Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to delete material. Check console for more info.',
        'error',
        dispatch
      );
    }
  },

  getNumberOfMissingMaterials: async function () {
    const materialGroups = await materialManager.getMaterialGroups();
    let totalMissing = 0; // Zmienna do sumowania brakujących ilości

    for (const materialGroup of materialGroups) {
      for (const material of materialGroup.materials) {
        if (material.quantity < material.minQuantity) {
          // Oblicz różnicę pomiędzy minimalną ilością a faktyczną ilością
          totalMissing += material.minQuantity - material.quantity;
        }
      }
    }

    return totalMissing; // Zwróć sumę brakujących ilości materiałów
  },
  getValueOfMaterialsInMagazine: async function () {
    const materialGroups = await materialManager.getMaterialGroups();
    let value = 0;
    for (const materialGroup of materialGroups) {
      for (const material of materialGroup.materials) {
        value += material.quantity * material.price;
      }
    }

    return value.toFixed(2);
  },
  getNumberOfMaterialsOnTheWay: async function () {
    const materialGroups = await materialManager.getMaterialGroups();
    let count = 0;
    for (const materialGroup of materialGroups) {
      for (const material of materialGroup.materials) {
        if (material.quantityInTransit > 0) {
          count++;
        }
      }
    }

    return count;
  },
  calculateValueOfMaterialsInMaterialGroup: function (materialGroup) {
    let value = 0;
    for (const material of materialGroup.materials) {
      value += material.quantity * material.price;
    }

    return value;
  }
};
