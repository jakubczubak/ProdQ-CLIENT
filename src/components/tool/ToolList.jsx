/* eslint-disable react/jsx-key */
import React from 'react';
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

export const ToolList = ({ item }) => {
  const [toolListItemID, setToolListItemID] = useState(''); // id of the item to remove
  const [toolList, setToolList] = useState(item.toolList); // material list
  const [openEditModal, setOpenEditModal] = useState(false); // open the edit modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // open the delete modal
  const [toolListItem, setToolListItem] = useState(''); // item to edit
  const componentRef = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const data = React.useMemo(() => toolList, [toolList, item.toolList.length]);

  const handleUpdateTable = (toolList) => {
    setToolList(toolList); // update the material list
  };

  const handleToolListShortages = (item) => {
    const toolListShortages = item.toolList.filter((item) => item.quantity < item.min_quantity); // filter the material list shortages
    setToolList(toolListShortages); // update the material list
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

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDeleteToolListItem = () => {
    const indexToRemove = item.toolList.find((item) => item.id === toolListItemID); // find the index of the item to remove

    item.toolList.splice(indexToRemove, 1); // remove the item

    toolManager.deleteTool(item, queryClient, dispatch); // delete the item from the database

    setOpenDeleteModal(false); // close the modal
  };

  const columns = React.useMemo(
    () => TableColumn(onEdit, onDelete),

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
                    <div>
                      {column.render('Header')}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDownwardIcon />
                        ) : (
                          <ArrowUpwardIcon />
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
                <td colSpan={columns.length}>
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
        name={item.toolGroupName + ' ⌀' + toolListItem.dc}
      />
    </>
  );
};
