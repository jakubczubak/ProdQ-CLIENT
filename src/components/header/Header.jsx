import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Badge, Avatar, Tooltip } from '@mui/material';
import { Cart } from '../cart/Cart';
import { ProductionCart } from '../productionCart/ProductionCart';
import { Notification } from '../notification/Notification';
import { useSelector } from 'react-redux';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { userManager } from '../settings/service/userManager';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { setNotificationQuantity } from '../../redux/actions/Action';
import { useDispatch } from 'react-redux';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';

export const Header = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery(['userData'], () => userManager.getUserData(), {
    refetchInterval: 10000 // Ustawienie interwału na 60000 milisekund (10 sekund)
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductionCartOpen, setIsProductionCartOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const boxQuantity = useSelector((state) => state.boxQuantity);
  const productionCartQuantity = useSelector((state) => state.productionBoxQuantity);
  const notificationQuantity = useSelector((state) => state.notificationQuantity);

  useEffect(() => {
    if (data) {
      dispatch(
        setNotificationQuantity(
          data.notifications.filter((notification) => notification.read == false).length
        )
      );
    }
  }, [data, dispatch]);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleProductionCartClick = () => {
    setIsProductionCartOpen(!isProductionCartOpen);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleCloseProductionCart = () => {
    setIsProductionCartOpen(false);
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message="Failed to fetch user data. Check conosole for more info." />;
  }

  return (
    <div className={styles.header_container}>
      <div>
        <Tooltip title="Production summary">
          <Badge
            color="info"
            badgeContent={productionCartQuantity}
            className={styles.icon}
            onClick={handleProductionCartClick}
          >
            <SummarizeOutlinedIcon />
          </Badge>
        </Tooltip>
        <Tooltip title="Contents of the box">
          <Badge
            color="info"
            badgeContent={boxQuantity ? boxQuantity.toFixed(1) : boxQuantity}
            className={styles.icon}
            onClick={handleCartClick}
          >
            <LocalMallOutlinedIcon />
          </Badge>
        </Tooltip>
        {isCartOpen && <Cart onClose={handleCloseCart} boxQuantity={boxQuantity} />}
        {isProductionCartOpen && (
          <ProductionCart
            onClose={handleCloseProductionCart}
            productionCartQuantity={productionCartQuantity}
          />
        )}
      </div>

      {data && (
        <>
          <div>
            <Tooltip title="Notifications">
              <Badge
                color="info"
                badgeContent={
                  notificationQuantity == -1
                    ? data.notifications.filter((notification) => notification.isRead == false)
                        .length
                    : notificationQuantity
                }
                className={styles.icon}
                onClick={handleNotificationClick}
              >
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </Tooltip>
            {isNotificationOpen && <Notification onClose={handleCloseNotification} data={data} />}
          </div>
          <Tooltip title={data.firstName + ' ' + data.lastName}>
            <Avatar className={styles.icon}>{data.firstName[0] + data.lastName[0]}</Avatar>
          </Tooltip>
        </>
      )}
    </div>
  );
};
