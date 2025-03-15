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
        endIcon={<DeleteIcon sx={{ color: '#ff4d4f' }} onClick={() => handleRemoveTag(tag)} />}
        variant="outlined"
        sx={{
          borderColor: '#e1ecec',
          color: '#767676',
          textTransform: 'uppercase',
          fontWeight: 600,
          fontSize: '12px',
          padding: '4px 10px',
          borderRadius: '5px',
          '&:hover': {
            borderColor: '#d1e0e0',
            backgroundColor: '#d1e0e0',
            color: '#4a90e2',
          },
        }}
      >
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
          <p className={styles.supplierFrom_details_title}>Contact Details</p>
          <form onSubmit={handleSubmit(handleForm)}>
            <SupplierDetailsForm control={control} />
            <SupplierTags handleAddTag={handleAddTag} />
            <div className={styles.tag_list}>{renderTagList()}</div>
            <div className={styles.btn_wrapper}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
                  borderRadius: '10px',
                  padding: '12px',
                  width: '200px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(74, 144, 226, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)',
                    boxShadow: '0 6px 16px rgba(74, 144, 226, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  color: '#fff',
                }}
              >
                {isEditMode ? 'UPDATE CONTACT' : 'CREATE CONTACT'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};