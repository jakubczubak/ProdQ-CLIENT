import { showNotification } from '../../common/service/showNotification';

export const userManager = {
  getUserList: async function () {
    const response = await fetch('http://localhost:4000/user');

    if (!response.ok) throw new Error('Failed to fetch user list' + response.statusText);

    return await response.json();
  },
  createUser: function (data, queryClient, dispatch, navigate) {
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
        navigate('/suppliers');
        showNotification('User created ', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error adding user! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  deleteUser: function (id, queryClient, dispatch) {
    fetch('http://localhost:4000/user/' + id, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('User deleted ', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error deleting user! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  updateUser: function (data, queryClient, dispatch, navigate) {
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
        navigate('/suppliers');
        showNotification('Supplier user', 'info', dispatch);
      })
      .catch((error) => {
        showNotification('Error updating user! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  }
};
