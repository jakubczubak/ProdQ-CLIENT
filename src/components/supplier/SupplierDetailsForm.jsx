//Importy zewnętrzne
import React from 'react';
import { Controller } from 'react-hook-form';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
//Importy lokalne
import styles from './css/SupplierForm.module.css';
import { Input } from '../common/Input';

export const SupplierDetailsForm = ({ control }) => {
  return (
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
              label="Branch"
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
              label="Website (URL)"
              InputProps={{
                endAdornment: <LanguageOutlinedIcon sx={{ color: '#767676' }} />
              }}
            />
          )}
        />
      </div>
    </div>
  );
};
