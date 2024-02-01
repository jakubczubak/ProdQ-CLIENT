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
import ReactToPrint from 'react-to-print';
import { cartManager } from '../cart/service/cartManager';
import { showNotification } from '../common/service/showNotification';
import { InfoModal } from '../common/InfoModal';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

export const ToolList = ({ item }) => {
  const [toolListItemID, setToolListItemID] = useState(''); // id of the item to remove
  const [toolList, setToolList] = useState(item.tools.sort((a, b) => a.dc - b.dc)); // sort the tool list by dc
  const [openEditModal, setOpenEditModal] = useState(false); // open the edit modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // open the delete modal
  const [toolListItem, setToolListItem] = useState(''); // item to edit
  const componentRef = useRef();
  const [openInfoModal, setOpenInfoModal] = useState(false); // open the info modal

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setToolList(item.tools); // update the tool list when the quantity changes
  }, [item.tools]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = React.useMemo(() => toolList, [toolList, item.tools.length]);

  const handleUpdateTable = (toolList) => {
    setToolList(toolList); // update the tool list
  };

  const handleToolListShortages = (item) => {
    const toolListShortages = item.tools.filter((item) => item.quantity < item.minQuantity); // filter the tool list shortages
    setToolList(toolListShortages); // update the tool list
    setOpenInfoModal(false); // close the modal
  };

  const handleGenerateShortagesList = () => {
    const toolListShortages = item.tools.filter((item) => item.quantity < item.minQuantity); // filter the tool list shortages

    if (toolListShortages.length > 0) {
      cartManager.addItemList(toolListShortages, item.id, dispatch); // add the shortages to the cart

      setOpenInfoModal(false); // close the modal

      showNotification('Added tool shortages to box', 'info', dispatch);
    } else {
      showNotification('No tool shortages found', 'info', dispatch);
    }

    setOpenInfoModal(false); // close the modal
  };

  const onEdit = (id) => {
    const toolListItem = item.tools.find((item) => item.id === id); // find the item to edit

    setToolListItem(toolListItem); // set the item to edit

    setOpenEditModal(true); // open the modal
  };

  const onDelete = (id) => {
    const toolListItem = item.tools.find((item) => item.id === id); // find the item to delete

    setToolListItem(toolListItem); // set the item to delete
    setToolListItemID(id); // set the id of the item to remove
    setOpenDeleteModal(true); // open the modal
  };

  const onAddToBox = (id) => {
    const toolListItem = item.tools.find((item) => item.id === id); // find the item

    cartManager.addItem(toolListItem, item.id, dispatch);

    showNotification(`Added ${toolListItem.name} to box`, 'success', dispatch);
  };

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDeleteToolListItem = () => {
    const indexToRemove = item.tools.find((item) => item.id === toolListItemID); // find the index of the item to remove

    item.tools.splice(indexToRemove, 1); // remove the item

    toolManager.deleteTool(item, queryClient, dispatch); // delete the item from the database
    setOpenDeleteModal(false); // close the modal
  };

  const columns = React.useMemo(
    () => TableColumn(onEdit, onDelete, onAddToBox),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toolList, item.tools.length]
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
        <Tooltip title="Generate tool shortages list">
          <IconButton
            onClick={() => {
              if (cartManager.getItems().length > 0) {
                setOpenInfoModal(true);
              } else {
                handleGenerateShortagesList();
              }
            }}>
            <BoltOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Tool shortages filter">
          <IconButton onClick={() => handleToolListShortages(item)}>
            <FilterAltOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clear filter">
          <IconButton onClick={() => setToolList(item.tools)}>
            <ClearAllOutlinedIcon />
          </IconButton>
        </Tooltip>

        <ReactToPrint
          documentTitle={item.name}
          trigger={() => (
            <Tooltip title="Print table">
              <IconButton>
                <PictureAsPdfOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
          content={() => componentRef.current}
        />
      </div>

      <div className={styles.table_container} ref={componentRef}>
        <div className={styles.print_header}>{item.name}:</div>
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
