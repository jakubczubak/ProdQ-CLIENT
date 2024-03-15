//Importy zewnętrzne
import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
//Importy lokalne
import styles from './css/ProductionTable.module.css';

export const TableColumn = (
  handleAddToProductionBox,
  setSelectedProductionItem,
  setOpen,
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
        Header: 'TYPE',
        accessor: 'partType', // accessor is the "key" in the data
        Cell: ({ row }) => {
          if (row.original.partType === 'plate') {
            return (
              <div>
                <Button variant="contained" size="small" color="success" sx={{ width: '120px' }}>
                  PLATE
                </Button>
              </div>
            );
          } else if (row.original.partType === 'part') {
            return (
              <div>
                <Button variant="contained" size="small" color="secondary" sx={{ width: '120px' }}>
                  PART
                </Button>
              </div>
            );
          } else {
            return (
              <div>
                <Button variant="contained" size="small" color="info" sx={{ width: '120px' }}>
                  MODIFICATION
                </Button>
              </div>
            );
          }
        }
      },
      {
        Header: 'STATUS',
        accessor: 'status', // accessor is the "key" in the data
        Cell: ({ row }) => {
          if (row.original.status === 'inprogress') {
            return (
              <div>
                <Button variant="outlined" size="small" color="warning" sx={{ width: '120px' }}>
                  IN PROGRESS
                </Button>
              </div>
            );
          } else {
            return (
              <div>
                <Button variant="outlined" size="small" color="success" sx={{ width: '120px' }}>
                  DONE
                </Button>
              </div>
            );
          }
        }
      },
      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ row }) => (
          <div className={styles.action_wrapper}>
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
            <Tooltip title="Add to production box">
              <IconButton
                onClick={() => {
                  handleAddToProductionBox(row.original);
                }}>
                <AddBoxOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  setSelectedProductionItem(row.original);
                  setOpen(true);
                }}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
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
