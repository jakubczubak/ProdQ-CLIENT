import { showNotification } from '../../common/service/showNotification';
import { cartManager } from '../../cart/service/cartManager';

export const toolManager = {
  getToolGroups: async function () {
    const response = await fetch('http://localhost:8080/api/tool_group/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch tool groups' + response.statusText);

    return await response.json();
  },
  createToolGroup: async function (data, queryClient, dispatch) {
    try {
      const response = await fetch('http://localhost:8080/api/tool_group/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Tool group created', 'success', dispatch);
      } else {
        const errorData = await response.text(); // Pobierz dane błędu, jeśli są dostępne
        console.error('Error:', errorData);
        showNotification('Error creating tool group! Please try again', 'error', dispatch);
      }
    } catch (error) {
      showNotification('Error creating tool group! Please try again', 'error', dispatch);
      console.error('Error:', error);
    }
  },
  deleteToolGroup: function (id, queryClient, dispatch) {
    fetch(`http://localhost:8080/api/tool_group/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((response) => {
        if (response.ok) {
          queryClient.invalidateQueries();
          showNotification('Tool group deleted', 'success', dispatch);
        } else {
          const errorData = response.text(); // Pobierz dane błędu, jeśli są dostępne
          console.error('Error:', errorData);
          showNotification('Error deleting tool group! Please try again', 'error', dispatch);
        }
      })
      .catch((error) => {
        showNotification('Error deleting tool group! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  updateToolGroup: function (data, queryClient, dispatch) {
    try {
      fetch(`http://localhost:8080/api/tool_group/update`, {
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
            showNotification('Tool group updated', 'success', dispatch);
          } else {
            const errorData = response.text(); // Pobierz dane błędu, jeśli są dostępne
            console.error('Error:', errorData);
            showNotification('Error updating tool group! Please try again', 'error', dispatch);
          }
        })
        .catch((error) => {
          showNotification('Error updating tool group! Please try again', 'error', dispatch);
          console.error('Error:', error);
        });
    } catch (error) {
      showNotification('Error updating tool group! Please try again', 'error', dispatch);
      console.error('Error:', error);
    }
  },
  updateToolQunatity: function (data, queryClient, dispatch) {
    fetch(`http://localhost:4000/tools/${data.id}`, {
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
  updateToolQunatityInTransit: function (data, queryClient, dispatch) {
    fetch(`http://localhost:4000/tools/${data.id}`, {
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
          'An error occurred while changing order status! Please try again.',
          'error',
          dispatch
        );
        console.error('Error:', error);
      });
  },
  getToolGroupByID: async function (id) {
    const response = await fetch(`http://localhost:8080/api/tool_group/get/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch tool group' + response.statusText);

    return await response.json();
  },
  createTool: async function (data, toolName, queryClient, dispatch) {
    try {
      const response = await fetch(`http://localhost:8080/api/tool/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification(`Tool created - ${toolName}`, 'success', dispatch);
      } else {
        const errorData = await response.text(); // Pobierz dane błędu, jeśli są dostępne
        console.error('Error:', errorData);
        showNotification(`Error creating tool - ${toolName}! Please try again`, 'error', dispatch);
      }
    } catch (error) {
      showNotification(`Error creating tool! - ${toolName}! Please try again`, 'error', dispatch);
      console.error('Error:', error);
    }
  },

  updateTool: function (item, toolName, queryClient, dispatch) {
    fetch(`http://localhost:4000/tools/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification(`Tool updated - ${toolName}`, 'info', dispatch);
      })
      .catch((error) => {
        showNotification(`Error updating tool! - ${toolName} Please try again`, 'error', dispatch);
        console.error('Error:', error);
      });
  },

  deleteTool: function (item, queryClient, dispatch) {
    fetch(`http://localhost:4000/tools/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Tool deleted', 'info', dispatch);
        cartManager.syncCartWithServer(dispatch);
      })
      .catch((error) => {
        showNotification('Error deleting tool! Please try again', 'error', dispatch);
        console.error('Error:', error);
      });
  },
  getNumberOfMissingTools: async function () {
    const toolGroups = await toolManager.getToolGroups();
    let count = 0;
    for (const toolGroup of toolGroups) {
      for (const tool of toolGroup.tools) {
        if (tool.quantity < tool.minQuantity) {
          count++;
        }
      }
    }

    return count;
  },
  getValueOfToolsInMagazine: async function () {
    const toolGroups = await toolManager.getToolGroups();
    let value = 0;
    for (const toolGroup of toolGroups) {
      for (const tool of toolGroup.tools) {
        value += tool.quantity * tool.price;
      }
    }

    return value;
  },
  getNumberOfToolsOnTheWay: async function () {
    const toolGroups = await toolManager.getToolGroups();
    let count = 0;
    for (const toolGroup of toolGroups) {
      for (const tool of toolGroup.tools) {
        if (tool.quantity_in_transit > 0) {
          count++;
        }
      }
    }

    return count;
  },
  calculateValueOfToolsInToolGroup: (toolGroup) => {
    let value = 0;
    for (const tool of toolGroup.tools) {
      value += tool.quantity * tool.price;
    }

    return value;
  }
};
