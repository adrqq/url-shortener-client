// ShortUrlInfoPage.jsx

import React, { FC } from 'react';
import s from './ShortUrlInfoPage.module.scss';
import { BASE_URL } from '../../http';
import { useLocation } from 'react-router-dom';

interface ShortUrlInfoPageProps { }

export const ShortUrlInfoPage: FC<ShortUrlInfoPageProps> = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const state = location.state;
  const id = params.get('id');
  const urlRecord = state?.urlRecord;
  const url = urlRecord?.url;
  const slug = urlRecord?.slug;
  const createdAt = urlRecord?.createdAt;
  const createdBy = urlRecord?.createdBy;
  const shortUrl = slug ? `${BASE_URL}/${slug}` : '';


  const handleDelete = () => {

  };

  return (
    <div className={s.infoContainer}>
      <h2>Shortened URL Information</h2>
      <table className={s.table}>
        <tbody>
          <tr>
            <th>Original URL:</th>
            <td>{url}</td>
          </tr>
          {slug && (
            <tr>
              <th>Slug:</th>
              <td>{slug}</td>
            </tr>
          )}
          <tr>
            <th>Created At:</th>
            <td>{createdAt}</td>
          </tr>
          <tr>
            <th>Created By:</th>
            <td>{createdBy}</td>
          </tr>
          {slug && (
            <tr>
              <th>Shortened URL:</th>
              <td>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button className={s.deleteButton} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default ShortUrlInfoPage;
