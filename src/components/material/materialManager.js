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
        queryClient.invalidateQueries({ queryKey: ['materials'] });
        onOpen();
      })
      .catch((error) => {
        onError();
        console.error('Error:', error);
      });
  },
  deleteMaterial: function (id, queryClient, onSuccessDelete, onErrorDelete) {
    fetch(`http://localhost:4000/materials/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['materials'] });
        onSuccessDelete();
      })
      .catch((error) => {
        onErrorDelete();
        console.error('Error:', error);
      });
  },
  fetchMaterialByID: async function (id) {
    const response = await fetch(`http://localhost:4000/materials/${id}`);

    if (!response.ok) throw new Error('Failed to fetch material' + response.statusText);

    return await response.json();
  },
  addMaterial: function (item, queryClient) {
    fetch(`http://localhost:4000/materials/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        // onOpen();
      })
      .catch((error) => {
        // onError();
        console.error('Error:', error);
      });
  }
};
