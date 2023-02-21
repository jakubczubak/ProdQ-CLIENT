import { showNotification } from '../../common/service/showNotification';

export const materialManager = {
  getMaterialGroups: async function () {
    const response = await fetch('http://localhost:4000/materials');

    if (!response.ok) throw new Error('Failed to fetch materials' + response.statusText);

    return await response.json();
  },
  createMaterialGroup: function (data, queryClient, dispatch) {
    fetch('http://localhost:4000/materials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Material group added', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error adding material group! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  updateMaterialGroup: function (data, queryClient, dispatch) {
    fetch(`http://localhost:4000/materials/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Material group updated', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error updating material group! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  deleteMaterialGroup: function (id, queryClient, dispatch) {
    fetch(`http://localhost:4000/materials/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Material group deleted', 'info', dispatch);
      })
      .catch((error) => {
        showNotification('Error deleting material group! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  getMaterialGroupByID: async function (id) {
    const response = await fetch(`http://localhost:4000/materials/${id}`);

    if (!response.ok) throw new Error('Failed to fetch material' + response.statusText);

    return await response.json();
  },
  createMaterial: function (item, queryClient, dispatch) {
    fetch(`http://localhost:4000/materials/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Material added', 'success', dispatch);
      })
      .catch((error) => {
        showNotification('Error adding material! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },

  updateMaterial: function (item, queryClient, dispatch) {
    fetch(`http://localhost:4000/materials/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Material updated', 'info', dispatch);
      })
      .catch((error) => {
        showNotification('Error updating material! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },

  deleteMaterial: function (item, queryClient, dispatch) {
    fetch(`http://localhost:4000/materials/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Material deleted', 'info', dispatch);
      })
      .catch((error) => {
        showNotification('Error deleting material! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  }
};
