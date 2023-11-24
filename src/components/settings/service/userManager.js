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
  createUser: function (data, queryClient, dispatch) {
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
        showNotification(`Failed to update user data. ${errorData}.`, 'error', dispatch);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification('Network error: Unable to update user data.', 'error', dispatch);
    }
  },
  checkUserByEmail: async function (email) {
    // kod sprawdzający bazę danych i zwracający true, jeśli użytkownik o podanym mailu istnieje, w przeciwnym razie false

    try {
      const response = await fetch(`http://localhost:4000/user?email=${email}`);
      const data = await response.json();
      return data.length > 0; // zwraca true, jeśli istnieje użytkownik o podanym emailu, w przeciwnym razie false
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};
