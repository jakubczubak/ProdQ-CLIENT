import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ReactToPrint from 'react-to-print';
import { TableColumn } from './TableColumn';
import { GlobalFilter } from './GlobalFilter';
import styles from './css/AccessoriesList.module.css';
import { useState, useRef, useEffect } from 'react';
import { DeleteModal } from '../common/DeleteModal';
import { accessorieItemManager } from './service/AccessorieItemManager';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { showNotification } from '../common/service/showNotification';
import { Table } from './Table';
import { useTable } from 'react-table';
import { useGlobalFilter } from 'react-table';
import { useSortBy } from 'react-table';
import { AccessoriesItemModal } from './AccessoriesItemModal';

export const AccessoriesList = ({ item }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [accessorieList, setAccessorieList] = useState(
    item.accessorieItems.sort((a, b) => {
      if (a.diameter !== b.diameter) {
        return a.diameter - b.diameter; // Najpierw sortowanie po średnicy (diameter)
      }
      return a.length - b.length; // Następnie sortowanie po długości (length)
    })
  );

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [accessorieListItem, setAccessorieListItem] = useState('');
  const componentRef = useRef();

  useEffect(() => {
    setAccessorieList(item.accessorieItems.sort((a, b) => a.name.localeCompare(b.name))); // Uaktualnienie sortowania przy zmianie listy
  }, [item.accessorieItems]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = React.useMemo(() => accessorieList, [accessorieList, item.accessorieItems.length]);

  const handleUpdateTable = (accessorieList) => {
    setAccessorieList(accessorieList);
  };

  const handleToolListShortages = (item) => {
    const accessorieListShortages = item.accessorieItems.filter(
      (item) => item.quantity < item.minQuantity
    );
    setAccessorieList(accessorieListShortages);
  };

  const onEdit = (id) => {
    const accessorieListItem = item.accessorieItems.find((item) => item.id === id);
    setAccessorieListItem(accessorieListItem);
    setOpenEditModal(true);
  };

  const onDelete = (id) => {
    const accessorieListItem = item.accessorieItems.find((item) => item.id === id);
    setAccessorieListItem(accessorieListItem);
    setOpenDeleteModal(true);
  };

  const handleDeleteToolListItem = () => {
    accessorieItemManager.deleteTool(accessorieListItem, queryClient, dispatch);
    setOpenDeleteModal(false);
  };

  const onTakeOne = (id) => {
    const accessorieListItem = item.accessorieItems.find((item) => item.id === id);
    if (accessorieListItem.quantity > 0) {
      accessorieListItem.quantity -= 1;
      accessorieItemManager.updateAccessorieItem(
        accessorieListItem,
        accessorieListItem.name,
        queryClient,
        dispatch
      );
    } else {
      showNotification('No more items in the warehouse', 'error', dispatch);
    }
  };

  const columns = React.useMemo(
    () => TableColumn(onDelete, onTakeOne),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessorieList, item.accessorieItems.length]
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
      <div className={styles.icon_container}>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className={styles.icon_pack}>
          <Tooltip title="Accessorie shortages filter">
            <IconButton onClick={() => handleToolListShortages(item)}>
              <FilterAltOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear filter">
            <IconButton
              onClick={() =>
                setAccessorieList(item.accessorieItems.sort((a, b) => a.name.localeCompare(b.name)))
              }>
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
      </div>
      <div className={styles.table_container} ref={componentRef}>
        <div className={styles.print_header}>{item.name}:</div>
        <Table
          columns={columns}
          getTableBodyProps={getTableBodyProps}
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          prepareRow={prepareRow}
          rows={rows}
          onEdit={onEdit}
        />
      </div>
      {openEditModal && (
        <AccessoriesItemModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          item={item}
          accessorieItem={accessorieListItem}
          onUpdateTable={handleUpdateTable}
        />
      )}
      <DeleteModal
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={handleDeleteToolListItem}
        name={accessorieListItem.name}
        text="accessorie"
      />
    </>
  );
};
