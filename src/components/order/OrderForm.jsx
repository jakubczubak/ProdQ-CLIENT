import React from 'react';
import styles from './css/OrderItem.module.css';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { InputLabel, Select, MenuItem, TextField } from '@mui/material';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/order.json';
import { ItemList } from './ItemList';
import { OrderSummary } from './OrderSummary';
import { SupplierSelection } from './SupplierSelection';
import { MessageToSupplier } from './MessageToSupplier';
import { SubmitButton } from './SubmitButton';

export const OrderForm = ({
  suppliers,
  existOrder,
  accumulatedPrice,
  control,
  handleDecrease,
  state,
  handleSubmitForm,
  handleSubmit,
  handleGenerateEmail,
  cartItems,
  handleIncrease,
  handleAutoMessage,
  handleRemove
}) => {
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.order_container}>
      <Lottie animationData={animation} loop={true} className={styles.animation} />
      <div className={styles.order_general_info}>
        <Controller
          name="name"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <TextField
              id="outlined-basic"
              label="Order name"
              variant="outlined"
              error={!!error}
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              helperText={error ? error.message : null}
              mb={16}
              disabled={state ? true : false}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker value={value} onChange={onChange} disabled={state ? true : false} />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
            <>
              {state ? (
                <>
                  {state.status === 'delivered' ? (
                    <>
                      <InputLabel id="select-label">Status:</InputLabel>
                      <Select
                        labelId="select-label"
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        disabled>
                        <MenuItem value={'on the way'}>On the way</MenuItem>
                        <MenuItem value={'delivered'}>Delivered</MenuItem>
                        <MenuItem value={'pending'}>Pending</MenuItem>
                      </Select>
                    </>
                  ) : (
                    <>
                      <InputLabel id="select-label">Status:</InputLabel>
                      <Select
                        labelId="select-label"
                        onBlur={onBlur}
                        value={value}
                        defaultValue={'one the way'}
                        onChange={onChange}
                        error={!!error}>
                        <MenuItem value={'on the way'}>On the way</MenuItem>
                        <MenuItem value={'delivered'}>Delivered</MenuItem>
                        <MenuItem value={'pending'}>Pending</MenuItem>
                      </Select>
                    </>
                  )}
                </>
              ) : (
                <>
                  <InputLabel id="select-label">Status:</InputLabel>
                  <Select
                    labelId="select-label"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={!!error}>
                    <MenuItem value={'on the way'}>On the way</MenuItem>
                    <MenuItem value={'delivered'}>Delivered</MenuItem>
                    <MenuItem value={'pending'}>Pending</MenuItem>
                  </Select>
                </>
              )}
            </>
          )}
        />
      </div>
      <div className={styles.line} />
      <div>
        <h3 className={styles.order_header}>Item list</h3>

        <ItemList
          cartItems={cartItems}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          handleRemove={handleRemove}
        />
      </div>
      <div className={styles.line} />
      <OrderSummary accumulatedPrice={accumulatedPrice} />
      <div className={styles.line} />
      <SupplierSelection
        control={control}
        state={state}
        suppliers={suppliers}
        existOrder={existOrder}
      />
      <div className={styles.line} />
      <MessageToSupplier
        control={control}
        state={state}
        handleAutoMessage={handleAutoMessage}
        handleGenerateEmail={handleGenerateEmail}
      />
      <div className={styles.line} />
      <SubmitButton state={state} />
    </form>
  );
};
