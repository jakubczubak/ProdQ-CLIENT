import { showNotification } from '../../common/service/showNotification';

export const materialTypeManageer = {
  createMaterialType: async function (data, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/material_type/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          },
          body: JSON.stringify(data)
        }
      );

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Material type created successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          `Failed to create material type. Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to create material type. Check console for more info.',
        'error',
        dispatch
      );
    }
  }
};
