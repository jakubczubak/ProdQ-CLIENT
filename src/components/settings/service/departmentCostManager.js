import { showNotification } from '../../common/service/showNotification';

export const departmentCostManager = {
  getDefaultDepartmentCost: async function () {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/department_cost/get`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch default department cost: ' + response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.error('Network error:', error.message);
      throw new Error('Network error: Unable to fetch default department cost');
    }
  },
  updateDefaultDepartmentCost: async function (data, queryClient, dispatch) {
    try {
      const userToken = sessionStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/department_cost/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          },
          body: JSON.stringify(data)
        }
      );

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Department const updated successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          `Failed to update department const. Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      showNotification(
        'Error updating default department cost! Check console for more info.',
        'error',
        dispatch
      );
      console.error('Error:', error.message);
    }
  }
};
