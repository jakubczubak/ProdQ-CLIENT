import { showNotification } from '../../common/service/showNotification';

export const cncManager = {
  getCncJobList: async function () {
    const response = await fetch('http://localhost:4000/user');

    if (!response.ok) throw new Error('Failed to fetch cnc job list' + response.statusText);

    return await response.json();
  },

  createCncJob: function (data, queryClient, dispatch) {
    fetch('http://localhost:4000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('User created ', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error adding cnc job! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  deleteCncJob: function (id, queryClient, dispatch) {
    fetch('http://localhost:4000/user/' + id, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('User deleted ', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error deleting cnc job! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  updateCncJob: function (data, queryClient, dispatch) {
    fetch(`http://localhost:4000/user/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification(data.name + ' ' + data.surname + '`s profile updated', 'info', dispatch);
      })
      .catch((error) => {
        showNotification('Error updating cnc job! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  }
};
