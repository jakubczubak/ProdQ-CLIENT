import React from 'react';
import { Breadcrumbs, Typography, Stack, TextField, Button } from '@mui/material';
import styles from './css/SupplierForm.module.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../common/Input';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useState } from 'react';
import { supplierValidationSchema } from './service/validationSchema/supplierValidationSchema';
import { useNavigate, useLocation } from 'react-router-dom';
import { supplierManager } from './service/supplierManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/contact.json';

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
      companyWebsite: isEditMode ? state.item.companyWebsite : ''
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
        variant="outlined"
      >
        {tag}
      </Button>
    ));
  };

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">...</Typography>
        <Typography
          color="text.primary"
          onClick={() => {
            navigate('/suppliers');
          }}
          className={styles.nav_link}
        >
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
            <Stack spacing={2} mb={2} className={styles.login_content} direction="row">
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
                      endAdornment: <BadgeOutlinedIcon sx={{ color: '#767676' }} />
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
                      endAdornment: <BadgeOutlinedIcon sx={{ color: '#767676' }} />
                    }}
                  />
                )}
              />
            </Stack>
            <Stack spacing={2} mb={2} className={styles.login_content} direction="row">
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
            </Stack>
            <Stack spacing={2} mb={2} className={styles.login_content} direction="row">
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
            </Stack>

            <Stack spacing={2} mb={2} className={styles.login_content} direction="row">
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
                    label="Company Logo"
                    InputProps={{
                      endAdornment: <PhotoSizeSelectActualOutlinedIcon sx={{ color: '#767676' }} />
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
                    label="Company Website"
                    InputProps={{
                      endAdornment: <LanguageOutlinedIcon sx={{ color: '#767676' }} />
                    }}
                  />
                )}
              />
            </Stack>
            <div className={styles.tag_wrapper}>
              <TextField
                id="standard-basic"
                label="Tag"
                variant="standard"
                sx={{ width: '100px' }}
                InputProps={{
                  endAdornment: (
                    <BookmarkBorderOutlinedIcon sx={{ color: '#767676' }} onClick={handleAddTag} />
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
