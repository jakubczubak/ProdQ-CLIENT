// import { showNotification } from '../../common/service/showNotification';

export const cncManager = {
  getTasks: async function () {
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
  },
  updateTasks: async function (tasks) {
    const response = await fetch('http://localhost:4000/tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tasks)
    });

    if (!response.ok) throw new Error('Failed to update cnc tasks' + response.statusText);

    return await response.json();
  },
  updateColumns: async function (columns) {
    const response = await fetch('http://localhost:4000/columns', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(columns)
    });

    if (!response.ok) throw new Error('Failed to update cnc columns' + response.statusText);

    return await response.json();
  },
  createTask: async function (task) {
    const response = await fetch('http://localhost:4000/tasks/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    if (!response.ok) throw new Error('Failed to create cnc task' + response.statusText);

    return await response.json();
  },
  deleteTask: async function (task) {
    const response = await fetch('http://localhost:4000/tasks/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    if (!response.ok) throw new Error('Failed to delete cnc task' + response.statusText);

    return await response.json();
  },
  updateTask: async function (task) {
    const response = await fetch('http://localhost:4000/tasks/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    if (!response.ok) throw new Error('Failed to update cnc task' + response.statusText);

    return await response.json();
  }
};
