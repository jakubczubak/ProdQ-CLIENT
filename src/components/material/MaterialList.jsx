/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { TableColumn } from './TableColumn';
import { GlobalFilter } from './GlobalFilter';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from './css/MaterialList.module.css';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/no-data-animation.json';
import { MaterialModal_EDIT } from './MaterialModal_EDIT';
import { useState } from 'react';
import { DeleteModal } from '../common/DeleteModal';
import { materialManager } from './service/materialManager';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';

export const MaterialList = ({ item }) => {
  const [materialListItemID, setMaterialListItemID] = useState(''); // id of the item to remove
  const [materialList, setMaterialList] = useState(item.materialList); // material list
  const [openEditModal, setOpenEditModal] = useState(false); // open the edit modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // open the delete modal
  const [materialListItem, setMaterialListItem] = useState(''); // item to edit
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = React.useMemo(() => materialList, [materialList, item.materialList.length]);

  const handleUpdateTable = (materialList) => {
    setMaterialList(materialList); // update the material list
  };

  const onEdit = (id) => {
    const materialListItem = item.materialList.find((item) => item.id === id); // find the item to edit

    setMaterialListItem(materialListItem); // set the item to edit

    setOpenEditModal(true); // open the modal
  };

  const onDelete = (id) => {
    setMaterialListItemID(id); // set the id of the item to remove
    setOpenDeleteModal(true); // open the modal
  };

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDeleteMaterialListItem = () => {
    const indexToRemove = item.materialList.find((item) => item.id === materialListItemID); // find the index of the item to remove

    item.materialList.splice(indexToRemove, 1); // remove the item

    materialManager.deleteMaterialListItem(item, queryClient, dispatch); // delete the item from the database

    setOpenDeleteModal(false); // close the modal
  };

  const columns = React.useMemo(
    () => TableColumn(item.type, onEdit, onDelete),

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
      <div className={styles.table_container}>
        <table {...getTableProps()} className={styles.table}>
          <thead className={styles.thead}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
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

            {rows.map((row) => {
              prepareRow(row);

              return (
                <tr {...row.getRowProps()}>
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
      />
    </>
  );
};
