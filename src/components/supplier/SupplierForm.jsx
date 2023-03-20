import React from 'react';
import { Breadcrumbs, Typography, Stack, TextField, IconButton } from '@mui/material';
import styles from './css/SupplierForm.module.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '../common/Input';
import AddIcon from '@mui/icons-material/Add';

export const SupplierForm = () => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      materialGroupName: '',
      type: '',
      image: '',
      material: null
    }
    // resolver: yupResolver(materialGroupValidationSchema)
  });

  const handleForm = (data) => {
    console.log(data);
  };

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Suppliers</Typography>
        <Typography color="text.primary">Form</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Create supplier
        </Typography>
      </div>
      <div className={styles.supplierForm_wrapper}>
        <div className={styles.supplierFrom_info_container}>
          <div className={styles.supplierFrom_info}>
            <div className={styles.supplierFrom_info_logo}>
              <img src="https://www.adamet.com.pl/wp-content/uploads/2019/08/logo_an.png" alt="" />
            </div>
            <p className={styles.supplierFrom_info_name}>Tim Cook</p>
            <p className={styles.supplierFrom_info_company_name}>Apple INC.</p>
            <p className={styles.supplierFrom_info_email}>test@gmail.com</p>
            <p className={styles.supplierFrom_info_phone}>123 123 123</p>
            <p className={styles.supplierFrom_info_address}>Seattle, SA</p>
            <button className={styles.supplierFrom_info_button}>View Company Page</button>
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
                    onChange={onChange}
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
                    onChange={onChange}
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
                    onChange={onChange}
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
                    onChange={onChange}
                    label="Email Address"
                  />
                )}
              />
            </Stack>
            <Stack spacing={2} mb={2} className={styles.login_content} direction="row">
              <Controller
                name="compnayName"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="Adamet"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Company Name"
                  />
                )}
              />
              <Controller
                name="CompanyAddress"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="Warszawa, ul. Kolejowa 12"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Company Address"
                  />
                )}
              />
            </Stack>
            <Stack spacing={2} mb={2} className={styles.login_content} direction="row">
              <Controller
                name="compnayLogo"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="URL"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Company Logo"
                    variant="filled"
                  />
                )}
              />
              <Controller
                name="compnayLogo"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="URL"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Company Link"
                    variant="filled"
                  />
                )}
              />
            </Stack>
            <div className={styles.tag_wrapper}>
              <TextField id="standard-basic" label="ADD TAG" variant="standard" />
              <IconButton>
                <AddIcon />
              </IconButton>
            </div>
            <div className={styles.tag_list}>
              <button className={styles.tag_item}>1 tag</button>
            </div>
            <button type="submit">CREATE SUPPLIER</button>
          </form>
        </div>
      </div>
    </>
  );
};
