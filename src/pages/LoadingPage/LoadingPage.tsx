import React, { FC } from 'react';
import s from './LoadingPage.module.scss';

interface LoadingPageProps { }

export const LoadingPage: FC<LoadingPageProps> = () => (
  <div className={s.loading_page}>
    <div className={s.spinner}>
      <span className={s.spinner_inner_1}></span>
      <span className={s.spinner_inner_1}></span>
      <span className={s.spinner_inner_1}></span>
    </div>
  </div>
);
