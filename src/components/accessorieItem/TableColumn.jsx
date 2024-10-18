//Importy zewnętrzne
import { IconButton, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
//Importy lokalne
import styles from './css/TableColumn.module.css';
import InfoIcon from '@mui/icons-material/Info';

export const TableColumn = (onDelete, onTakeOne) => {
  return [
    {
      Header: 'ACCESSORIE  NAME',
      accessor: 'name', // accessor is the "key" in the data
      Cell: ({ row }) => {
        if (row.original.additionalInfo)
          return (
            <div className={styles.info}>
              {row.original.name}
              <Tooltip title="Check additional info" arrow>
                <InfoIcon color="info" />
              </Tooltip>
            </div>
          );
        else return <div className={styles.info}>{row.original.name}</div>;
      }
    },
    {
      Header: 'DIAMETER (mm)',
      accessor: 'diameter', // accessor is the "key" in the data
      Cell: ({ row }) => (row.original.diameter > 0 ? `Φ${row.original.diameter}` : 'N/A')
    },

    {
      Header: 'Length (mm)',
      accessor: 'length',
      Cell: ({ row }) => (row.original.length > 0 ? row.original.length : 'N/A')
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
          <Tooltip title="Take one unit from the warehouse">
            <IconButton onClick={() => onTakeOne(cell.value)}>
              <KeyboardDoubleArrowDownOutlinedIcon />
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
