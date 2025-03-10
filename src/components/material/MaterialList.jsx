/* eslint-disable react/jsx-key */
import React, { useEffect, useState, useRef } from 'react';
import { Tooltip, IconButton } from '@mui/material';
import ReactToPrint from 'react-to-print';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { useSelector } from 'react-redux';
import styles from './css/MaterialList.module.css';
import { TableColumn } from './TableColumn';
import { GlobalFilter } from './GlobalFilter';
import { MaterialModal_EDIT } from './MaterialModal_EDIT';
import { DeleteModal } from '../common/DeleteModal';
import { materialManager } from './service/materialManager';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { cartManager } from '../cart/service/cartManager';
import { showNotification } from '../common/service/showNotification';
import { InfoModal } from '../common/InfoModal';
import { PriceChart } from '../common/PriceChart';
import { sortMaterialListByMaterialGroupType } from '../common/service/sortMaterialListByMaterialGroupType';
import { Table } from './Table';
import { useNavigate } from 'react-router-dom';

export const MaterialList = ({ item }) => {
  const isSelectMode = useSelector((state) => state.mode);
  const [materialListItemID, setMaterialListItemID] = useState('');
  const [materialListItemPriceHistory, setMaterialListItemPriceHistory] = useState([]);
  const [materialList, setMaterialList] = useState(
    sortMaterialListByMaterialGroupType(item.materials, item.type)
  );
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [materialListItem, setMaterialListItem] = useState('');
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openPirceChartModal, setOpenPriceChartModal] = useState(false);
  const componentRef = useRef();
  const queryClient = useQueryClient();
  const projectID = useSelector((state) => state.projectId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setMaterialList(sortMaterialListByMaterialGroupType(item.materials, item.type));
  }, [item.materials, item.type]);

  const data = React.useMemo(() => materialList, [materialList]);

  const handleUpdateTable = (materialList) => {
    setMaterialList(materialList);
  };

  const handleMaterialListShortages = (item) => {
    const materialListShortages = item.materials.filter((item) => item.quantity < item.minQuantity);
    setMaterialList(materialListShortages);
  };

  const handleGenerateShortagesList = () => {
    const materialListShortages = item.materials.filter((item) => item.quantity < item.minQuantity);
    if (materialListShortages.length > 0) {
      cartManager.addItemList(materialListShortages, item.id, dispatch);
      setOpenInfoModal(false);
      showNotification('Added material shortages to box', 'info', dispatch);
    } else {
      showNotification('No material shortages found', 'info', dispatch);
    }
  };

  const onEdit = (id) => {
    const materialListItem = item.materials.find((item) => item.id === id);
    setMaterialListItem(materialListItem);
    setOpenEditModal(true);
  };

  const onDelete = (id) => {
    setMaterialListItemID(id);
    setMaterialListItem(item.materials.find((item) => item.id === id));
    setOpenDeleteModal(true);
  };

  const openChart = (id) => {
    const materialListItem = item.materials.find((item) => item.id === id);
    setMaterialListItemPriceHistory(materialListItem.materialPriceHistoryList);
    setOpenPriceChartModal(true);
  };

  const onAddToBox = (id) => {
    const materialListItem = item.materials.find((item) => item.id === id);
    const parentID = item.id;
    cartManager.addItem(materialListItem, parentID, dispatch);
    showNotification(`Added ${materialListItem.name} to box`, 'success', dispatch);
  };

  const handleDeleteMaterialListItem = () => {
    const indexToRemove = item.materials.find((item) => item.id === materialListItemID);
    item.materials.splice(indexToRemove, 1);
    materialManager.deleteMaterial(materialListItemID, queryClient, dispatch);
    setOpenDeleteModal(false);
  };

  const onTakeOne = (id) => {
    const materialListItem = item.materials.find((item) => item.id === id);
    if (materialListItem.quantity > 0) {
      materialListItem.quantity -= 1;
      materialManager.updateMaterial(materialListItem, queryClient, dispatch);
    }
  };

  const columns = React.useMemo(
    () =>
      TableColumn(
        item.type,
        onDelete,
        openChart,
        onAddToBox,
        onTakeOne,
        isSelectMode,
        projectID,
        navigate,
        dispatch
      ),
    [materialList, item.materials.length]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      globalFilter: (rows, columnIds, filterValue) => {
        if (filterValue?.closestData) {
          // Jeśli mamy wynik z wyszukiwania wymiarów
          return rows.filter((row) =>
            filterValue.closestData.some((item) => item.id === row.original.id)
          );
        }
        // Standardowe filtrowanie tekstowe
        return rows.filter((row) =>
          columnIds.some((columnId) =>
            String(row.values[columnId]).toLowerCase().includes(String(filterValue).toLowerCase())
          )
        );
      }
    },
    useGlobalFilter,
    useSortBy
  );
  const { globalFilter } = state;

  return (
    <>
      <div className={styles.icon_container}>
        <GlobalFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
          data={data}
          type={item.type}
        />
        {!isSelectMode && (
          <div className={styles.icon_pack}>
            <Tooltip PopperProps={{ disablePortal: true }} title="Generate material shortages list">
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
            <Tooltip PopperProps={{ disablePortal: true }} title="Material shortages filter">
              <IconButton onClick={() => handleMaterialListShortages(item)}>
                <FilterAltOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip PopperProps={{ disablePortal: true }} title="Clear filter">
              <IconButton onClick={() => setMaterialList(item.materials)}>
                <ClearAllOutlinedIcon />
              </IconButton>
            </Tooltip>
            <ReactToPrint
              documentTitle={item.name}
              trigger={() => (
                <Tooltip PopperProps={{ disablePortal: true }} title="Print table">
                  <IconButton>
                    <PictureAsPdfOutlinedIcon />
                  </IconButton>
                </Tooltip>
              )}
              content={() => componentRef.current}
            />
          </div>
        )}
      </div>
      <div className={styles.table_container} ref={componentRef}>
        <div className={styles.print_header}>{item.name}:</div>
        <Table
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          columns={columns}
          prepareRow={prepareRow}
          onEdit={onEdit}
        />
      </div>
      {openEditModal && (
        <MaterialModal_EDIT
          item={item}
          materialListItem={materialListItem}
          onClose={() => setOpenEditModal(false)}
          updateTable={handleUpdateTable}
        />
      )}
      <DeleteModal
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={handleDeleteMaterialListItem}
        name={materialListItem.name}
        text={'material list item'}
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
      <PriceChart
        open={openPirceChartModal}
        onCancel={() => setOpenPriceChartModal(false)}
        data={materialListItemPriceHistory}
      />
    </>
  );
};
