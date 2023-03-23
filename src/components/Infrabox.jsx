import React from 'react';
import { Header } from './header/Header';
import { NavSidebar } from './navSidebar/NavSidebar';
import { Main } from './main/Main';
import { Notifications } from './common/Notifications';
import { useSelector, useDispatch } from 'react-redux';
import { setClose } from '../redux/actions/Action';

export const Infrabox = () => {
  const open = useSelector((state) => state.open);
  const severity = useSelector((state) => state.severity);
  const msg = useSelector((state) => state.msg);

  const dispatch = useDispatch();

  return (
    <div>
      <NavSidebar />
      <Header />
      <Main />
      <Notifications
        open={open}
        onClose={() => {
          dispatch(setClose());
        }}
        severity={severity}
        message={msg}
      />
    </div>
  );
};
