import { setOpen, setMsg, setSeverity } from '../../../redux/actions/Action';

export const materialManager = {
  getMaterialGroups: async function () {
    const response = await fetch('http://localhost:4000/materials');

    if (!response.ok) throw new Error('Failed to fetch materials' + response.statusText);

    return await response.json();
  },
  createMaterialGroup: function (data, queryClient, dispatch) {
    fetch('http://localhost:4000/materials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        dispatch(setMsg('Material group added.'));
        dispatch(setSeverity('success'));
        dispatch(setOpen());
      })
      .catch((error) => {
        dispatch(setMsg('Error adding material group! Please try again.'));
        dispatch(setSeverity('error'));
        dispatch(setOpen());
        console.error('Error:', error);
      });
  },
  updateMaterialGroup: function (data, queryClient, dispatch) {
    fetch(`http://localhost:4000/materials/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        dispatch(setMsg('Material group updated.'));
        dispatch(setSeverity('success'));
        dispatch(setOpen());
      })
      .catch((error) => {
        dispatch(setMsg('Error updating material group! Please try again.'));
        dispatch(setSeverity('error'));
        dispatch(setOpen());
        console.error('Error:', error);
      });
  },
  deleteMaterialGroup: function (id, queryClient, dispatch) {
    fetch(`http://localhost:4000/materials/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        queryClient.invalidateQueries();
        dispatch(setMsg('Material group deleted.'));
        dispatch(setSeverity('info'));
        dispatch(setOpen());
      })
      .catch((error) => {
        dispatch(setMsg('Error material group deleted. Please try again.'));
        dispatch(setSeverity('error'));
        dispatch(setOpen());
        console.error('Error:', error);
      });
  },
  getMaterialGroupByID: async function (id) {
    const response = await fetch(`http://localhost:4000/materials/${id}`);

    if (!response.ok) throw new Error('Failed to fetch material' + response.statusText);

    return await response.json();
  },
  createMaterial: function (item, queryClient, dispatch) {
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
        dispatch(setMsg('Material added.'));
        dispatch(setSeverity('success'));
        dispatch(setOpen());
      })
      .catch((error) => {
        dispatch(setMsg('Error adding material! Please try again.'));
        dispatch(setSeverity('error'));
        dispatch(setOpen());
        console.error('Error:', error);
      });
  },

  deleteMaterial: function (item, queryClient, dispatch) {
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
        dispatch(setMsg('Material item deleted.'));
        dispatch(setSeverity('info'));
        dispatch(setOpen());
      })
      .catch((error) => {
        dispatch(setMsg('Error deleting material! Please try again.'));
        dispatch(setSeverity('error'));
        dispatch(setOpen());
        console.error('Error:', error);
      });
  }
};
