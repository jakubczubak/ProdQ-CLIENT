import { showNotification } from '../../common/service/showNotification';

export const orderManager = {
  getOrderList: async function () {
    const response = await fetch('http://localhost:4000/orders');

    if (!response.ok) throw new Error('Failed to fetch orders' + response.statusText);

    return await response.json();
  },
  createOrder: async function (data, queryClient, dispatch, navigate) {
    fetch('http://localhost:4000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        navigate('/orders');
        showNotification('Order created ', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error adding order! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  deleteOrder: async function (id, queryClient, dispatch) {
    fetch(`http://localhost:4000/orders/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Order deleted ', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error deleting order! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  updateOrder: async function (data, queryClient, dispatch, navigate) {
    fetch(`http://localhost:4000/orders/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        navigate('/orders');
        showNotification(data.orderName + ' updated ', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error updating order! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  }
};
