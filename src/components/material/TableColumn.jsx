//Importy zewnętrzne
import { IconButton, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
//Importy lokalne
import styles from './css/TableColumn.module.css';

export const TableColumn = (type, onEdit, onDelete, openChart, onAddToBox) => {
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
          if (row.original.quantity < row.original.minQuantity)
            return (
              <div className={styles.error}>
                {row.original.quantity}
                <Tooltip title="Quantity is less than min. quantity" arrow>
                  <ReportGmailerrorredIcon />
                </Tooltip>
                {row.original.quantityInTransit > 0 ? (
                  <Tooltip title={'Ordered: ' + row.original.quantityInTransit + 'x'} arrow>
                    <LocalShippingOutlinedIcon color="success" />
                  </Tooltip>
                ) : (
                  ''
                )}
              </div>
            );
          else
            return (
              <div className={styles.quantity}>
                {row.original.quantity}
                {row.original.quantityInTransit > 0 ? (
                  <Tooltip title={'Ordered: ' + row.original.quantityInTransit + 'x'} arrow>
                    <LocalShippingOutlinedIcon color="success" />
                  </Tooltip>
                ) : (
                  ''
                )}
              </div>
            );
        }
      },

      {
        Header: 'Min. QUANTITY',
        accessor: 'minQuantity'
      },

      {
        Header: 'INVENTORY DATE',
        accessor: 'updatedOn'
      },

      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div className={styles.action_btn_wrapper}>
            <Tooltip title="Add material to box">
              <IconButton onClick={() => onAddToBox(cell.value)}>
                <AddBoxOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Price change chart">
              <IconButton onClick={() => openChart(cell.value)}>
                <TimelineIcon />
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
  } else if (type == 'Tube') {
    return [
      {
        Header: 'DIAMETER (mm)',
        accessor: 'diameter' // accessor is the "key" in the data
      },

      {
        Header: 'THICKNESS (mm)',
        accessor: 'thickness' // accessor is the "key" in the data
      },

      {
        Header: 'LENGTH (mm)',
        accessor: 'length'
      },

      {
        Header: 'QUANTITY',
        accessor: 'quantity',

        Cell: ({ row }) => {
          if (row.original.quantity < row.original.minQuantity)
            return (
              <div className={styles.error}>
                {row.original.quantity}
                <Tooltip title="Quantity is less than min. quantity" arrow>
                  <ReportGmailerrorredIcon />
                </Tooltip>
                {row.original.quantityInTransit > 0 ? (
                  <Tooltip title={'Ordered: ' + row.original.quantityInTransit + 'm'} arrow>
                    <LocalShippingOutlinedIcon color="success" />
                  </Tooltip>
                ) : (
                  ''
                )}
              </div>
            );
          else
            return (
              <div className={styles.quantity}>
                {row.original.quantity}
                {row.original.quantityInTransit > 0 ? (
                  <Tooltip title={'Ordered: ' + row.original.quantityInTransit + 'm'} arrow>
                    <LocalShippingOutlinedIcon color="success" />
                  </Tooltip>
                ) : (
                  ''
                )}
              </div>
            );
        }
      },

      {
        Header: 'Min. QUANTITY',
        accessor: 'minQuantity'
      },

      {
        Header: 'INVENTORY DATE',
        accessor: 'updatedOn'
      },

      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div className={styles.action_btn_wrapper}>
            <Tooltip title="Add material to box">
              <IconButton onClick={() => onAddToBox(cell.value)}>
                <AddBoxOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Price change chart">
              <IconButton onClick={() => openChart(cell.value)}>
                <TimelineIcon />
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
          if (row.original.quantity < row.original.minQuantity)
            return (
              <div className={styles.error}>
                {row.original.quantity}
                <Tooltip title="Quantity is less than min. quantity" arrow>
                  <ReportGmailerrorredIcon />
                </Tooltip>
                {row.original.quantityInTransit > 0 ? (
                  <Tooltip title={'Ordered: ' + row.original.quantityInTransit + 'm'} arrow>
                    <LocalShippingOutlinedIcon color="success" />
                  </Tooltip>
                ) : (
                  ''
                )}
              </div>
            );
          else
            return (
              <div className={styles.quantity}>
                {row.original.quantity}
                {row.original.quantityInTransit > 0 ? (
                  <Tooltip title={'Ordered: ' + row.original.quantityInTransit + 'm'} arrow>
                    <LocalShippingOutlinedIcon color="success" />
                  </Tooltip>
                ) : (
                  ''
                )}
              </div>
            );
        }
      },

      {
        Header: 'Min. QUANTITY',
        accessor: 'minQuantity'
      },

      {
        Header: 'INVENTORY DATE',
        accessor: 'updatedOn'
      },

      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div className={styles.action_btn_wrapper}>
            <Tooltip title="Add material to box">
              <IconButton onClick={() => onAddToBox(cell.value)}>
                <AddBoxOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Price change chart">
              <IconButton onClick={() => openChart(cell.value)}>
                <TimelineIcon />
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
  }
};
