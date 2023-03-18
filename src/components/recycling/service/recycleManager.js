import { showNotification } from '../../common/service/showNotification';

export const recycleManager = {
  getRecycleList: async function () {
    const response = await fetch('http://localhost:4000/recycle');

    if (!response.ok) throw new Error('Failed to fetch recycle list' + response.statusText);

    return await response.json();
  },
  createWTC: function (data, queryClient, dispatch) {
    fetch('http://localhost:4000/recycle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Waste transfer card created ', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error adding waste transfer card! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  deleteWTC: function (id, queryClient, dispatch) {
    fetch('http://localhost:4000/recycle/' + id, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Waste transfer card deleted ', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error deleting waste transfer card! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  updateWTC: function (data, queryClient, dispatch) {
    fetch(`http://localhost:4000/recycle/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Waste transfer card updated', 'info', dispatch);
      })
      .catch((error) => {
        showNotification('Error updating waste transfer card! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  }
};
