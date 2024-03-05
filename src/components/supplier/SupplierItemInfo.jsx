// Importy zewnętrzne
import React from 'react';
import { Button } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';

// Importy lokalne
import styles from './css/SupplierItem.module.css';
import noImage from '../../assets/no-image.png';

export const SupplierItemInfo = ({ item, handleOpenPage, handleSendMessage }) => {
  return (
    <div className={styles.supplierItem_info}>
      <div className={styles.supplierItem_info_logo}>
        <img src={item.companyLogo ? item.companyLogo : noImage} alt="" />
      </div>
      <p className={styles.supplierItem_info_name}>{item.name + ' ' + item.surname}</p>
      <p className={styles.supplierItem_info_company_name}>{item.companyName}</p>
      <p className={styles.supplierItem_info_position}>{item.position}</p>
      <p className={styles.supplierItem_info_phone}>
        <CallIcon fontSize="5px" />
        {item.phoneNumber}
      </p>
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
  );
};
