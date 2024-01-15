import React, { FC, useEffect, useRef, useState } from 'react';
import s from './TableView.module.scss';
import UrlService from '../../services/UrlService';
import { ShortUrlModel } from '../../models/response/ShortUrlModel';
import { BASE_URL } from '../../http';
import { useNavigate } from 'react-router-dom';
import { setIsTaleLoading, setShortenedUrls } from '../../redux/slices/rootSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface TableViewProps { }

export const TableView: FC<TableViewProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { shortenedUrls } = useAppSelector((state) => state.rootSlice);

  useEffect(() => {
    dispatch(setIsTaleLoading(true));

    UrlService.getAllRecords()
      .then((res) => {
        if (!res) {
          return;
        }

        console.log(`res`, res.data);

        dispatch(setShortenedUrls(res.data as ShortUrlModel[]));
      })
      .catch((err) => {
        dispatch(setIsTaleLoading(false));
        console.log(`err`, err);
      });

    dispatch(setIsTaleLoading(false));
  }, []);

  const handleCheckFullInfo = (e: any, urlRecord: ShortUrlModel) => {
    console.log(`e`, e.target);

    navigate(`/app/shorten-table/info-view/${urlRecord.id}`, {
      state: {
        urlRecord,
      },
    });
  };

  return (
    <div className={s.resultContainer}>
      <h2>Shortened URL Records</h2>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Shortened URL</th>
          </tr>
        </thead>
        <tbody>
          {shortenedUrls.map((urlRecord, index) => (
            <tr key={index} onClick={(e) => {
              e.stopPropagation();

              handleCheckFullInfo(e, urlRecord);
            }}>
              <td>{urlRecord.url}</td>
              <td>
                <a href={`${BASE_URL}/${urlRecord.slug}`} target="_blank" rel="noopener noreferrer" onClick={(e) => {
                  e.stopPropagation();
                }}>
                  {`${BASE_URL}/${urlRecord.slug}`}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;
