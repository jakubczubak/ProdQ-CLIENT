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
          // Jeśli status odpowiedzi jest 200 OK, oznacza to sukces
          queryClient.invalidateQueries(); // Odświeżamy zapytania
          showNotification('Notification successfully deleted.', 'success', dispatch);
        } else {
          // W przeciwnym razie coś poszło nie tak
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
          // Jeśli status odpowiedzi jest 200 OK, oznacza to sukces
          queryClient.invalidateQueries(); // Odświeżamy zapytania
          showNotification('Notification updated', 'info', dispatch);
        } else {
          // W przeciwnym razie coś poszło nie tak
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
  }
};
