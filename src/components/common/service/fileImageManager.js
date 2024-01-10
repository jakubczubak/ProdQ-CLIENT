export const fileImageManager = {
  deleteMaterialFileImage: async function (fileID, materialGroupID, queryClient) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/material_group/delete/${fileID}/${materialGroupID}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      );

      if (response.ok) {
        queryClient.invalidateQueries();
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  },
  deleteToolFileImage: async function (fileID, toolGroupID, queryClient) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/tool_group/delete/${fileID}/${toolGroupID}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      );

      if (response.ok) {
        queryClient.invalidateQueries();
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  }
};
