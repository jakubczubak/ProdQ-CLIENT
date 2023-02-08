import { setOpen, setMsg, setSeverity } from '../../../redux/actions/Action';

export const toolManager = {
  getToolGroups: async function () {
    const response = await fetch('http://localhost:4000/tools');

    if (!response.ok) throw new Error('Failed to fetch tools' + response.statusText);

    return await response.json();
  },
  createToolGroup: function (data, queryClient, dispatch) {
    fetch('http://localhost:4000/tools', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        dispatch(setMsg('Tool group added.'));
        dispatch(setSeverity('success'));
        dispatch(setOpen());
      })
      .catch((error) => {
        dispatch(setMsg('Error adding tool group! Please try again.'));
        dispatch(setSeverity('error'));
        dispatch(setOpen());
        console.error('Error:', error);
      });
  },
  deleteToolGroup: function (id, queryClient, dispatch) {
    fetch(`http://localhost:4000/tools/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        dispatch(setMsg('Tool group deleted.'));
        dispatch(setSeverity('info'));
        dispatch(setOpen());
      })
      .catch((error) => {
        dispatch(setMsg('Error tool group deleted. Please try again.'));
        dispatch(setSeverity('error'));
        dispatch(setOpen());
        console.error('Error:', error);
      });
  },
  updateToolGroup: function (data, queryClient, dispatch) {
    fetch(`http://localhost:4000/tools/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        dispatch(setMsg('Tool group updated.'));
        dispatch(setSeverity('success'));
        dispatch(setOpen());
      })
      .catch((error) => {
        dispatch(setMsg('Error updating tool group! Please try again.'));
        dispatch(setSeverity('error'));
        dispatch(setOpen());
        console.error('Error:', error);
      });
  },
  getToolGroupByID: async function (id) {
    const response = await fetch(`http://localhost:4000/tools/${id}`);

    if (!response.ok) throw new Error('Failed to fetch tool group' + response.statusText);

    return await response.json();
  }
};
