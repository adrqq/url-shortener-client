import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { GeneralGrid } from '../../components/GeneralGrid';

export const DefaultLayout: FC = () => {

  return (
    <>
      <GeneralGrid>
        <Sidebar />
        <Outlet />
      </GeneralGrid>
    </>
  );
}

export default DefaultLayout;
