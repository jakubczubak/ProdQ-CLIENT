//Importy zewnętrzne
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const TableColumn = (
  items,
  setSelectedRecycleItem,
  setIsOpenMaterialTypeModal,
  setOpenDeleteModal
) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'MATERIAL TYPE',

        accessor: 'name' // accessor is the "key" in the data
      },
      {
        Header: 'DENSITY (g/cm3)',

        accessor: 'density' // accessor is the "key" in the data
      },
      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  const selectedRecycleItem = items.find((x) => x.id === cell.value);
                  setSelectedRecycleItem(selectedRecycleItem);
                  setIsOpenMaterialTypeModal(true);
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  const selectedRecycleItem = items.find((x) => x.id === cell.value);
                  setSelectedRecycleItem(selectedRecycleItem);
                  setOpenDeleteModal(true);
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, items.length]
  );
  return columns;
};
