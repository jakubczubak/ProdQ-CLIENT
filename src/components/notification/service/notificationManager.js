import { showNotification } from '../../common/service/showNotification';

export const notificationManager = {
  deleteNotification: function (id, queryClient, dispatch) {
    fetch(`${process.env.REACT_APP_API_SERVER_IP}/api/notification/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`
      }
    })
      .then((response) => {
        if (response.ok) {
          queryClient.invalidateQueries();
          showNotification('Notification successfully deleted.', 'success', dispatch);
        } else {
          showNotification(
            'Error deleting notification! Check console for more info.',
            'error',
            dispatch
          );
        }
      })
      .catch((error) => {
        showNotification(
          'Error deleting notification! Check console for more info.',
          'error',
          dispatch
        );
        console.error('Error:', error);
      });
  },
  updateNotification: function (id, queryClient, dispatch) {
    fetch(`${process.env.REACT_APP_API_SERVER_IP}/api/notification/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`
      }
    })
      .then((response) => {
        if (response.ok) {
          queryClient.invalidateQueries();
          showNotification('Notification updated', 'info', dispatch);
        } else {
          showNotification(
            'Error updating notification! Check console for more info.',
            'error',
            dispatch
          );
        }
      })
      .catch((error) => {
        showNotification(
          'Error updating notification! Check console for more info.',
          'error',
          dispatch
        );
        console.error('Error:', error);
      });
  },
  deleteUnreadNotifications: function (queryClient, dispatch) {
    return fetch(`${process.env.REACT_APP_API_SERVER_IP}/api/notification/delete-unread`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`
      }
    })
      .then((response) => {
        if (response.ok) {
          queryClient.invalidateQueries();
          showNotification('All unread notifications deleted.', 'success', dispatch);
          return response.json(); // Zakładam, że serwer zwraca coś, np. listę usuniętych ID
        } else {
          throw new Error('Failed to delete unread notifications');
        }
      })
      .catch((error) => {
        showNotification(
          'Error deleting unread notifications! Check console for more info.',
          'error',
          dispatch
        );
        console.error('Error:', error);
        throw error; // Rzucamy błąd, aby można go było obsłużyć w wywołującej funkcji
      });
  }
};