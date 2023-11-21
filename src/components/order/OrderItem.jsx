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
import { cartManager } from '../cart/service/cartManager';
import { useState, useEffect } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import dayjs from 'dayjs';
import { supplierManager } from '../supplier/service/supplierManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderManager } from './service/orderManager';

import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/order.json';

export const OrderItem = () => {
  const { state } = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const existOrder = {
    name: state ? state.name : '',
    date: state ? dayjs(state.date, 'DD/MM/YYYY') : dayjs(new Date()),
    status: state ? state.status : 'pending',
    supplierEmail: state ? state.supplierEmail : '',
    supplierMessage: state ? state.supplierMessage : '',
    isAddedToWarehouse: state ? state.isAddedToWarehouse : false,
    isQuantityInTransportSet: state ? state.isQuantityInTransportSet : false
  };

  useEffect(() => {
    const fetchData = async () => {
      const items = cartManager.getItems();
      try {
        const supplierList = await supplierManager.getSupplierList();
        setSuppliers(supplierList);
        setCartItems(items);
      } catch (error) {
        console.error('Error while fetching the list of suppliers.', error);
      }
    };

    if (!state) {
      fetchData();
    } else {
      setCartItems(state.orderItems);
    }

    return () => {
      setCartItems([]);
    };
  }, []);

  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      name: existOrder.name,
      date: existOrder.date,
      status: existOrder.status,
      supplierEmail: existOrder.supplierEmail,
      supplierMessage: existOrder.supplierMessage
    },
    resolver: yupResolver(orderItemValidationSchema),
    mode: 'onChange'
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrease = (itemList) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.name === itemList.name) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });
    });
  };

  const handleDecrease = (itemList) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.name === itemList.name && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }
        return item;
      });
    });
  };

  const handleRemove = (itemList) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.name !== itemList.name);
    });
  };

  const handleAutoMessage = () => {
    reset(
      {
        ...watch(),
        supplierMessage:
          'Dzień dobry, \n\n Proszę o ofertę na następujące pozycje: \n\n' +
          cartItems
            .map((item, index) => `${index + 1}. ${item.name} - ${item.quantity} szt. \n`)
            .join('') +
          '\nPozdrawiam, \n\n'
      },
      {}
    );
  };
  const handleGenerateEmail = () => {
    const email = watch('supplierEmail');
    const subject = `Zapytanie ofertowe - ${watch('name')}`;
    const body = watch('supplierMessage');

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const accumulatedPrice = cartItems.reduce((acc, item) => {
    if (state) {
      const itemQuantity = item.quantity || 0;
      const materialPrice = item.material ? item.material.price : 0;
      const toolPrice = item.tool ? item.tool.price : 0;
      return acc + materialPrice * itemQuantity + toolPrice * itemQuantity;
    } else {
      const materialPrice = item.item ? item.item.price : 0;
      const toolPrice = item.tool ? item.item.price : 0;
      const itemQuantity = item.quantity || 0;
      return acc + materialPrice * itemQuantity + toolPrice * itemQuantity;
    }
  }, 0);

  const handleSubmitForm = (data) => {
    const localDate = dayjs(data.selectedDate).locale('pl').format('DD/MM/YYYY');
    data.date = localDate;
    data.totalPrice = accumulatedPrice.toFixed(2);

    if (state) {
      const orderItems = cartItems.map((item) => {
        return {
          name: item.name,
          quantity: item.quantity,
          tool: item.tool,
          material: item.material
        };
      });

      data.orderItems = orderItems;
      const updatedOrder = { ...state, ...data };

      orderManager.updateOrder(updatedOrder, queryClient, dispatch, navigate);
    } else {
      const orderItems = cartItems.map((item) => {
        return {
          name: item.name,
          quantity: item.quantity,
          itemType: item.item.type,
          itemID: item.item.id
        };
      });

      data.orderItems = orderItems;
      orderManager.createOrder(data, queryClient, dispatch, navigate);
    }
  };

  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
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
                          disabled
                        >
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
                          error={!!error}
                        >
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
                      error={!!error}
                    >
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

          <div className={styles.list}>
            {cartItems &&
              cartItems.map((item, index) => (
                <div key={index} className={styles.list_item}>
                  <div>
                    <Tooltip title={item.name} placement="top">
                      <span className={styles.item_name}>
                        {index + 1}. {item.name}
                      </span>
                    </Tooltip>
                  </div>

                  <div className={styles.action_wrapper}>
                    <Tooltip title="Price" placement="top">
                      <span className={styles.item_price}>
                        {item.item ? item.item.price.toFixed(2) : ''}
                        {item.material ? item.material.price.toFixed(2) : ''}
                        {item.tool ? item.tool.price.toFixed(2) : ''} PLN (net)
                      </span>
                    </Tooltip>
                    <span className={styles.item_quantity}>
                      <Tooltip title="Increase quantity" placement="top">
                        <span>
                          <IconButton
                            onClick={() => handleIncrease(item)}
                            disabled={state ? true : false}
                          >
                            <AddIcon color="primary" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      ({item.quantity})
                      <Tooltip title="Decrease quantity" placement="top">
                        <span>
                          <IconButton
                            onClick={() => handleDecrease(item)}
                            disabled={state ? true : false}
                          >
                            <RemoveIcon color="primary" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </span>

                    <Tooltip title="Remove item" placement="top">
                      <span>
                        <IconButton
                          onClick={() => handleRemove(item)}
                          disabled={state ? true : false}
                        >
                          <DeleteForeverIcon color="primary" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.line} />
        <div>
          <h3 className={styles.order_header}>Summary</h3>
          <div className={styles.total_price}>
            <span>Total price:</span>
            <span className={styles.total_price_value}>
              {accumulatedPrice.toFixed(2)} PLN (net)
            </span>
          </div>
        </div>
        <div className={styles.line} />
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
                disabled={state ? true : false}
              >
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
        <div className={styles.line} />

        <div>
          <h3 className={styles.order_header}>
            Message to supplier{' '}
            <Tooltip title="Generate auto message" placement="top">
              <IconButton onClick={handleAutoMessage} disabled={state ? state.isAdded : false}>
                <AutoAwesomeIcon />
              </IconButton>
            </Tooltip>
          </h3>
          <Controller
            name="supplierMessage"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <TextareaAutosize
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder="Hi, I would like to order..."
                minRows={10}
                maxRows={12}
                disabled={state ? true : false}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  resize: 'none',
                  outline: 'none',
                  backgroundColor: 'inherit',
                  color: '#52565e'
                }}
                error={error}
              />
            )}
          />
          <div className={styles.send_icon}>
            <Tooltip title="Email" placement="left">
              <span>
                <IconButton
                  aria-label="send"
                  onClick={handleGenerateEmail}
                  disabled={state ? true : false}
                >
                  <SendIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        </div>
        <div className={styles.line} />
        <div className={styles.form_btn}>
          {state ? (
            state.status === 'delivered' ? (
              <Button type="submit" variant="contained" color="primary" disabled>
                Update Order
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="primary">
                Update Order
              </Button>
            )
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Create Order
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
