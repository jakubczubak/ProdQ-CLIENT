// Importy zewnętrzne:
import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Tooltip, IconButton } from '@mui/material';
// Importy lokalne:
import styles from './css/TableColumn.module.css';

export const TableColumn = (projectList, setOpenDeleteModal, setSelectedItem, handleEditItem) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'NAME',
        accessor: 'name' // accessor is the "key" in the data
      },

      {
        Header: 'CREATED ON',
        accessor: 'createdOn'
      },
      {
        Header: 'UPDATED ON',
        accessor: 'updatedOn'
      },
      {
        Header: 'STATUS',
        accessor: 'status',
        Cell: ({ row }) => {
          if (row.original.status === 'pending') {
            return (
              <Tooltip PopperProps={{ disablePortal: true }} title="Order status">
                <div className={styles.pending}>{row.original.status}</div>
              </Tooltip>
            );
          } else if (row.original.status === 'done') {
            return (
              <Tooltip PopperProps={{ disablePortal: true }} title="Order status">
                <div className={styles.finished}>{row.original.status}</div>
              </Tooltip>
            );
          }
        }
      },
      {
        Header: 'ACTIONS',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div className={styles.actions}>
            <Tooltip PopperProps={{ disablePortal: true }} title="Edit project">
              <IconButton
                onClick={() => {
                  handleEditItem(projectList.find((x) => x.id === cell.value));
                }}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip PopperProps={{ disablePortal: true }} title="Delete project">
              <IconButton
                onClick={() => {
                  setSelectedItem(projectList.find((x) => x.id === cell.value));
                  setOpenDeleteModal(true);
                }}>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectList, projectList.length]
  );
  return columns;
};
