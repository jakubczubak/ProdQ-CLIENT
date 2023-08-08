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
import { InfoModal } from '../common/InfoModal';
import { toolManager } from '../tool/service/toolManager';
import { materialManager } from '../material/service/materialManager';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/order.json';

export const OrderItem = () => {
  const { state } = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [openDeliveryInfoModal, setOpenDeliveryInfoModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [openQuantityInfoModal, setOpenQuantityInfoModal] = useState(false);

  const existOrder = {
    orderName: state ? state.orderName : '',
    selectedDate: state ? dayjs(state.selectedDate, 'DD/MM/YYYY') : dayjs(new Date()),
    status: state ? state.status : 'pending',
    supplier_email: state ? state.supplier_email : '',
    supplier_message: state ? state.supplier_message : '',
    isAdded: state ? state.isAdded : false,
    isSetQuantityInTransport: state ? state.isSetQuantityInTransport : false
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
      setCartItems(state.items);
    }

    return () => {
      setCartItems([]);
    };
  }, []);

  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      orderName: existOrder.orderName,
      selectedDate: existOrder.selectedDate,
      status: existOrder.status,
      supplier_email: existOrder.supplier_email,
      supplier_message: existOrder.supplier_message,
      isAdded: existOrder.isAdded,
      isSetQuantityInTransport: existOrder.isSetQuantityInTransport
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
        supplier_message:
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
    const email = watch('supplier_email');
    const subject = `Zapytanie ofertowe - ${watch('orderName')}`;
    const body = watch('supplier_message');

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const accumulatedPrice = cartItems.reduce(
    (acc, item) => acc + item.item.price * item.quantity,
    0
  );

  const addToWarhouse = () => {
    formData.items.forEach((item) => {
      if (item.item.type === 'tool') {
        toolManager
          .getToolGroupByID(item.item.parent_id)
          .then((toolGroup) => {
            toolGroup.toolList = toolGroup.toolList.map((tool) => {
              if (tool.id === item.item.id) {
                tool.quantity = tool.quantity + item.quantity;
                tool.quantity_in_transit = tool.quantity_in_transit - item.quantity;
                return tool;
              }
              return tool;
            });
            return toolGroup;
          })
          .then((toolGroup) => {
            toolManager.updateToolQunatity(toolGroup, queryClient, dispatch);
          })
          .catch((error) => {
            console.error(error);
            // Tutaj możesz obsłużyć błąd, jeśli wystąpił
          });
      } else if (item.item.type === 'material') {
        materialManager
          .getMaterialGroupByID(item.item.parent_id)
          .then((materialGroup) => {
            materialGroup.materialList = materialGroup.materialList.map((material) => {
              if (material.id === item.item.id) {
                material.quantity = material.quantity + item.quantity;
                material.quantity_in_transit = material.quantity_in_transit - item.quantity;
                return material;
              }
              return material;
            });
            return materialGroup;
          })
          .then((materialGroup) => {
            materialManager.updateMaterialQunatity(materialGroup, queryClient, dispatch);
          })
          .catch((error) => {
            console.error(error);
            // Tutaj możesz obsłużyć błąd, jeśli wystąpił
          });
      }
    });
    formData.isAdded = true;
  };

  const setQuantityInTransit = () => {
    formData.items.forEach((item) => {
      if (item.item.type === 'tool') {
        toolManager

          .getToolGroupByID(item.item.parent_id)
          .then((toolGroup) => {
            toolGroup.toolList = toolGroup.toolList.map((tool) => {
              if (tool.id === item.item.id) {
                tool.quantity_in_transit = tool.quantity_in_transit + item.quantity;
              }
              return tool;
            });
            return toolGroup;
          })
          .then((toolGroup) => {
            toolManager.updateToolQunatityInTransit(toolGroup, queryClient, dispatch);
          })
          .catch((error) => {
            console.error(error);
            // Tutaj możesz obsłużyć błąd, jeśli wystąpił
          });
      } else if (item.item.type === 'material') {
        materialManager

          .getMaterialGroupByID(item.item.parent_id)
          .then((materialGroup) => {
            materialGroup.materialList = materialGroup.materialList.map((material) => {
              if (material.id === item.item.id) {
                material.quantity_in_transit = material.quantity_in_transit + item.quantity;
                return material;
              }
              return material;
            });
            return materialGroup;
          })
          .then((materialGroup) => {
            materialManager.updateMaterialQunatityInTransit(materialGroup, queryClient, dispatch);
          })
          .catch((error) => {
            console.error(error);
            // Tutaj możesz obsłużyć błąd, jeśli wystąpił
          });
      }
    });
    formData.isSetQuantityInTransport = true;
  };
  const handleQuantityInTransit = () => {
    if (!formData.isSetQuantityInTransport) {
      setQuantityInTransit();
    }

    const updatedOrder = { ...state, ...formData };
    orderManager.updateOrder(updatedOrder, queryClient, dispatch, navigate);
    setOpenQuantityInfoModal(false);
  };

  const handleAutoAddToWarehouse = () => {
    if (!formData.isAdded) {
      addToWarhouse();
    }
    const updatedOrder = { ...state, ...formData };
    orderManager.updateOrder(updatedOrder, queryClient, dispatch, navigate);
    setOpenDeliveryInfoModal(false);
  };

  const handleSubmitForm = (data) => {
    const localDate = dayjs(data.selectedDate).locale('pl').format('DD/MM/YYYY');
    data.selectedDate = localDate;
    data.items = cartItems;
    data.totalPrice = accumulatedPrice;
    setFormData(data);

    if (data.status === 'delivered') {
      setOpenDeliveryInfoModal(true);
    } else if (data.status === 'on the way') {
      setOpenQuantityInfoModal(true);
    } else {
      if (state) {
        const updatedOrder = { ...state, ...data };
        orderManager.updateOrder(updatedOrder, queryClient, dispatch, navigate);
      } else {
        orderManager.createOrder(data, queryClient, dispatch, navigate);
      }
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
                disabled={state ? state.isAdded : false}
              />
            )}
          />
          <Controller
            name="selectedDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                value={value}
                onChange={onChange}
                disabled={state ? state.isAdded : false}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <>
                {state ? (
                  <>
                    <InputLabel id="select-label">Status:</InputLabel>
                    <Select
                      labelId="select-label"
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      disabled={state ? state.isAdded : false}
                    >
                      <MenuItem value={'pending'}>Pending</MenuItem>
                      <MenuItem value={'on the way'}>On the way</MenuItem>
                      <MenuItem value={'delivered'}>Delivered</MenuItem>
                    </Select>
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
                  <Tooltip title={item.name} placement="top">
                    <span className={styles.item_name}>
                      {index + 1}. {item.name}
                    </span>
                  </Tooltip>
                  <span className={styles.item_quantity}>
                    <Tooltip title="Increase quantity" placement="top">
                      <IconButton
                        onClick={() => handleIncrease(item)}
                        disabled={state ? state.isAdded : false}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                    ({item.quantity})
                    <Tooltip
                      title="Decrease quantity"
                      placement="top"
                      disabled={state ? state.isAdded : false}
                    >
                      <IconButton onClick={() => handleDecrease(item)}>
                        <RemoveIcon />
                      </IconButton>
                    </Tooltip>
                  </span>

                  <Tooltip title="Price" placement="top">
                    <span className={styles.item_price}>
                      {(item.item.price * item.quantity).toFixed(2)} PLN
                    </span>
                  </Tooltip>

                  <Tooltip title="Remove item" placement="top">
                    <IconButton
                      onClick={() => handleRemove(item)}
                      disabled={state ? state.isAdded : false}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.line} />
        <div>
          <h3 className={styles.order_header}>Summary</h3>
          <div className={styles.total_price}>
            <span>Total price:</span>
            <span className={styles.total_price_value}>{accumulatedPrice} PLN (net)</span>
          </div>
        </div>
        <div className={styles.line} />
        <div>
          <h3 className={styles.order_header}>Supplier</h3>
          <Controller
            name="supplier_email"
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
                disabled={state ? state.isAdded : false}
              >
                {state ? (
                  <MenuItem value={existOrder.supplier_email} disabled>
                    {existOrder.supplier_email}
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
            name="supplier_message"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <TextareaAutosize
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder="Hi, I would like to order..."
                minRows={10}
                maxRows={12}
                disabled={state ? state.isAdded : false}
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
              <IconButton
                aria-label="send"
                onClick={handleGenerateEmail}
                disabled={state ? state.isAdded : false}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={styles.line} />
        <div className={styles.form_btn}>
          {state ? (
            state.isAdded ? (
              <Button type="submit" variant="contained" color="primary" disabled>
                Order added to warehouse
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
      <InfoModal
        open={openDeliveryInfoModal}
        onCancel={() => setOpenDeliveryInfoModal(false)}
        onConfirm={() => handleAutoAddToWarehouse()}
        text="Please check if the order is correct. If you want to edit the order, click 'Cancel' and then 'Edit order'.
        If you want to add the order to the warehouse, click 'Confirm' This action cannot be undone."
      />
      <InfoModal
        open={openQuantityInfoModal}
        onCancel={() => setOpenQuantityInfoModal(false)}
        onConfirm={() => handleQuantityInTransit()}
        text="Please check if the order is correct. If you want to edit the order, click 'Cancel' and then 'Edit order'.
        If you want to set quantity in transit to the warehouse, click 'Confirm' This action cannot be undone."
      />
    </div>
  );
};
