export const orderManager = {
  getOrderList: async function () {
    const response = await fetch('http://localhost:4000/orders');

    if (!response.ok) throw new Error('Failed to fetch orders' + response.statusText);

    return await response.json();
  }
};
