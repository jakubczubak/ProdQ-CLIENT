/* eslint-disable react/jsx-key */
// Zewnętrzne importy
import React, { useEffect, useState, useRef } from 'react';
import { Tooltip, IconButton } from '@mui/material';
import ReactToPrint from 'react-to-print';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';

// Lokalne importy
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

export const MaterialList = ({ item }) => {
  const [materialListItemID, setMaterialListItemID] = useState(''); // id of the item to remove
  const [materialListItemPriceHistory, setMaterialListItemPriceHistory] = useState([]);
  const [materialList, setMaterialList] = useState(
    sortMaterialListByMaterialGroupType(item.materials, item.type)
  ); // material list
  const [openEditModal, setOpenEditModal] = useState(false); // open the edit modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // open the delete modal
  const [materialListItem, setMaterialListItem] = useState(''); // item to edit
  const [openInfoModal, setOpenInfoModal] = useState(false); // open the info modal
  const [openPirceChartModal, setOpenPriceChartModal] = useState(false); // open the price chart modal
  const componentRef = useRef();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    setMaterialList(item.materials); // update the material list when the quantity changes
  }, [item.materials]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const data = React.useMemo(() => materialList, [materialList]);

  const handleUpdateTable = (materialList) => {
    setMaterialList(materialList); // update the material list
  };

  const handleMaterialListShortages = (item) => {
    const materialListShortages = item.materials.filter((item) => item.quantity < item.minQuantity); // filter the material list shortages
    setMaterialList(materialListShortages); // update the material list
  };

  const handleGenerateShortagesList = () => {
    const materialListShortages = item.materials.filter((item) => item.quantity < item.minQuantity); // filter the material list shortages
    if (materialListShortages.length > 0) {
      cartManager.addItemList(materialListShortages, item.id, dispatch); // add the shortages to the cart
      setOpenInfoModal(false); // close the modal
      showNotification('Added material shortages to box', 'info', dispatch);
    } else {
      showNotification('No material shortages found', 'info', dispatch);
    }
  };

  const onEdit = (id) => {
    const materialListItem = item.materials.find((item) => item.id === id); // find the item to edit
    setMaterialListItem(materialListItem); // set the item to edit
    setOpenEditModal(true); // open the modal
  };

  const onDelete = (id) => {
    setMaterialListItemID(id); // set the id of the item to remove
    setMaterialListItem(item.materials.find((item) => item.id === id)); // set the item to remove
    setOpenDeleteModal(true); // open the modal
  };

  const openChart = (id) => {
    const materialListItem = item.materials.find((item) => item.id === id); // find the item to edit
    setMaterialListItemPriceHistory(materialListItem.materialPriceHistoryList);
    setOpenPriceChartModal(true);
  };

  const onAddToBox = (id) => {
    const materialListItem = item.materials.find((item) => item.id === id); // find the item
    const parentID = item.id;
    cartManager.addItem(materialListItem, parentID, dispatch);
    showNotification(`Added ${materialListItem.name}  to box`, 'success', dispatch);
  };

  const handleDeleteMaterialListItem = () => {
    const indexToRemove = item.materials.find((item) => item.id === materialListItemID); // find the index of the item to remove
    item.materials.splice(indexToRemove, 1); // remove the item
    materialManager.deleteMaterial(materialListItemID, queryClient, dispatch); // delete the item from the database
    setOpenDeleteModal(false); // close the modal
  };

  const columns = React.useMemo(
    () => TableColumn(item.type, onDelete, openChart, onAddToBox),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);
  const { globalFilter } = state;

  return (
    <>
      <div className={styles.icon_container}>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className={styles.icon_pack}>
          <Tooltip title="Generate material shortages list">
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
          <Tooltip title="Material shortages filter">
            <IconButton onClick={() => handleMaterialListShortages(item)}>
              <FilterAltOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear filter">
            <IconButton onClick={() => setMaterialList(item.materials)}>
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
