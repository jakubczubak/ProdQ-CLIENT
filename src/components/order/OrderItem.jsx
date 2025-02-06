//Importy zewnętrzne
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
//Importy lokalne
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

    return () => {
      setCartItems([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleIncrease = (itemList) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const increment = item.item.type === 'plate' || item.item.diameter === 0 ? 1 : 0.1;
        return item.name === itemList.name
          ? { ...item, quantity: item.quantity + increment }
          : item;
      })
    );
  };

  const handleDecrease = (itemList) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const decrement = item.item.type === 'plate' || item.item.diameter === 0 ? 1 : 0.1;
        return item.name === itemList.name && item.quantity > decrement
          ? { ...item, quantity: item.quantity - decrement }
          : item;
      })
    );
  };

  const handleRemove = (itemList) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.name !== itemList.name);
    });
  };

  const handleAutoMessage = () => {
    const greetings = ['Cześć!', 'Witaj!', 'Hej!', 'Dzień dobry!', 'Witam serdecznie!'];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    const itemsList = cartItems
      .map((item, index) => {
        const quantityLabel = item.item.diameter > 0 ? 'm.' : 'szt.';
        const quantityString = Number.isInteger(item.quantity)
          ? item.quantity.toString()
          : item.quantity.toFixed(1);
        return `${index + 1}. ${item.name} - ${quantityString} ${quantityLabel}`;
      })
      .join('\n');

    const farewells = [
      'Pozdrawiam,',
      'Życzę miłego dnia,',
      'Miłego dnia!',
      'Wesołego dnia,',
      'Do usłyszenia,',
      'Pozdrawiam serdecznie,'
    ];
    const randomFarewell = farewells[Math.floor(Math.random() * farewells.length)];

    const message = `${randomGreeting}\n\nProszę o ofertę na poniższe pozycje:\n\n${itemsList}\n\n${randomFarewell}`;

    reset(
      {
        ...watch(),
        supplierMessage: message
      },
      {}
    );
  };

  const handleGenerateEmail = () => {
    const mailtoLink = `mailto:${watch('supplierEmail')}?subject=${encodeURIComponent(
      `Zapytanie ofertowe - ${watch('name')}`
    )}&body=${encodeURIComponent(watch('supplierMessage'))}`;
    window.location.href = mailtoLink;
  };

  const accumulatedPrice = cartItems.reduce((acc, item) => {
    const itemQuantity = item.quantity || 0;
    const materialPrice = item.material ? item.material.price : item.item ? item.item.price : 0;
    const toolPrice = item.tool ? item.tool.price : item.item ? item.item.price : 0;
    return acc + materialPrice * itemQuantity + toolPrice * itemQuantity;
  }, 0);

  const handleSubmitForm = (data) => {
    const localDate = dayjs(data.selectedDate).locale('pl').format('DD/MM/YYYY');
    data.date = localDate;
    data.totalPrice = accumulatedPrice.toFixed(2);

    const orderItems = cartItems.map((item) => {
      const itemInfo = {
        name: item.name,
        quantity: item.quantity
      };
      if (item.item) {
        itemInfo.itemType = item.item.type;
        itemInfo.itemID = item.item.id;
      } else {
        itemInfo.tool = item.tool;
        itemInfo.material = item.material;
      }
      return itemInfo;
    });

    data.orderItems = orderItems;

    if (state) {
      const updatedOrder = { ...state, ...data };
      orderManager.updateOrder(updatedOrder, queryClient, dispatch, navigate);
    } else {
      orderManager.createOrder(data, queryClient, dispatch, navigate);
    }
  };

  return (
    <div>
      <BreadcrumbNavigation />
      <OrderHeader state={state} />
      <OrderForm
        suppliers={suppliers}
        existOrder={existOrder}
        accumulatedPrice={state ? state.totalPrice : accumulatedPrice}
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
