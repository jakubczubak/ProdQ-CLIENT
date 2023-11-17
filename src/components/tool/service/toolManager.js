import { showNotification } from '../../common/service/showNotification';
import { cartManager } from '../../cart/service/cartManager';

export const toolManager = {
  getToolGroups: async function () {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch('http://localhost:8080/api/tool_group/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        return response.json();
      } else {
        const errorText = await response.text();
        console.error('Error:', response.status, errorText);
        throw new Error(`Failed to fetch tool groups: ${errorText}`);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      throw new Error('Network error: Unable to fetch tool groups');
    }
  },
  createToolGroup: async function (data, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch('http://localhost:8080/api/tool_group/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Tool group created successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          `Failed to create tool group. Check console and try again.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification('Network error: Unable to create tool group.', 'error', dispatch);
    }
  },
  deleteToolGroup: async function (id, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(`http://localhost:8080/api/tool_group/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        queryClient.invalidateQueries('toolGroups'); // Aktualizuj tylko konkretny query, jeśli to konieczne
        showNotification('Tool group deleted successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification('Failed to delete tool group. Please try again.', 'error', dispatch);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification('Network error: Unable to delete tool group.', 'error', dispatch);
    }
  },
  updateToolGroup: async function (data, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(`http://localhost:8080/api/tool_group/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Tool group updated successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          `Failed to update tool group. Chceck console and try again.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification('Network error: Unable to update tool group.', 'error', dispatch);
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
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(`http://localhost:8080/api/tool_group/get/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        return response.json();
      } else {
        const errorText = await response.text();
        console.error('Error:', response.status, errorText);
        throw new Error(`Failed to fetch tool group: ${errorText}`);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      throw new Error('Network error: Unable to fetch tool group');
    }
  },
  createTool: async function (data, toolName, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch('http://localhost:8080/api/tool/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification(`Tool created successfully - ${toolName}`, 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          `Failed to create tool - ${toolName}. Check console and try again.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(`Network error: Unable to create tool - ${toolName}.`, 'error', dispatch);
    }
  },

  updateTool: async function (data, toolName, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch('http://localhost:8080/api/tool/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification(`Tool updated successfully - ${toolName}`, 'info', dispatch);
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        showNotification(
          `Failed to update tool - ${toolName}. Check console and try again.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(`Network error: Unable to update tool - ${toolName}.`, 'error', dispatch);
    }
  },

  deleteTool: async function (item, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(`http://localhost:8080/api/tool/delete/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(item)
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Tool deleted successfully', 'info', dispatch);
        cartManager.syncCartWithServer(dispatch);
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        showNotification(`Failed to delete tool. Check console.`, 'error', dispatch);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to delete tool. Please try again.',
        'error',
        dispatch
      );
    }
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
        if (tool.quantityInTransit > 0) {
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
