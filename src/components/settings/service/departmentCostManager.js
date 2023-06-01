import { showNotification } from '../../common/service/showNotification';

export const departmentCostManager = {
  getDefaultDepartmentCost: async function () {
    const response = await fetch('http://localhost:4000/departmentCost/1');

    if (!response.ok)
      throw new Error('Failed to fetch default department cost' + response.statusText);

    return await response.json();
  },
  updateDefaultDepartmentCost: function (data, queryClient, dispatch) {
    fetch(`http://localhost:4000/departmentCost/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        showNotification('Default department cost updated!', 'info', dispatch);
      })
      .catch((error) => {
        showNotification(
          'Error updating default department cost! Please try again',
          'error',
          dispatch
        );
        console.error('Error:', error);
      });
  }
};
