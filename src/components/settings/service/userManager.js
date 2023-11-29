import { showNotification } from '../../common/service/showNotification';

export const userManager = {
  getUserList: async function () {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch('http://localhost:8080/api/user/all', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user list: ' + response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.error('Network error:', error.message);
      throw new Error('Network error: Unable to fetch user list');
    }
  },
  getUserData: async function () {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch('http://localhost:8080/api/user/userData', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data: ' + response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.error('Network error:', error.message);
      throw new Error('Network error: Unable to fetch user data');
    }
  },
  createUser: async function (data, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(`http://localhost:8080/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('User added successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(`Failed to add user. Check console for more info.`, 'error', dispatch);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification('Network error: Unable to add user. Check console for more info.', 'error', dispatch);
    }
  },
  deleteUser: async function (id, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(`http://localhost:8080/api/user/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('User deleted successfully.', 'info', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification('Failed to delete user. Check console for more info.', 'error', dispatch);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification('Network error: Unable to delete user. Check console for more info.', 'error', dispatch);
    }
  },
  updateUser: async function (data, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch('http://localhost:8080/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('User data updated successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(`Failed to update user data. Check console for more info.`, 'error', dispatch);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification('Network error: Unable to update user data. Check console for more info.', 'error', dispatch);
    }
  },
  updateUserAccount: async function (data, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch('http://localhost:8080/api/user/update/user_account', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('User data updated successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(`Failed to update user data. Check console for more info.`, 'error', dispatch);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification('Network error: Unable to update user data. Check console for more info.', 'error', dispatch);
    }
  },
  checkUserByEmail: async function (email) {
    // kod sprawdzający bazę danych i zwracający true, jeśli użytkownik o podanym mailu istnieje, w przeciwnym razie false

    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch(`http://localhost:8080/api/user/email/check/${email}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to check user email: ' + response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.error('Network error:', error.message);
      throw new Error('Network error: Unable to check user email');
    }
  },

  manageUser: async function (id, action, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(`http://localhost:8080/api/user/manageUser/${id}/${action}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification(`User updated successfully`, 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(`Failed to update user. Check console for more info.`, 'error', dispatch);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification('Network error: Unable to update user. Check console for more info.', 'error', dispatch);
    }
  }
};
