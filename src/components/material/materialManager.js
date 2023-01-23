export const materialManager = {
  fetchMaterials: async function () {
    const response = await fetch('http://localhost:4000/materials');

    if (!response.ok) throw new Error('Failed to fetch materials' + response.statusText);

    return await response.json();
  },
  postMaterial: function (data, queryClient, onOpen, onError) {
    fetch('http://localhost:4000/materials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['materilas'] });
        onOpen();
      })
      .catch((error) => {
        onError();
        console.error('Error:', error);
      });
  }
};
