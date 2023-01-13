import React from 'react';
import { Header } from './header/Header';
import { NavSidebar } from './navSidebar/NavSidebar';
import { Main } from './main/Main';

export const Infrabox = () => {
  return (
    <div>
      <NavSidebar />
      <Header />
      <Main />
    </div>
  );
};
