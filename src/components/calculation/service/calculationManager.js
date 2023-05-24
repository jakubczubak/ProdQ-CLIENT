import { showNotification } from '../../common/service/showNotification';

export const calculationManager = {
  getCalculationList: async function () {
    const response = await fetch('http://localhost:4000/calculation');

    if (!response.ok) throw new Error('Failed to fetch calculation list' + response.statusText);

    return await response.json();
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
        showNotification(data.name + ' calculation updated!', 'info', dispatch);
      })
      .catch((error) => {
        showNotification('Error updating calculation! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  }
};
