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

  // Funkcja określająca jednostkę i typ na podstawie pól x, y, z, diameter, length, thickness
  const getUnitAndType = (item) => {
    const { x = 0, y = 0, z = 0, diameter = 0, length = 0, thickness = 0 } = item.item || {};

    if (x > 0 && y > 0 && z > 0 && diameter === 0 && thickness === 0) {
      return { unit: ' szt.', type: 'Płyty' };
    } else if (diameter > 0 && length > 0 && thickness > 0) {
      return { unit: ' m.b.', type: 'Rury' };
    } else if (diameter > 0 && length > 0) {
      return { unit: ' m.b.', type: 'Pręty' };
    }
    return { unit: '', type: 'Inne' };
  };

  const getIncrement = (item) => {
    const { unit } = getUnitAndType(item);
    return unit === ' szt.' ? 1 : 0.1;
  };

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

  const handleAutoMessage = () => {
    const groupedItems = cartItems.reduce((acc, item) => {
      const { unit, type } = getUnitAndType(item);
      const key = `${type}|${item.name}`;
      if (!acc[key]) {
        acc[key] = { type, name: item.name, quantity: 0, unit };
      }
      acc[key].quantity += item.quantity;
      return acc;
    }, {});

    const itemsByType = {};
    Object.values(groupedItems).forEach(({ type, name, quantity, unit }) => {
      if (!itemsByType[type]) {
        itemsByType[type] = [];
      }
      const quantityString = quantity.toFixed(2);
      itemsByType[type].push(`${name} - ${quantityString}${unit}`);
    });

    const sections = Object.entries(itemsByType)
      .map(([type, items]) => {
        const itemList = items.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
        return `${type}:\n${itemList}`;
      })
      .join('\n\n');

    const message = `Szanowni Państwo,\n\nW imieniu naszej firmy uprzejmie proszę o przedstawienie oferty cenowej na poniższe pozycje:\n\n${sections}\n\nProszę o przesłanie odpowiedzi z podaniem cen, terminów realizacji oraz warunków dostawy. W razie pytań pozostaję do dyspozycji.\n\nZ poważaniem,`;

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
      quantity: Number(item.quantity.toFixed(2)),
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
