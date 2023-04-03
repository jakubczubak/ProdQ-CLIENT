import React from 'react';
import { Breadcrumbs, Typography, Stack, TextField, IconButton, Tooltip } from '@mui/material';
import styles from './css/SupplierForm.module.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../common/Input';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import noImage from '../../assets/no-image.png';
import { supplierValidationSchema } from './service/validationSchema/supplierValidationSchema';
import { useNavigate, useLocation } from 'react-router-dom';
import { supplierManager } from './service/supplierManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

export const SupplierForm = () => {
  const { state } = useLocation();
  const isEditMode = state ? true : false;

  const [name, setName] = useState(isEditMode ? state.item.name : '');
  const [surname, setSurname] = useState(isEditMode ? state.item.surname : '');
  const [phoneNumber, setPhoneNumber] = useState(isEditMode ? state.item.phoneNumber : '');
  const [email, setEmail] = useState(isEditMode ? state.item.email : '');
  const [companyName, setCompanyName] = useState(isEditMode ? state.item.companyName : '');
  const [companyAddress, setComapnyAddress] = useState(isEditMode ? state.item.companyAddress : '');
  const [companyLogo, setCompanyLogo] = useState(isEditMode ? state.item.companyLogo : '');
  const [companyWebsite, setCompanyWebsite] = useState(isEditMode ? state.item.companyWebsite : '');
  const [tagList, setTagList] = useState(isEditMode ? state.item.tagList : []);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: isEditMode ? state.item.name : '',
      surname: isEditMode ? state.item.surname : '',
      phoneNumber: isEditMode ? state.item.phoneNumber : '',
      email: isEditMode ? state.item.email : '',
      companyName: isEditMode ? state.item.companyName : '',
      companyAddress: isEditMode ? state.item.companyAddress : '',
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
      <div key={index} className={styles.tag_item}>
        <p className={styles.tag_item_text}>{tag}</p>
        <IconButton className={styles.tag_item_icon} onClick={() => handleRemoveTag(tag)}>
          <CloseIcon />
        </IconButton>
      </div>
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
          Suppliers
        </Typography>
        <Typography color="text.primary">{isEditMode ? 'Edit Form' : 'Form'}</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          {isEditMode ? 'Edit Supplier' : 'Add Supplier'}
        </Typography>
      </div>
      <div className={styles.supplierForm_wrapper}>
        <div className={styles.supplierFrom_info_container}>
          <div className={styles.supplierFrom_info}>
            <div className={styles.supplierFrom_info_logo}>
              <img src={companyLogo ? companyLogo : noImage} alt="" />
            </div>
            <p className={styles.supplierFrom_info_name}>{name + ' ' + surname}</p>
            <p className={styles.supplierFrom_info_company_name}>{companyName}</p>
            <a className={styles.supplierFrom_info_email} href={`mailto:${email}`}>
              {email}
            </a>
            <p className={styles.supplierFrom_info_phone}>{phoneNumber}</p>
            <p className={styles.supplierFrom_info_address}>{companyAddress}</p>
            <button
              className={styles.supplierFrom_info_button}
              onClick={() => {
                if (companyWebsite) {
                  window.open(companyWebsite, '_blank');
                }
              }}
            >
              View Company Page
            </button>
          </div>
        </div>
        <div className={styles.supplierFrom_details_container}>
          <p className={styles.supplierFrom_details_title}>Supplier Details</p>
          <form onSubmit={handleSubmit(handleForm)}>
            <Stack spacing={2} mb={2} className={styles.login_content} direction="row">
              <Controller
                name="name"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="Monika"
                    onBlur={onBlur}
                    value={value}
                    onChange={(event) => {
                      const inputName = event.target.value;
                      setName(inputName);
                      onChange(inputName);
                    }}
                    label="Name"
                  />
                )}
              />
              <Controller
                name="surname"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="Orzechowska"
                    onBlur={onBlur}
                    value={value}
                    onChange={(event) => {
                      const inputSurname = event.target.value;
                      setSurname(inputSurname);
                      onChange(inputSurname);
                    }}
                    label="Surname"
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
                    placeholder="+48 732 489 006"
                    onBlur={onBlur}
                    value={value}
                    onChange={(event) => {
                      const inputPhoneNumber = event.target.value;
                      setPhoneNumber(inputPhoneNumber);
                      onChange(inputPhoneNumber);
                    }}
                    label="Phone Number"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="monika.o@gmail.com"
                    onBlur={onBlur}
                    value={value}
                    onChange={(event) => {
                      const inputEmail = event.target.value;
                      setEmail(inputEmail);
                      onChange(inputEmail);
                    }}
                    label="Email Address"
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
                    placeholder="Adamet"
                    onBlur={onBlur}
                    value={value}
                    onChange={(event) => {
                      const inputCompanyName = event.target.value;
                      setCompanyName(inputCompanyName);
                      onChange(inputCompanyName);
                    }}
                    label="Company Name"
                  />
                )}
              />
              <Controller
                name="companyAddress"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="Warszawa, ul. Kolejowa 12"
                    onBlur={onBlur}
                    value={value}
                    onChange={(event) => {
                      const inputCompanyAddress = event.target.value;
                      setComapnyAddress(inputCompanyAddress);
                      onChange(inputCompanyAddress);
                    }}
                    label="Company Address"
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
                    onChange={(event) => {
                      const inputCompanyLogo = event.target.value;
                      setCompanyLogo(inputCompanyLogo);
                      onChange(inputCompanyLogo);
                    }}
                    label="Company Logo"
                    variant="filled"
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
                    value={value}
                    onChange={(event) => {
                      const inputCompanyWebsite = event.target.value;
                      setCompanyWebsite(inputCompanyWebsite);
                      onChange(inputCompanyWebsite);
                    }}
                    label="Company Website"
                    variant="filled"
                  />
                )}
              />
            </Stack>
            <div className={styles.tag_wrapper}>
              <TextField id="standard-basic" label="ADD TAG" variant="standard" />
              <Tooltip title="Add Tag" placement="right">
                <IconButton className={styles.tag_icon} onClick={handleAddTag}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className={styles.tag_list}>{renderTagList()}</div>
            {isEditMode ? (
              <button type="submit" className={styles.submit_button_edit}>
                UPDATE SUPPLIER
              </button>
            ) : (
              <button type="submit" className={styles.submit_button}>
                CREATE SUPPLIER
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
