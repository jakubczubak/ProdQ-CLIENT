import { showNotification } from '../../common/service/showNotification';

export const productionManager = {
  getProductionList: () => {},

  createProductionItem: async function (data, queryClient, dispatch) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_IP}/api/production/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`
        },
        body: data
      });

      if (response.ok) {
        queryClient.invalidateQueries();
        showNotification('Production item created successfully.', 'success', dispatch);
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        showNotification(
          `Failed to create production item. Check console for more info.`,
          'error',
          dispatch
        );
      }
    } catch (error) {
      console.error('Network error:', error.message);
      showNotification(
        'Network error: Unable to create production item. Check console for more info.',
        'error',
        dispatch
      );
    }
  }
};
