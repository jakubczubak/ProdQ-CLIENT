import React from 'react';
import styles from './css/SupplierItem.module.css';
import noImage from '../../assets/no-image.png';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import { DeleteModal } from '../common/DeleteModal';
import { useState } from 'react';
import { supplierManager } from './service/supplierManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const SupplierItem = ({ item }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSupplierDelete = () => {
    supplierManager.deleteSupplier(item.id, queryClient, dispatch);

    setOpenDeleteModal(false);
  };

  return (
    <>
      <div className={styles.supplierItem_info_container}>
        <Tooltip title="Edit" placement="top">
          <div className={styles.editIcon}>
            <EditIcon
              fontSize={'5px'}
              onClick={() => {
                navigate(`/supplier/edit`, { state: { item } });
              }}
            />
          </div>
        </Tooltip>
        <Tooltip title="Delete" placement="top">
          <div className={styles.deleteIcon}>
            <DeleteIcon fontSize={'5px'} onClick={() => setOpenDeleteModal(true)} />
          </div>
        </Tooltip>
        <div className={styles.supplierItem_info}>
          <div className={styles.supplierItem_info_logo}>
            <img src={item.companyLogo ? item.companyLogo : noImage} alt="" />
          </div>
          <p className={styles.supplierItem_info_name}>{item.name + ' ' + item.surname}</p>
          <p className={styles.supplierItem_info_company_name}>{item.companyName}</p>
          <a className={styles.supplierItem_info_email} href={`mailto:${item.email}`}>
            {item.email}
          </a>
          <p className={styles.supplierItem_info_phone}>{item.phoneNumber}</p>
          <p className={styles.supplierFrom_info_address}>{item.companyAddress}</p>
          <button
            className={styles.supplierItem_info_button}
            onClick={() => {
              if (item.companyWebsite) {
                window.open(item.companyWebsite, '_blank');
              }
            }}>
            View Company Page
          </button>
        </div>
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
