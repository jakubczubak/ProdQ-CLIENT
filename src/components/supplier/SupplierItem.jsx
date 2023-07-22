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
import { Button } from '@mui/material';

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
        </div>

        <div className={styles.supplierItem_info}>
          <div className={styles.supplierItem_info_logo}>
            <img src={item.companyLogo ? item.companyLogo : noImage} alt="" />
          </div>
          <p className={styles.supplierItem_info_name}>{item.name + ' ' + item.surname}</p>
          <p className={styles.supplierItem_info_company_name}>{item.companyName}</p>
          <div className={styles.btn_wrapper}>
            <Button variant="contained" onClick={handleOpenPage}>
              View page
            </Button>
            <Button variant="outlined" onClick={handleSendMessage}>
              Send message
            </Button>
          </div>
          <div className={styles.tagList_wrapper}>
            <div className={styles.tagList_header}>
              <p>TAGS</p>
            </div>
            <div className={styles.tagList}>
              {item.tagList.map((tag, index) => (
                <p key={index} className={styles.tag_item}>
                  {tag}
                </p>
              ))}
            </div>
          </div>
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
