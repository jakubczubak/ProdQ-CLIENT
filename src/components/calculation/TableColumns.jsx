// Importy zewnętrzne
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import {
  DeleteOutline as DeleteOutlineIcon,
  EditOutlined as EditOutlinedIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Importy lokalne
import styles from './css/CalculationList.module.css';

export const TableColumns = ({ calculationList, setOpenDeleteModal, setSelectedItem }) => {
  const navigate = useNavigate();

  const columns = React.useMemo(
    () => [
      {
        Header: 'NAME',

        accessor: 'calculationName' // accessor is the "key" in the data
      },

      {
        Header: 'DATE',

        accessor: 'selectedDate'
      },
      {
        Header: 'PRICE',

        accessor: 'cncOrderValuation',
        Cell: ({ row }) => (
          <Tooltip title="Calculation valuation">
            <div className={styles.success}>{row.original.cncOrderValuation} PLN</div>
          </Tooltip>
        )
      },
      {
        Header: 'STATUS',
        accessor: 'status',
        Cell: ({ row }) => {
          if (row.original.status === 'Pending') {
            return (
              <Tooltip title="Calculation status">
                <div className={styles.status_pending}>{row.original.status}</div>
              </Tooltip>
            );
          } else {
            return (
              <Tooltip title="Calculation status">
                <div className={styles.status_finish}>{row.original.status}</div>
              </Tooltip>
            );
          }
        }
      },
      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div>
            <Tooltip title="Edit calculation">
              <IconButton
                onClick={() => {
                  const item = calculationList.find((x) => x.id === cell.value);
                  navigate('/calculation/edit/', { state: item });
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete calculation">
              <IconButton
                onClick={() => {
                  setSelectedItem(calculationList.find((x) => x.id === cell.value));
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
    [calculationList, calculationList.length]
  );
  return columns;
};
