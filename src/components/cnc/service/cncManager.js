// import { showNotification } from '../../common/service/showNotification';

export const cncManager = {
  getTask: async function () {
    const response = await fetch('http://localhost:4000/tasks');

    if (!response.ok) throw new Error('Failed to fetch cnc tasks' + response.statusText);

    return await response.json();
  },
  getColumns: async function () {
    const response = await fetch('http://localhost:4000/columns');

    if (!response.ok) throw new Error('Failed to fetch cnc columns' + response.statusText);

    return await response.json();
  },
  getColumnOrder: async function () {
    const response = await fetch('http://localhost:4000/columnOrder');

    if (!response.ok) throw new Error('Failed to fetch cnc column order' + response.statusText);

    return await response.json();
  }
};
