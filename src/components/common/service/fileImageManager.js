export const fileImageManager = {
  deleteFileImage: async function (fileID, materialGroupID, queryClient) {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/file/delete/${fileID}/${materialGroupID}`,
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
