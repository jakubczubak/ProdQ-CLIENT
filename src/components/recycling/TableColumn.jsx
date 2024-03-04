// Importy zewnętrzne
import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

// Importy lokalne
import styles from './css/WTCList.module.css';

export const TableColumn = (item, navigate, setSelectedRecycleItem, setOpenDeleteModal) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'DATE',
        accessor: 'date' // accessor is the "key" in the data
      },
      {
        Header: 'TYPE',
        accessor: 'wasteType' // accessor is the "key" in the data
      },
      {
        Header: 'VALUE',
        accessor: 'totalPrice',
        Cell: ({ row }) => {
          if (row.original.totalPrice < 0)
            return (
              <Tooltip title="Disposal fee">
                <div className={styles.error}>{row.original.totalPrice} PLN </div>
              </Tooltip>
            );
          else return <div className={styles.success}>{row.original.totalPrice} PLN</div>;
        }
      },
      {
        Header: 'COMPANY',
        accessor: 'company'
      },
      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  const selectedRecycleItem = item.find((x) => x.id === cell.value);
                  navigate('/recycling/wtc/', { state: selectedRecycleItem });
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  setSelectedRecycleItem(item.find((x) => x.id === cell.value));
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
    [item, item.length]
  );
  return columns;
};
