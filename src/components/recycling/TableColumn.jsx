// Importy zewnętrzne
import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

// Importy lokalne
import styles from './css/WTCList.module.css';

export const TableColumn = (
  item,
  setSelectedRecycleItem,
  setOpenDeleteModal,
  handleSavePDF
) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'COMPANY',
        accessor: 'company'
      },
      {
        Header: 'DATE',
        accessor: 'date' // accessor is the "key" in the data
      },
      {
        Header: 'VALUE',
        accessor: 'totalPrice',
        Cell: ({ row }) => {
          if (row.original.totalPrice < 0)
            return (
              <Tooltip title="Disposal fee">
                <div className={styles.info}>{row.original.totalPrice} PLN </div>
              </Tooltip>
            );
          else return <div className={styles.info}>{row.original.totalPrice} PLN</div>;
        }
      },
      {
        Header: 'TYPE',
        accessor: 'wasteType', // accessor is the "key" in the data
        Cell: ({ row }) => {
          if (row.original.wasteType === 'Recyclable waste') {
            return <div className={styles.recyclable}>Recyclable waste</div>;
          } else {
            return <div className={styles.nonrecyclable}>Non-recyclable waste</div>;
          }
        }
      },
      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell, row }) => (
          <div>
            {row.original.filePDF && (
              <Tooltip title="Save PDF">
                <IconButton
                  onClick={() => {
                    handleSavePDF(row.original);
                  }}>
                  <PictureAsPdfOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  setSelectedRecycleItem(item.find((x) => x.id === cell.value));
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
    [item, item.length]
  );
  return columns;
};
