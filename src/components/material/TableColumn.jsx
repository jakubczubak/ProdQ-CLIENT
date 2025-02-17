//Importy zewnętrzne
import { Button, IconButton, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
//Importy lokalne
import styles from './css/TableColumn.module.css';
import { setMaterial } from '../../redux/actions/Action';
import InfoIcon from '@mui/icons-material/Info';

export const TableColumn = (
  type,
  onDelete,
  openChart,
  onAddToBox,
  onTakeOne,
  isSelectMode,
  projectID,
  navigate,
  dispatch
) => {
  if (type == 'Plate') {
    return [
      {
        Header: 'THICKNESS',
        accessor: 'z', // accessor is the "key" in the data
        Cell: ({ row }) => {
          const thickness = row.original.z.toFixed(2); // Zaokrąglanie do 2 miejsc
          if (row.original.additionalInfo) {
            return (
              <div className={styles.info}>
                {thickness}
                <Tooltip title="Check additional info" arrow>
                  <InfoIcon color="info" />
                </Tooltip>
              </div>
            );
          } else {
            return <div className={styles.info}>{thickness}</div>;
          }
        }
      },

      {
        Header: 'WIDTH',
        accessor: 'x', // accessor is the "key" in the data
        Cell: ({ row }) => {
          const width = row.original.x.toFixed(2); // Zaokrąglanie do 2 miejsc
          return <div>{width}</div>;
        }
      },

      {
        Header: 'HEIGHT',
        accessor: 'y', // accessor is the "key" in the data
        Cell: ({ row }) => {
          const height = row.original.y.toFixed(2); // Zaokrąglanie do 2 miejsc
          return <div>{height}</div>;
        }
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
        Cell: ({ cell, row }) => (
          <div className={styles.action_btn_wrapper}>
            {isSelectMode ? (
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(setMaterial(row.original));
                  navigate(`/projects/${projectID}`);
                }}
              >
                SELECT
              </Button>
            ) : (
              <>
                <Tooltip title="Take one unit from the warehouse">
                  <IconButton onClick={() => onTakeOne(cell.value)}>
                    <KeyboardDoubleArrowDownOutlinedIcon />
                  </IconButton>
                </Tooltip>
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
                <Tooltip title="Delete">
                  <IconButton onClick={() => onDelete(cell.value)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>
        )
      }
    ];
  } else if (type == 'Tube') {
    return [
      {
        Header: 'DIAMETER (mm)',
        accessor: 'diameter', // accessor is the "key" in the data
        Cell: ({ row }) => {
          const diameter = row.original.diameter.toFixed(2); // Zaokrąglanie do 2 miejsc
          if (row.original.additionalInfo) {
            return (
              <div className={styles.info}>
                ⌀{diameter}
                <Tooltip title="Check additional info" arrow>
                  <InfoIcon color="info" />
                </Tooltip>
              </div>
            );
          } else {
            return <div className={styles.info}>⌀{diameter}</div>;
          }
        }
      },

      {
        Header: 'INTERNAL DIAMETER (mm)',
        accessor: 'internalDiameter', // Virtual accessor for calculation
        Cell: ({ row }) => {
          const { diameter, thickness } = row.original;
          const internalDiameter = diameter - 2 * thickness;
          // Zaokrąglanie i obsługa brakujących danych
          return <div>{internalDiameter > 0 ? `⌀${internalDiameter.toFixed(2)}` : 'N/A'}</div>;
        }
      },

      {
        Header: 'THICKNESS (mm)',
        accessor: 'thickness', // accessor is the "key" in the data
        Cell: ({ row }) => {
          const thickness = row.original.thickness.toFixed(2); // Zaokrąglanie do 2 miejsc
          return <div>{thickness}</div>;
        }
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
        Cell: ({ cell, row }) => (
          <div className={styles.action_btn_wrapper}>
            {isSelectMode ? (
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(setMaterial(row.original));
                  navigate(`/projects/${projectID}`);
                }}
              >
                SELECT
              </Button>
            ) : (
              <>
                <Tooltip title="Take one unit from the warehouse">
                  <IconButton onClick={() => onTakeOne(cell.value)}>
                    <KeyboardDoubleArrowDownOutlinedIcon />
                  </IconButton>
                </Tooltip>
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
                <Tooltip title="Delete">
                  <IconButton onClick={() => onDelete(cell.value)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>
        )
      }
    ];
  } else if (type == 'Rod') {
    return [
      {
        Header: 'DIAMETER (mm)',
        accessor: 'diameter', // accessor is the "key" in the data
        Cell: ({ row }) => {
          const diameter = row.original.diameter.toFixed(2); // Zaokrąglanie do 2 miejsc
          if (row.original.additionalInfo) {
            return (
              <div className={styles.info}>
                ⌀{diameter}
                <Tooltip title="Check additional info" arrow>
                  <InfoIcon color="info" />
                </Tooltip>
              </div>
            );
          } else {
            return <div className={styles.info}>⌀{diameter}</div>;
          }
        }
      },

      {
        Header: 'LENGTH (mm)',
        accessor: 'length', // accessor is the "key" in the data
        Cell: ({ row }) => {
          const length = row.original.length.toFixed(2); // Zaokrąglanie do 2 miejsc
          return <div>{length}</div>;
        }
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
        Cell: ({ cell, row }) => (
          <div className={styles.action_btn_wrapper}>
            {isSelectMode ? (
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(setMaterial(row.original));
                  navigate(`/projects/${projectID}`);
                }}
              >
                SELECT
              </Button>
            ) : (
              <>
                <Tooltip title="Take one unit from the warehouse">
                  <IconButton onClick={() => onTakeOne(cell.value)}>
                    <KeyboardDoubleArrowDownOutlinedIcon />
                  </IconButton>
                </Tooltip>
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
                <Tooltip title="Delete">
                  <IconButton onClick={() => onDelete(cell.value)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>
        )
      }
    ];
  }
};
