import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './css/OrderItem.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { orderItemValidationSchema } from './service/validationSchema/orderItemValidationSchema';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import {
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Breadcrumbs,
  Button,
  Typography,
  TextareaAutosize,
  IconButton,
  Tooltip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const OrderItem = () => {
  const { state } = useLocation();

  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: {},
    resolver: yupResolver(orderItemValidationSchema),
    mode: 'onChange'
  });

  const handleSubmitForm = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Link color="inherit" to="/orders" className={styles.link}>
          <Typography color="text.primary">Orders</Typography>
        </Link>
        {state ? (
          <Typography color="text.primary">Edit order</Typography>
        ) : (
          <Typography color="text.primary">New order</Typography>
        )}
      </Breadcrumbs>
      <div className={styles.header}>
        {state ? (
          <Typography variant="h5" component="div">
            Edit order
          </Typography>
        ) : (
          <Typography variant="h5" component="div">
            Create order
          </Typography>
        )}
      </div>
      <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.order_container}>
        <div className={styles.order_general_info}>
          <Controller
            name="orderName"
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
              />
            )}
          />
          <Controller
            name="selectedDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker value={value} onChange={onChange} />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <>
                <InputLabel id="select-label">Status:</InputLabel>
                <Select
                  labelId="select-label"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  error={!!error}>
                  <MenuItem value={'pending'}>Pending</MenuItem>
                  <MenuItem value={'sent_inquiry'}>Sent inquiry</MenuItem>
                  <MenuItem value={'on_the_way'}>On the way</MenuItem>
                  <MenuItem value={'delivered'}>Delivered</MenuItem>
                </Select>
              </>
            )}
          />
        </div>
        <div className={styles.line} />
        <div>
          <h3 className={styles.order_header}>
            Item list{' '}
            <Tooltip title="Take from box" placement="right">
              <IconButton aria-label="send">
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
          </h3>

          <div className={styles.orderList}>
            <ul>
              <li>
                <div className={styles.orderItem}>
                  <div className={styles.orderItemName}>Product name</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.line} />
        <div>
          <h3 className={styles.order_header}>Supplier</h3>
          <Controller
            name="Supplier"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  labelId="select-label"
                  onBlur={onBlur}
                  value={value}
                  sx={{ width: 250 }}
                  onChange={onChange}
                  error={!!error}>
                  <MenuItem value={'adamet@wp.pl'}>ADAMET</MenuItem>
                </Select>
              </>
            )}
          />
        </div>
        <div className={styles.line} />

        <div>
          <h3 className={styles.order_header}>Message to supplier</h3>
          <Controller
            name="additional_info"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <TextareaAutosize
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder="Hi, I would like to order..."
                minRows={10}
                maxRows={12}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  resize: 'none',
                  outline: 'none',
                  backgroundColor: 'inherit'
                }}
                error={error}
                hellperText={error ? error.message : null}
              />
            )}
          />
          <div className={styles.send_icon}>
            <Tooltip title="Generate message" placement="left">
              <IconButton aria-label="send">
                <SendIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={styles.line} />
        <div className={styles.form_btn}>
          <Button type="submit" variant="contained" color="primary">
            Create Order
          </Button>
        </div>
      </form>
    </div>
  );
};
