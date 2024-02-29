import React from 'react';
import styles from './css/OrderItem.module.css';
import { Controller } from 'react-hook-form';
import { Select, MenuItem } from '@mui/material';

export const SupplierSelection = ({ control, state, suppliers, existOrder }) => {
  return (
    <div>
      <h3 className={styles.order_header}>Supplier</h3>
      <Controller
        name="supplierEmail"
        control={control}
        render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
          <Select
            labelId="select-label"
            onBlur={onBlur}
            value={value}
            placeholder="Select supplier"
            displayEmpty
            sx={{ width: 250, color: '#52565e' }}
            onChange={onChange}
            error={!!error}
            disabled={state ? true : false}>
            {state ? (
              <MenuItem value={existOrder.supplierEmail} disabled>
                {existOrder.supplierEmail}
              </MenuItem>
            ) : (
              <MenuItem value="" disabled>
                Select supplier
              </MenuItem>
            )}
            {suppliers.map((supplier) => (
              <MenuItem key={supplier.id} value={supplier.email}>
                {supplier.email}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </div>
  );
};
