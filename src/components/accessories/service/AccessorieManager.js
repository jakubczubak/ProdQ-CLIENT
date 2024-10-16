import { showNotification } from '../../common/service/showNotification';

export const accessorieManager = {
  getAccessories: async function () {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_IP}/api/accessorie/get`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch accessories: ' + response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.error('Network error:', error.message);
      throw new Error('Network error: Unable to fetch accessories');
    }
  },
  createAccessorie: async function (formData, queryClient, dispatch) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_IP}/api/accessorie/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`
        },
        body: formData
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Accessories created successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          `Failed to create accessories. Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to create accessories. Check console for more info.',
        'error',
        dispatch
      );
    }
  },
  updateAccessorie: async function (formData, queryClient, dispatch) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_IP}/api/accessorie/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userToken}`
        },
        body: formData
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Accessories updated successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          `Failed to update accessories. Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to update accessories. Check console for more info.',
        'error',
        dispatch
      );
    }
  },
  deleteAccessorie: async function (accessorieID, queryClient, dispatch) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/accessorie/delete/${accessorieID}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      );

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Accessories deleted successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          `Failed to delete accessories. Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to delete accessories. Check console for more info.',
        'error',
        dispatch
      );
    }
  },
  calculateAccessorieGroupValue: function (accessorieGroup) {
    let value = 0;
    for (const accessorie of accessorieGroup.accessorieItems) {
      value += accessorie.quantity * accessorie.price;
    }

    return value;
  },
  getAccessorieGroupByID: async function (id) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/accessorie/get/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          }
        }
      );

      if (response.ok) {
        return response.json();
      } else {
        const errorText = await response.text();
        console.error('Error:', response.status, errorText);
        throw new Error(`Failed to fetch accessorie group: ${errorText}`);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      throw new Error('Network error: Unable to fetch accessorie group');
    }
  }
};
