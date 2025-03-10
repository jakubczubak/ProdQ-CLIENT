// Importy zewnętrzne
import React from 'react';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// Importy lokalne
import styles from './css/SupplierItem.module.css';
import { DeleteModal } from '../common/DeleteModal';
import { supplierManager } from './service/supplierManager';
import { SupplierItemInfo } from './SupplierItemInfo';

export const SupplierItem = ({ item }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSupplierDelete = () => {
    supplierManager.deleteSupplier(item.id, queryClient, dispatch);

    setOpenDeleteModal(false);
  };

  const handleOpenPage = () => {
    window.open(item.companyWebsite, '_blank');
  };

  const handleSendMessage = () => {
    window.location.href = `mailto:${item.email}`;
  };

  return (
    <>
      <div className={styles.supplierItem_info_container}>
        <div className={styles.action_wrapper}>
          <Tooltip PopperProps={{ disablePortal: true }} title="Edit" placement="top">
            <div className={styles.editIcon}>
              <EditIcon
                fontSize={'5px'}
                onClick={() => {
                  navigate(`/supplier/edit`, { state: { item } });
                }}
              />
            </div>
          </Tooltip>
          <Tooltip PopperProps={{ disablePortal: true }} title="Delete" placement="top">
            <div className={styles.deleteIcon}>
              <DeleteIcon fontSize={'5px'} onClick={() => setOpenDeleteModal(true)} />
            </div>
          </Tooltip>
        </div>
        <SupplierItemInfo
          handleOpenPage={handleOpenPage}
          handleSendMessage={handleSendMessage}
          item={item}
        />
      </div>
      <DeleteModal
        open={openDeleteModal}
        onDelete={handleSupplierDelete}
        name={item.companyName}
        onCancel={() => {
          setOpenDeleteModal(false);
        }}
        text="company"
      />
    </>
  );
};
