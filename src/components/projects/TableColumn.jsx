// Importy zewnętrzne:
import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';
import { Tooltip, IconButton } from '@mui/material';
// Importy lokalne:
import styles from './css/TableColumn.module.css';

export const TableColumn = (projectList, setOpenDeleteModal, setSelectedItem) => {
  const navigate = useNavigate();
  const columns = React.useMemo(
    () => [
      {
        Header: 'NAME',
        accessor: 'name' // accessor is the "key" in the data
      },

      {
        Header: 'DATE',
        accessor: 'date'
      },
      {
        Header: 'STATUS',
        accessor: 'status',
        Cell: ({ row }) => {
          if (row.original.status === 'pending') {
            return (
              <Tooltip title="Order status">
                <div className={styles.pending}>{row.original.status}</div>
              </Tooltip>
            );
          } else if (row.original.status === 'finished') {
            return (
              <Tooltip title="Order status">
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
          <div>
            <Tooltip title="Edit project">
              <IconButton
                onClick={() => {
                  const item = projectList.find((x) => x.id === cell.value);
                  navigate('/project/edit', { state: item });
                }}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete project">
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
