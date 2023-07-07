/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { TableColumn } from './TableColumn';
import { GlobalFilter } from './GlobalFilter';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from './css/ToolList.module.css';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/no-data-animation.json';
import { ToolModal_EDIT } from './ToolModal_EDIT';
import { useState, useRef } from 'react';
import { DeleteModal } from '../common/DeleteModal';
import { toolManager } from './service/toolManager';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { Tooltip, IconButton } from '@mui/material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ClearIcon from '@mui/icons-material/Clear';
import ReactToPrint from 'react-to-print';
import LocalPrintshop from '@mui/icons-material/LocalPrintshop';
import { cartManager } from '../cart/service/cartManager';
import { showNotification } from '../common/service/showNotification';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { InfoModal } from '../common/InfoModal';

export const ToolList = ({ item }) => {
  const [toolListItemID, setToolListItemID] = useState(''); // id of the item to remove
  const [toolList, setToolList] = useState(item.toolList); // material list
  const [openEditModal, setOpenEditModal] = useState(false); // open the edit modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // open the delete modal
  const [toolListItem, setToolListItem] = useState(''); // item to edit
  const componentRef = useRef();
  const [openInfoModal, setOpenInfoModal] = useState(false); // open the info modal

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setToolList(item.toolList); // update the material list when the quantity changes
  }, [item.toolList]);

  const data = React.useMemo(() => toolList, [toolList, item.toolList.length]);

  const handleUpdateTable = (toolList) => {
    setToolList(toolList); // update the material list
  };

  const handleToolListShortages = (item) => {
    const toolListShortages = item.toolList.filter((item) => item.quantity < item.min_quantity); // filter the material list shortages
    setToolList(toolListShortages); // update the material list
    setOpenInfoModal(false); // close the modal
  };

  const handleGenerateShortagesList = () => {
    const toolListShortages = item.toolList.filter((item) => item.quantity < item.min_quantity); // filter the material list shortages

    if (toolListShortages.length > 0) {
      cartManager.addItemList(toolListShortages, dispatch); // add the shortages to the cart

      setOpenInfoModal(false); // close the modal

      showNotification('Added tool shortages to box', 'info', dispatch);
    } else {
      showNotification('No tool shortages found', 'info', dispatch);
    }
  };

  const onEdit = (id) => {
    const toolListItem = item.toolList.find((item) => item.id === id); // find the item to edit

    setToolListItem(toolListItem); // set the item to edit

    setOpenEditModal(true); // open the modal
  };

  const onDelete = (id) => {
    const toolListItem = item.toolList.find((item) => item.id === id); // find the item to delete

    setToolListItem(toolListItem); // set the item to delete
    setToolListItemID(id); // set the id of the item to remove
    setOpenDeleteModal(true); // open the modal
  };

  const onAddToBox = (id) => {
    const toolListItem = item.toolList.find((item) => item.id === id); // find the item

    cartManager.addItem(toolListItem, dispatch);

    showNotification(`Added ${toolListItem.name} to box`, 'success', dispatch);
  };

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDeleteToolListItem = () => {
    const indexToRemove = item.toolList.find((item) => item.id === toolListItemID); // find the index of the item to remove

    item.toolList.splice(indexToRemove, 1); // remove the item

    toolManager.deleteTool(item, queryClient, dispatch); // delete the item from the database

    setOpenDeleteModal(false); // close the modal
  };

  const columns = React.useMemo(
    () => TableColumn(onEdit, onDelete, onAddToBox),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toolList, item.toolList.length]
  );

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow,

    state,

    setGlobalFilter
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <div className={styles.icon_container}>
        <Tooltip title="Generate shortages list">
          <IconButton
            onClick={() => {
              if (cartManager.getItems().length > 0) {
                setOpenInfoModal(true);
              } else {
                handleGenerateShortagesList();
              }
            }}>
            <AutoAwesomeOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Show material shortages">
          <IconButton onClick={() => handleToolListShortages(item)}>
            <ReportGmailerrorredIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Show all materials">
          <IconButton onClick={() => setToolList(item.toolList)}>
            <ClearIcon />
          </IconButton>
        </Tooltip>

        <ReactToPrint
          documentTitle={item.toolGroupName}
          trigger={() => (
            <Tooltip title="Print">
              <IconButton>
                <LocalPrintshop />
              </IconButton>
            </Tooltip>
          )}
          content={() => componentRef.current}
        />
      </div>

      <div className={styles.table_container} ref={componentRef}>
        <div className={styles.print_header}>{item.toolGroupName}:</div>
        <table {...getTableProps()} className={styles.table}>
          <thead className={styles.thead}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th>ID</th>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className={styles.sort}>
                      {column.render('Header')}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDownwardIcon fontSize="inherit" />
                        ) : (
                          <ArrowUpwardIcon fontSize="inherit" />
                        )
                      ) : (
                        ''
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.length === 0 && (
              <tr className={styles.no_data}>
                <td colSpan={columns.length + 1}>
                  <Lottie animationData={animation} loop={true} className={styles.animation} />
                </td>
              </tr>
            )}

            {rows.map((row, index) => {
              prepareRow(row);

              return (
                <tr {...row.getRowProps()}>
                  <td> {index + 1}</td>

                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {openEditModal && (
        <ToolModal_EDIT
          item={item}
          toolListItem={toolListItem}
          onClose={() => setOpenEditModal(false)}
          updateTable={handleUpdateTable}
        />
      )}
      <DeleteModal
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={handleDeleteToolListItem}
        name={toolListItem.name}
        text="tool"
      />
      <InfoModal
        open={openInfoModal}
        onCancel={() => setOpenInfoModal(false)}
        text={
          'You already have items in your box. Do you want to add the shortages to your box?' +
          ' (This will update your current box).'
        }
        onConfirm={() => {
          handleGenerateShortagesList();
        }}
      />
    </>
  );
};
