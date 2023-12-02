import { showNotification } from '../../common/service/showNotification';

export const calculationManager = {
  getCalculationList: async function () {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch('http://localhost:8080/api/calculation/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cnc calculations');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('Network error: Unable to fetch cnc calcualtions');
    }
  },
  createCalculation: async function (data, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch('http://localhost:8080/api/calculation/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Calcualtion added successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          `Failed to add cnc calcualtion. Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error(
        'Network error: Unable to create cnc calcualtion. Check console for more info.'
      );
    }
  },
  deleteCalculation: async function (id, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(`http://localhost:8080/api/calculation/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Cnc calcualtion deleted successfully.', 'info', dispatch);
      } else {
        const errorText = await response.text();
        console.error('Error:', response.status, errorText);
        showNotification(
          `Failed to delete cnc calculation: Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to delete cnc calcualtion. Check console for more info.',
        'error',
        dispatch
      );
    }
  },
  updateCalculation: async function (data, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch(`http://localhost:8080/api/calculation/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Cnc calcualtion updated successfully.', 'info', dispatch);
      } else {
        const errorText = await response.text();
        showNotification(
          `Failed to update cnc calcualtion: Check console for more info.`,
          'error',
          dispatch
        );
        console.error('Server Response:', response.status, errorText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to update cnc calculation. Check console for more info.',
        'error',
        dispatch
      );
    }
  },
  getNumberOfActiveCalculations: async function () {
    const calculations = await calculationManager.getCalculationList();
    let count = 0;
    for (const calculation of calculations) {
      if (calculation.status === 'Pending') {
        count++;
      }
    }
    return count;
  }
};
