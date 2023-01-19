export const materialManager = {
  fetchMaterials: async function () {
    const response = await fetch('http://localhost:4000/materials');
    return await response.json();
  }
};
