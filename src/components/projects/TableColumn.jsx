// Importy zewnętrzne:
import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
// Importy lokalne:
import styles from './css/TableColumn.module.css';

export const TableColumn = (projectList, setOpenDeleteModal, setSelectedItem, handleEditItem) => {
  const navigate = useNavigate();
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
            <Tooltip title="Show details">
              <IconButton
                onClick={() => {
                  navigate(`/projects/${cell.value}`);
                }}
              >
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit project">
              <IconButton
                onClick={() => {
                  handleEditItem(projectList.find((x) => x.id === cell.value));
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete project">
              <IconButton
                onClick={() => {
                  setSelectedItem(projectList.find((x) => x.id === cell.value));
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
    [projectList, projectList.length]
  );
  return columns;
};
