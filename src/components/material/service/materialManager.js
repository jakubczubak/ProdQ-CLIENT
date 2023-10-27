import { showNotification } from '../../common/service/showNotification';
import { cartManager } from '../../cart/service/cartManager';

export const materialManager = {
  getMaterialGroups: async function () {
    const response = await fetch('http://localhost:8080/api/material_group/get', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch materials: ' + response.statusText);
    }

    return await response.json();
  },
  createMaterialGroup: async function (data, queryClient, dispatch) {
    try {
      const response = await fetch('http://localhost:8080/api/material_group/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Jeśli odpowiedź od serwera jest w porządku (status HTTP 2xx), kontynuuj

        // Zaktualizuj cache danych za pomocą React Query
        queryClient.invalidateQueries();

        // Wyświetl powiadomienie o sukcesie
        showNotification('Material group added', 'success', dispatch);
      } else {
        // Jeśli odpowiedź jest nieudana, obsłuż błąd
        const errorData = await response.text(); // Pobierz dane błędu, jeśli są dostępne
        console.error('Error:', errorData);

        // Wyświetl powiadomienie o błędzie
        showNotification('Error adding material group! Please try again', 'error', dispatch);
      }
    } catch (error) {
      // Obsłuż błąd sieciowy lub innego rodzaju błąd
      console.error('Error:', error);
      showNotification('Error adding material group! Please try again', 'error', dispatch);
    }
  },
  updateMaterialGroup: async function (data, queryClient, dispatch) {
    try {
      const response = await fetch('http://localhost:8080/api/material_group/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Jeśli odpowiedź od serwera jest w porządku (status HTTP 2xx), kontynuuj

        // Zaktualizuj cache danych za pomocą React Query
        queryClient.invalidateQueries();

        // Wyświetl powiadomienie o sukcesie
        showNotification('Material group updated', 'success', dispatch);
      } else {
        // Jeśli odpowiedź jest nieudana, obsłuż błąd
        const errorData = await response.text(); // Pobierz dane błędu, jeśli są dostępne
        console.error('Error:', errorData);

        // Wyświetl powiadomienie o błędzie
        showNotification('Error updating material group! Please try again', 'error', dispatch);
      }
    } catch (error) {
      // Obsłuż błąd sieciowy lub innego rodzaju błąd
      console.error('Error:', error);
      showNotification('Error updating material group! Please try again', 'error', dispatch);
    }
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
    fetch(`http://localhost:8080/api/material_group/delete/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((response) => {
        if (response.ok) {
          // Status 204 oznacza sukces (brak ciała odpowiedzi)
          queryClient.invalidateQueries();
          showNotification('Material group deleted', 'info', dispatch);
        } else {
          // Obsługa innych statusów odpowiedzi (np. błąd serwera)
          showNotification('Error deleting material group! Please try again', 'error', dispatch);
        }
      })
      .catch((error) => {
        // Obsługa błędów związanych z żądaniem (np. brak połączenia)
        showNotification('Error deleting material group! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  getMaterialGroupByID: async function (id) {
    const response = await fetch(`http://localhost:8080/api/material_group/get/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch material' + response.statusText);

    return await response.json();
  },
  createMaterial: function (dataToSend, queryClient, dispatch) {
    return fetch(`http://localhost:8080/api/material/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      },
      body: JSON.stringify(dataToSend)
    })
      .then((response) => {
        if (response.ok) {
          queryClient.invalidateQueries();
          showNotification('Material added', 'success', dispatch);
          return { success: true, message: 'Material added' };
        } else {
          showNotification('Error adding material! Please try again', 'error', dispatch);
          return { success: false, message: 'Error adding material' };
        }
      })
      .catch((error) => {
        showNotification('Error adding material! Please try again', 'error', dispatch);
        console.error('Error:', error);
        return { success: false, message: 'Error adding material: ' + error.message };
      });
  },

  updateMaterial: function (data, queryClient, dispatch) {
    fetch(`http://localhost:8080/api/material/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          queryClient.invalidateQueries();
          showNotification('Material updated', 'info', dispatch);
        } else {
          return response.text().then((errorText) => {
            showNotification(`Error updating material: ${errorText}`, 'error', dispatch);
            console.error('Server Response:', response.status, errorText);
          });
        }
      })
      .catch((error) => {
        showNotification('Error updating material! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },

  deleteMaterial: function (id, queryClient, dispatch) {
    fetch(`http://localhost:8080/api/material/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((response) => {
        if (response.ok) {
          // Status odpowiedzi 200 oznacza sukces
          queryClient.invalidateQueries();
          showNotification('Material deleted', 'info', dispatch);
          cartManager.syncCartWithServer(dispatch);
        } else {
          // Inny status oznacza błąd
          showNotification('Error deleting material! Please try again', 'error', dispatch);
          console.error('Error:', response.status);
        }
      })
      .catch((error) => {
        // Obsługa błędów sieciowych
        showNotification('Error deleting material! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },

  getNumberOfMissingMaterials: async function () {
    const materialGroups = await materialManager.getMaterialGroups();
    let count = 0;
    for (const materialGroup of materialGroups) {
      for (const material of materialGroup.materials) {
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
      for (const material of materialGroup.materials) {
        value += material.quantity * material.price;
      }
    }

    return value;
  },
  getNumberOfMaterialsOnTheWay: async function () {
    const materialGroups = await materialManager.getMaterialGroups();
    let count = 0;
    for (const materialGroup of materialGroups) {
      for (const material of materialGroup.materials) {
        if (material.quantity_in_transit > 0) {
          count++;
        }
      }
    }

    return count;
  },
  calculateValueOfMaterialsInMaterialGroup: function (materialGroup) {
    let value = 0;
    for (const material of materialGroup.materials) {
      value += material.quantity * material.price;
    }

    return value;
  }
};
