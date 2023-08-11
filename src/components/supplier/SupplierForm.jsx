import React from 'react';
import { Breadcrumbs, Typography, TextField, Button, Tooltip } from '@mui/material';
import styles from './css/SupplierForm.module.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../common/Input';
import { useState } from 'react';
import { supplierValidationSchema } from './service/validationSchema/supplierValidationSchema';
import { useNavigate, useLocation } from 'react-router-dom';
import { supplierManager } from './service/supplierManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/contact.json';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

export const SupplierForm = () => {
  const { state } = useLocation();
  const isEditMode = state ? true : false;

  const [tagList, setTagList] = useState(isEditMode ? state.item.tagList : []);

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

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

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
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography
          color="text.primary"
          onClick={() => {
            navigate('/suppliers');
          }}
          className={styles.nav_link}>
          Network
        </Typography>
        <Typography color="text.primary">
          {isEditMode ? 'Edit coworker' : 'New coworker'}
        </Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          {isEditMode ? 'Coworker - edit' : 'Coworker'}
        </Typography>
      </div>
      <div className={styles.supplierForm_wrapper}>
        <div className={styles.supplierFrom_details_container}>
          <Lottie animationData={animation} loop={true} className={styles.animation} />

          <p className={styles.supplierFrom_details_title}>Contact details</p>
          <form onSubmit={handleSubmit(handleForm)}>
            <div className={styles.form_wrapper}>
              <div className={styles.form_wrapper_item}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      error={error}
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      variant="standard"
                      label="Name"
                      InputProps={{
                        endAdornment: <Person2OutlinedIcon sx={{ color: '#767676' }} />
                      }}
                    />
                  )}
                />
                <Controller
                  name="surname"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      error={error}
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      label="Surname"
                      variant="standard"
                      InputProps={{
                        endAdornment: <Person2OutlinedIcon sx={{ color: '#767676' }} />
                      }}
                    />
                  )}
                />

                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      error={error}
                      onBlur={onBlur}
                      variant="standard"
                      value={value}
                      onChange={onChange}
                      label="Phone"
                      InputProps={{
                        endAdornment: <LocalPhoneOutlinedIcon sx={{ color: '#767676' }} />
                      }}
                    />
                  )}
                />
                <Controller
                  name="position"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      error={error}
                      onBlur={onBlur}
                      variant="standard"
                      value={value}
                      onChange={onChange}
                      label="Position"
                      InputProps={{
                        endAdornment: <WorkOutlineOutlinedIcon sx={{ color: '#767676' }} />
                      }}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      error={error}
                      onBlur={onBlur}
                      variant="standard"
                      value={value}
                      onChange={onChange}
                      label="Email"
                      InputProps={{
                        endAdornment: <EmailOutlinedIcon sx={{ color: '#767676' }} />
                      }}
                    />
                  )}
                />
              </div>

              <div className={styles.form_wrapper_item}>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      error={error}
                      onBlur={onBlur}
                      variant="standard"
                      value={value}
                      onChange={onChange}
                      label="Company"
                      InputProps={{
                        endAdornment: <BusinessOutlinedIcon sx={{ color: '#767676' }} />
                      }}
                    />
                  )}
                />
                <Controller
                  name="companyTaxId"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      error={error}
                      onBlur={onBlur}
                      variant="standard"
                      value={value}
                      onChange={onChange}
                      label="Tax ID"
                      InputProps={{
                        endAdornment: <ConfirmationNumberOutlinedIcon sx={{ color: '#767676' }} />
                      }}
                    />
                  )}
                />
                <Controller
                  name="companyLogo"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      error={error}
                      placeholder="Image URL"
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      variant="standard"
                      label="Logo (URL)"
                      InputProps={{
                        endAdornment: (
                          <PhotoSizeSelectActualOutlinedIcon sx={{ color: '#767676' }} />
                        )
                      }}
                    />
                  )}
                />
                <Controller
                  name="companyWebsite"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      error={error}
                      placeholder="Website URL"
                      onBlur={onBlur}
                      variant="standard"
                      value={value}
                      onChange={onChange}
                      label="Website (URL)"
                      InputProps={{
                        endAdornment: <LanguageOutlinedIcon sx={{ color: '#767676' }} />
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className={styles.tag_wrapper}>
              <TextField
                id="standard-basic"
                label="Identification mark"
                variant="outlined"
                color="primary"
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Assign an identification mark">
                      <SendOutlinedIcon
                        sx={{ color: '#767676', cursor: 'pointer' }}
                        onClick={handleAddTag}
                      />
                    </Tooltip>
                  )
                }}
              />
            </div>
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
