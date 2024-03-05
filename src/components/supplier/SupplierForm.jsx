// Importy zewnętrzne
import React from 'react';
import { Button } from '@mui/material';
import Lottie from 'lottie-react';

// Importy lokalne
import styles from './css/SupplierForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { supplierValidationSchema } from './service/validationSchema/supplierValidationSchema';
import { useNavigate, useLocation } from 'react-router-dom';
import { supplierManager } from './service/supplierManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { SupplierHeader } from './SupplierHeader';
import { SupplierDetailsForm } from './SupplierDetailsForm';
import { SupplierTags } from './SupplierTags';
import animation from '../../assets/Lottie/contact.json';

export const SupplierForm = () => {
  const { state } = useLocation();
  const isEditMode = state ? true : false;
  const [tagList, setTagList] = useState(isEditMode ? state.item.tagList : []);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: isEditMode ? state.item.name : '',
      surname: isEditMode ? state.item.surname : '',
      phoneNumber: isEditMode ? state.item.phoneNumber : '',
      email: isEditMode ? state.item.email : '',
      companyName: isEditMode ? state.item.companyName : '',
      position: isEditMode ? state.item.position : '',
      companyLogo: isEditMode ? state.item.companyLogo : '',
      companyWebsite: isEditMode ? state.item.companyWebsite : '',
      companyTaxId: isEditMode ? state.item.companyTaxId : ''
    },
    resolver: yupResolver(supplierValidationSchema)
  });

  const handleForm = (data) => {
    data.tagList = tagList;
    if (isEditMode) {
      data.id = state.item.id;
      supplierManager.updateSupplier(data, queryClient, dispatch, navigate);
      return;
    } else {
      supplierManager.createSupplier(data, queryClient, dispatch, navigate);
    }
  };

  const handleAddTag = () => {
    const newTag = document.getElementById('standard-basic').value;
    if (!newTag) return;
    setTagList([...tagList, newTag]);
    document.getElementById('standard-basic').value = '';
  };

  const handleRemoveTag = (tag) => {
    const updatedTagList = tagList.filter((t) => t !== tag);
    setTagList(updatedTagList);
  };

  const renderTagList = () => {
    return tagList.map((tag, index) => (
      <Button
        key={index}
        endIcon={<DeleteIcon onClick={() => handleRemoveTag(tag)} />}
        variant="outlined">
        {tag}
      </Button>
    ));
  };

  return (
    <>
      <SupplierHeader navigate={navigate} isEditMode={isEditMode} />
      <div className={styles.supplierForm_wrapper}>
        <div className={styles.supplierFrom_details_container}>
          <Lottie animationData={animation} loop={true} className={styles.animation} />
          <p className={styles.supplierFrom_details_title}>Contact details</p>
          <form onSubmit={handleSubmit(handleForm)}>
            <SupplierDetailsForm control={control} />
            <SupplierTags handleAddTag={handleAddTag} />
            <div className={styles.tag_list}>{renderTagList()}</div>
            <div className={styles.btn_wrapper}>
              {isEditMode ? (
                <Button type="submit" variant="contained">
                  UPDATE CONTACT
                </Button>
              ) : (
                <Button type="submit" variant="contained">
                  CREATE CONTACT
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
