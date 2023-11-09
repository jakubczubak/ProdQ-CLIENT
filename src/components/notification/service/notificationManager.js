import { showNotification } from '../../common/service/showNotification';

export const notificationManager = {
  deleteNotification: function (id, queryClient, dispatch) {
    fetch(`http://localhost:8080/api/notification/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          // Jeśli status odpowiedzi jest 200 OK, oznacza to sukces
          queryClient.invalidateQueries(); // Odświeżamy zapytania
          showNotification('Notification successfully deleted.', 'success', dispatch);
        } else {
          // W przeciwnym razie coś poszło nie tak
          showNotification('Error deleting notification! Please try again', 'error', dispatch);
        }
      })
      .catch((error) => {
        showNotification('Error deleting notification! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  updateNotification: function (id, queryClient, dispatch) {
    fetch(`http://localhost:8080/api/notification/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          // Jeśli status odpowiedzi jest 200 OK, oznacza to sukces
          queryClient.invalidateQueries(); // Odświeżamy zapytania
          showNotification('Notification updated', 'info', dispatch);
        } else {
          // W przeciwnym razie coś poszło nie tak
          showNotification('Error updating notification! Please try again', 'error', dispatch);
        }
      })
      .catch((error) => {
        showNotification('Error updating notification! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  }
};
