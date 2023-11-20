import { showNotification } from '../../common/service/showNotification';

export const orderManager = {
  getOrderList: async function () {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch('http://localhost:8080/api/order/all', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order list: ' + response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.error('Network error:', error.message);
      throw new Error('Network error: Unable to fetch order list');
    }
  },
  createOrder: async function (data, queryClient, dispatch, navigate) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch('http://localhost:8080/api/order/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        navigate('/orders');
        showNotification('Order created successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(`Failed to create order. Check console and try again.`, 'error', dispatch);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      throw new Error('Network error: Unable to create order');
    }
  },
  deleteOrder: async function (id, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(`http://localhost:8080/api/order/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Order deleted successfully.', 'info', dispatch);
      } else {
        const errorText = await response.text();
        console.error('Error:', response.status, errorText);
        showNotification(`Failed to delete order: Check console.`, 'error', dispatch);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification('Network error: Unable to delete order.', 'error', dispatch);
    }
  },
  updateOrder: async function (data, queryClient, dispatch, navigate) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(`http://localhost:8080/api/order/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        navigate('/orders');
        showNotification('Order updated successfully.', 'info', dispatch);
      } else {
        const errorText = await response.text();
        showNotification(`Failed to update order: Check console and try again`, 'error', dispatch);
        console.error('Server Response:', response.status, errorText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification('Network error: Unable to update order.', 'error', dispatch);
    }
  },
  getNumberOfActiveOrders: async function () {
    const orders = await orderManager.getOrderList();
    let count = 0;
    for (const order of orders) {
      if (order.status === 'pending' || order.status === 'on the way') {
        count++;
      }
    }
    return count;
  }
};
