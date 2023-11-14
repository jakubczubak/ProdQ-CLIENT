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
  createCalculation: function (data, queryClient, dispatch) {
    fetch('http://localhost:4000/calculation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Calculation created ', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error adding calculation! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  deleteCalculation: function (id, queryClient, dispatch) {
    fetch('http://localhost:4000/calculation/' + id, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Calculation deleted ', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error deleting calculation! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  updateCalculation: function (data, queryClient, dispatch) {
    fetch(`http://localhost:4000/calculation/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification(data.calculationName + ' calculation updated!', 'info', dispatch);
      })
      .catch((error) => {
        showNotification('Error updating calculation! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
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
