import { IconButton, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import styles from './css/TableColumn.module.css';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

export const TableColumn = (type, onEdit, onDelete) => {
  if (type == 'Plate') {
    return [
      {
        Header: 'THICKNESS (mm)',

        accessor: 'z' // accessor is the "key" in the data
      },

      {
        Header: 'WIDTH (mm)',

        accessor: 'x'
      },

      {
        Header: 'HEIGHT (mm)',

        accessor: 'y'
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
  } else if (type == 'Tube') {
    return [
      {
        Header: 'DIAMETER (mm)',

        accessor: 'diameter' // accessor is the "key" in the data
      },

      {
        Header: 'THICKNESS (mm)',

        accessor: 'thickeness' // accessor is the "key" in the data
      },

      {
        Header: 'LENGTH (mm)',

        accessor: 'length'
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
          <div>
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
  } else if (type == 'Rod') {
    return [
      {
        Header: 'DIAMETER (mm)',

        accessor: 'diameter' // accessor is the "key" in the data
      },

      {
        Header: 'LENGTH (mm)',

        accessor: 'length'
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
          <div>
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
  }
};
