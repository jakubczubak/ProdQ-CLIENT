import { showNotification } from '../../common/service/showNotification';
import { cartManager } from '../../cart/service/cartManager';

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

  updateMaterialQunatity: function (data, queryClient, dispatch) {
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
        showNotification('Successfully added order to virtual magazine', 'success', dispatch);
      })
      .catch((error) => {
        showNotification(
          'An error occurred while adding the order to the virtual magazine! Please try again.',
          'error',
          dispatch
        );
        console.error('Error:', error);
      });
  },
  updateMaterialQunatityInTransit: function (data, queryClient, dispatch) {
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
        showNotification('Successfully set order status to "on the way"', 'success', dispatch);
      })
      .catch((error) => {
        showNotification(
          'An error occurred while changing order status! Please try again.! Please try again.',
          'error',
          dispatch
        );
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
        cartManager.syncCartWithServer(dispatch);
      })
      .catch((error) => {
        showNotification('Error deleting material! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },

  getNumberOfMissingMaterials: async function () {
    const materialGroups = await materialManager.getMaterialGroups();
    let count = 0;
    for (const materialGroup of materialGroups) {
      for (const material of materialGroup.materialList) {
        if (material.quantity < material.min_quantity) {
          count++;
        }
      }
    }

    return count;
  },
  getValueOfMaterialsInMagazine: async function () {
    const materialGroups = await materialManager.getMaterialGroups();
    let value = 0;
    for (const materialGroup of materialGroups) {
      for (const material of materialGroup.materialList) {
        value += material.quantity * material.price;
      }
    }

    return value;
  },
  getNumberOfMaterialsOnTheWay: async function () {
    const materialGroups = await materialManager.getMaterialGroups();
    let count = 0;
    for (const materialGroup of materialGroups) {
      for (const material of materialGroup.materialList) {
        if (material.quantity_in_transit > 0) {
          count++;
        }
      }
    }

    return count;
  }
};
