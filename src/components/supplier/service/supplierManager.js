import { showNotification } from '../../common/service/showNotification';

export const supplierManager = {
  getSupplierList: async function () {
    const response = await fetch('http://localhost:4000/supplier');

    if (!response.ok) throw new Error('Failed to fetch supplier list' + response.statusText);

    return await response.json();
  },
  createSupplier: function (data, queryClient, dispatch, navigate) {
    fetch('http://localhost:4000/supplier', {
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
        showNotification('Supplier created ', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error adding supplier! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  deleteSupplier: function (id, queryClient, dispatch) {
    fetch('http://localhost:4000/supplier/' + id, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Supplier deleted ', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error deleting supplier! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  updateSupplier: function (data, queryClient, dispatch) {
    fetch(`http://localhost:4000/supplier/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Supplier updated', 'info', dispatch);
      })
      .catch((error) => {
        showNotification('Error updating supplier! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  }
};
