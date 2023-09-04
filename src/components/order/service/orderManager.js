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
  deleteOrder: async function (
    id,
    selectedItem,
    toolManager,
    materialManager,
    queryClient,
    dispatch
  ) {
    fetch(`http://localhost:4000/orders/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Order deleted ', 'success', dispatch);
      })
      .then(() => {
        if (selectedItem.isSetQuantityInTransport === true && selectedItem.isAdded === false) {
          selectedItem.items.forEach((item) => {
            if (item.item.type === 'tool') {
              toolManager
                .getToolGroupByID(item.item.parent_id)
                .then((toolGroup) => {
                  toolGroup.toolList = toolGroup.toolList.map((tool) => {
                    if (tool.id === item.item.id) {
                      tool.quantity_in_transit = tool.quantity_in_transit - item.quantity;
                      return tool;
                    }
                    return tool;
                  });
                  return toolGroup;
                })
                .then((toolGroup) => {
                  toolManager.updateToolQunatity(toolGroup, queryClient, dispatch);
                })
                .catch((error) => {
                  console.error(error);
                  // Tutaj możesz obsłużyć błąd, jeśli wystąpił
                });
            } else if (item.item.type === 'material') {
              materialManager
                .getMaterialGroupByID(item.item.parent_id)
                .then((materialGroup) => {
                  materialGroup.toolList = materialGroup.toolList.map((material) => {
                    if (material.id === item.item.id) {
                      material.quantity_in_transit = material.quantity_in_transit - item.quantity;
                      return material;
                    }
                    return material;
                  });
                  return materialGroup;
                })
                .then((materialGroup) => {
                  materialManager.updateMaterialQunatity(materialGroup, queryClient, dispatch);
                })
                .catch((error) => {
                  console.error(error);
                  // Tutaj możesz obsłużyć błąd, jeśli wystąpił
                });
            }
          });
        }
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
