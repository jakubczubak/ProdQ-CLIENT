//Importy zewnętrzne
import React from 'react';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
//Importy lokalne
import styles from './css/ProductionTable.module.css';

export const TableColumn = (
  handleAddToProductionBox,
  setSelectedProductionItem,
  setOpenDeleteModal,
  handleSavePDF,
  items
) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'NAME',
        accessor: 'partName' // accessor is the "key" in the data
      },
      {
        Header: 'CREATED ON',
        accessor: 'createdOn' // accessor is the "key" in the data
      },
      {
        Header: 'UPDATED ON',
        accessor: 'updatedOn' // accessor is the "key" in the data
      },
      {
        Header: 'TYPE OF PROCESSING',
        accessor: 'typeOfProcessing', // accessor is the "key" in the data
        Cell: ({ row }) => {
          if (row.original.typeOfProcessing === 'milling') {
            return <div className={styles.milling}>MILLING</div>;
          } else {
            return <div className={styles.turning}>TURNING</div>;
          }
        }
      },
      {
        Header: 'TYPE',
        accessor: 'partType', // accessor is the "key" in the data
        Cell: ({ row }) => {
          if (row.original.partType === 'plate') {
            return <div className={styles.plate}>PLATE</div>;
          } else if (row.original.partType === 'part') {
            return <div className={styles.part}>PART</div>;
          } else {
            return <div className={styles.modification}>MODIFICATION</div>;
          }
        }
      },
      {
        Header: 'STATUS',
        accessor: 'status', // accessor is the "key" in the data
        Cell: ({ row }) => {
          if (row.original.status === 'inprogress') {
            return <div className={styles.pending}>PENDING</div>;
          } else {
            return <div className={styles.finished}>FINISHED</div>;
          }
        }
      },
      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ row }) => (
          <div className={styles.action_wrapper}>
            {row.original.filePDF && (
              <Tooltip PopperProps={{ disablePortal: true }} title="Save PDF">
                <IconButton
                  onClick={() => {
                    handleSavePDF(row.original);
                  }}>
                  <PictureAsPdfOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip PopperProps={{ disablePortal: true }} title="Delete">
              <IconButton
                onClick={() => {
                  setSelectedProductionItem(row.original);
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
    [items, items.length]
  );
  return columns;
};
