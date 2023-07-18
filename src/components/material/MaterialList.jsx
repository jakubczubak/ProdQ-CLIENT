/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { TableColumn } from './TableColumn';
import { GlobalFilter } from './GlobalFilter';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from './css/MaterialList.module.css';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/no-data-animation.json';
import { MaterialModal_EDIT } from './MaterialModal_EDIT';
import { useState, useRef } from 'react';
import { DeleteModal } from '../common/DeleteModal';
import { materialManager } from './service/materialManager';
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
import { PriceChart } from '../common/PriceChart';

export const MaterialList = ({ item }) => {
  const [materialListItemID, setMaterialListItemID] = useState(''); // id of the item to remove
  const [materialListItemPriceHistory, setMaterialListItemPriceHistory] = useState([]);
  const [materialList, setMaterialList] = useState(item.materialList); // material list
  const [openEditModal, setOpenEditModal] = useState(false); // open the edit modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // open the delete modal
  const [materialListItem, setMaterialListItem] = useState(''); // item to edit
  const [openInfoModal, setOpenInfoModal] = useState(false); // open the info modal
  const [openPirceChartModal, setOpenPriceChartModal] = useState(false); // open the price chart modal

  const componentRef = useRef();

  useEffect(() => {
    setMaterialList(item.materialList); // update the material list when the quantity changes
  }, [item.materialList]);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const data = React.useMemo(() => materialList, [materialList, item.materialList.length]);

  const handleUpdateTable = (materialList) => {
    setMaterialList(materialList); // update the material list
  };

  const handleMaterialListShortages = (item) => {
    const materialListShortages = item.materialList.filter(
      (item) => item.quantity < item.min_quantity
    ); // filter the material list shortages
    setMaterialList(materialListShortages); // update the material list
  };

  const handleGenerateShortagesList = () => {
    const materialListShortages = item.materialList.filter(
      (item) => item.quantity < item.min_quantity
    ); // filter the material list shortages

    if (materialListShortages.length > 0) {
      cartManager.addItemList(materialListShortages, dispatch); // add the shortages to the cart

      setOpenInfoModal(false); // close the modal
      showNotification('Added material shortages to box', 'info', dispatch);
    } else {
      showNotification('No material shortages found', 'info', dispatch);
    }
  };

  const onEdit = (id) => {
    const materialListItem = item.materialList.find((item) => item.id === id); // find the item to edit

    setMaterialListItem(materialListItem); // set the item to edit

    setOpenEditModal(true); // open the modal
  };

  const onDelete = (id) => {
    setMaterialListItemID(id); // set the id of the item to remove
    setMaterialListItem(item.materialList.find((item) => item.id === id)); // set the item to remove
    setOpenDeleteModal(true); // open the modal
  };

  const openChart = (id) => {

    const materialListItem = item.materialList.find((item) => item.id === id); // find the item to edit


    setMaterialListItemPriceHistory(materialListItem.price_history);
    setOpenPriceChartModal(true);
  };

  const onAddToBox = (id) => {
    const materialListItem = item.materialList.find((item) => item.id === id); // find the item
    cartManager.addItem(materialListItem, dispatch);
    showNotification(`Added ${materialListItem.name}  to box`, 'success', dispatch);
  };

  const handleDeleteMaterialListItem = () => {
    const indexToRemove = item.materialList.find((item) => item.id === materialListItemID); // find the index of the item to remove

    item.materialList.splice(indexToRemove, 1); // remove the item

    materialManager.deleteMaterial(item, queryClient, dispatch); // delete the item from the database

    setOpenDeleteModal(false); // close the modal
  };

  const columns = React.useMemo(
    () => TableColumn(item.type, onEdit, onDelete, openChart, onAddToBox),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [materialList, item.materialList.length]
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
        <Tooltip title="Auto adding material shortages">
          <IconButton onClick={() => handleGenerateShortagesList()}>
            <AutoAwesomeOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Show material shortages">
          <IconButton onClick={() => handleMaterialListShortages(item)}>
            <ReportGmailerrorredIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Show all materials">
          <IconButton onClick={() => setMaterialList(item.materialList)}>
            <ClearIcon />
          </IconButton>
        </Tooltip>

        <ReactToPrint
          documentTitle={item.materialGroupName}
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
        <div className={styles.print_header}>{item.materialGroupName}:</div>
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
