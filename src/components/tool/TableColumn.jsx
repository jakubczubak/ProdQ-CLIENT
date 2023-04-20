import { IconButton, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import styles from './css/TableColumn.module.css';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

export const TableColumn = (onEdit, onDelete, onAddToBox) => {
  return [
    {
      Header: 'TOOL NAME',

      accessor: 'name' // accessor is the "key" in the data
    },
    {
      Header: 'DIAMETER (mm)',

      accessor: 'dc' // accessor is the "key" in the data
    },

    {
      Header: 'OAL (mm)',

      accessor: 'oal'
    },

    {
      Header: 'CFL (mm)',

      accessor: 'cfl'
    },

    {
      Header: 'QUANTITY',

      accessor: 'quantity',
      Cell: ({ row }) => {
        if (row.original.quantity < row.original.min_quantity)
          return (
            <Tooltip title="Quantity is less than the minimum quantity">
              <div className={styles.error}>
                {row.original.quantity} <ReportGmailerrorredIcon />
              </div>
            </Tooltip>
          );
        else return <div>{row.original.quantity}</div>;
      }
    },

    {
      Header: 'Min. QUANTITY',

      accessor: 'min_quantity'
    },

    {
      Header: 'INVENTORY DATE',

      accessor: 'inventory_date'
    },

    {
      Header: 'ACTION',
      accessor: 'id',
      Cell: ({ cell }) => (
        <div className={styles.action_btn_wrapper}>
          <Tooltip title="Add tool to box">
            <IconButton onClick={() => onAddToBox(cell.value)}>
              <AddBoxOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => onEdit(cell.value)}>
              <EditOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(cell.value)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ];
};
