import React, { FC } from 'react';
import s from './ShortUrlsPage.module.scss';
import { InputBlock } from '../../components/InputBlock';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { LoadingPage } from '../LoadingPage';

interface ShortUrlsPageProps { }

export const ShortUrlsPage: FC<ShortUrlsPageProps> = () => {
  const { isTableLoading } = useAppSelector((state) => state.rootSlice);

  return (
    <>
      <InputBlock />

      {isTableLoading && (
        <div className={s.loading}>
          <LoadingPage />
        </div >
      )}
      {!isTableLoading && <Outlet />}
    </>
  );
};

export default ShortUrlsPage;
