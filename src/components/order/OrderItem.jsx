// Importy zewnętrzne
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
// Importy lokalne
import { BreadcrumbNavigation } from './BreadcrumbNavigation';
import { OrderHeader } from './OrderHeader';
import { OrderForm } from './OrderForm';
import { orderItemValidationSchema } from './service/validationSchema/orderItemValidationSchema';
import { cartManager } from '../cart/service/cartManager';
import { supplierManager } from '../supplier/service/supplierManager';
import { orderManager } from './service/orderManager';

export const OrderItem = () => {
  const { state } = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existOrder = {
    name: state?.name || '',
    date: state ? dayjs(state.date, 'DD/MM/YYYY') : dayjs(new Date()),
    status: state?.status || 'pending',
    supplierEmail: state?.supplierEmail || '',
    supplierMessage: state?.supplierMessage || '',
    isAddedToWarehouse: state?.isAddedToWarehouse || false,
    isQuantityInTransportSet: state?.isQuantityInTransportSet || false
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!state) {
          const [items, supplierList] = await Promise.all([
            cartManager.getItems(),
            supplierManager.getSupplierList()
          ]);
          setSuppliers(supplierList);
          setCartItems(items);
        } else {
          setCartItems(state.orderItems);
        }
      } catch (error) {
        console.error('Error while fetching the list of suppliers.', error);
      }
    };

    fetchData();
  }, [state]);

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

  const getIncrement = (item) =>
    item.item.type === 'plate' || item.item.type === 'tool' ? 1 : 0.1;

  const handleQuantityChange = (itemList, increment) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name === itemList.name
          ? { ...item, quantity: Math.max(item.quantity + increment, 0) }
          : item
      )
    );
  };

  const handleIncrease = (itemList) => handleQuantityChange(itemList, getIncrement(itemList));
  const handleDecrease = (itemList) => handleQuantityChange(itemList, -getIncrement(itemList));

  const handleRemove = (itemList) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== itemList.name));
  };

  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

  const handleAutoMessage = () => {
    const greetings = ['Szanowni Państwo,', 'Dzień dobry,', 'Witam Państwa serdecznie,'];
    const farewells = [
      'Z poważaniem,',
      'Z wyrazami szacunku,',
      'Pozostaję z wyrazami szacunku,',
      'Z serdecznymi pozdrowieniami,'
    ];

    const itemsList = cartItems
      .map((item, index) => {
        const quantityLabel = item.item.diameter > 0 ? 'm.' : 'szt.';
        const quantityString = Number.isInteger(item.quantity)
          ? item.quantity.toString()
          : item.quantity.toFixed(1);
        return `${index + 1}. ${item.name} - ${quantityString} ${quantityLabel}`;
      })
      .join('\n');

    const message = `${getRandomElement(
      greetings
    )}\n\nUprzejmie proszę o przygotowanie oferty na poniższe pozycje:\n\n${itemsList}\n\n${getRandomElement(
      farewells
    )}`;

    reset({ ...watch(), supplierMessage: message });
  };

  const handleGenerateEmail = () => {
    const mailtoLink = `mailto:${watch('supplierEmail')}?subject=${encodeURIComponent(
      `Zapytanie ofertowe - ${watch('name')}`
    )}&body=${encodeURIComponent(watch('supplierMessage'))}`;
    window.location.href = mailtoLink;
  };

  const calculateAccumulatedPrice = () => {
    return cartItems.reduce((acc, item) => {
      const itemQuantity = item.quantity || 0;
      const materialPrice = item.material?.price || item.item?.price || 0;
      const toolPrice = item.tool?.price || item.item?.price || 0;
      return acc + (materialPrice + toolPrice) * itemQuantity;
    }, 0);
  };

  const handleSubmitForm = (data) => {
    const localDate = dayjs(data.date).locale('pl').format('DD/MM/YYYY');
    const totalPrice = calculateAccumulatedPrice().toFixed(2);

    const orderItems = cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      itemType: item.item?.type,
      itemID: item.item?.id,
      tool: item.tool,
      material: item.material
    }));

    const orderData = {
      ...data,
      date: localDate,
      totalPrice,
      orderItems
    };

    if (state) {
      const updatedOrder = { ...state, ...orderData };
      orderManager.updateOrder(updatedOrder, queryClient, dispatch, navigate);
    } else {
      orderManager.createOrder(orderData, queryClient, dispatch, navigate);
    }
  };

  return (
    <div>
      <BreadcrumbNavigation />
      <OrderHeader state={state} />
      <OrderForm
        suppliers={suppliers}
        existOrder={existOrder}
        accumulatedPrice={state ? state.totalPrice : calculateAccumulatedPrice()}
        control={control}
        handleDecrease={handleDecrease}
        state={state}
        handleSubmitForm={handleSubmitForm}
        handleSubmit={handleSubmit}
        handleGenerateEmail={handleGenerateEmail}
        cartItems={cartItems}
        handleIncrease={handleIncrease}
        handleAutoMessage={handleAutoMessage}
        handleRemove={handleRemove}
      />
    </div>
  );
};
