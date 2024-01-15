import React, { FC, useState } from 'react';
import s from './InputBlock.module.scss';
import { AuthInput } from '../../UI/AuthInput';
import { BASE_URL } from '../../http';
import UrlService from '../../services/UrlService';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ShortUrlModel } from '../../models/response/ShortUrlModel';
import { setIsTaleLoading, setShortenedUrls } from '../../redux/slices/rootSlice';

interface InputBlockProps { }

export const InputBlock: FC<InputBlockProps> = () => {
  const dispatch = useAppDispatch();
  const { isUserAuth } = useAppSelector((state) => state.authSlice);

  const [originalUrl, setOriginalUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isError, setIsError] = useState(false);

  const user = useAppSelector((state) => state.authSlice.user);

  const reSetUrls = async () => {
    try {
      const res = await UrlService.getAllRecords();
      dispatch(setShortenedUrls(res.data as ShortUrlModel[]));
    } catch (e) {
      console.log(`e`, e);
    }
  }

  const handleShorten = async () => {
    console.log(`user`, user.nickname)

    if (!originalUrl) {
      return;
    }

    if (isUserAuth) {
      dispatch(setIsTaleLoading(true));

      try {
        const res = await UrlService.createUrl(originalUrl, slug, user.nickname);

        if (res.data === 'Record on this url or slug already exists') {
          dispatch(setIsTaleLoading(false));

          setIsError(true);

          return;
        }

        setShortenedUrl(`${BASE_URL}/${res.data}`);

        reSetUrls();

        dispatch(setIsTaleLoading(false));

        setIsError(false);
      } catch (e) {
        dispatch(setIsTaleLoading(false));

        setIsError(true);

        console.log(`e`, e);
      }
    } else {
      try {
        const res = await UrlService.createUrl(originalUrl, slug, '');
        setShortenedUrl(`${BASE_URL}/${res.data}`);

        setIsError(false);
      } catch (e) {
        console.log(`e`, e);
      }
    }
  };

  return (
    <div className={s.shortener_container}>
      <h1>URL Shortener</h1>
      <div className={s.input_container}>
        <AuthInput
          legend="Enter a URL to shorten"
          type="url"
          name="url"
          placeholder="https://www.google.com/"
          value={originalUrl}
          onChange={(e: any) => setOriginalUrl(e.target.value)}
          required={true}
        />
      </div>
      <div className={s.input_container}>
        <AuthInput
          legend="Enter a custom slug (optional)"
          type="url"
          name="url"
          placeholder="poshuk"
          value={slug}
          onChange={(e: any) => setSlug(e.target.value)}
        />
      </div>

      <button
        onClick={handleShorten}
        className={s.input}
      >
        Shorten
      </button>

      {isUserAuth && (
        <button
          onClick={handleShorten}
          className={`${s.input} ${s.input__new_record}`}
        >
          New record
        </button>
      )}

      {shortenedUrl && (
        <div className={s.result_container}>
          <p>Shortened URL:</p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}

      {isError && (
        <div className={s.error_container}>
          <p>Record already exists</p>
        </div>
      )}
    </div>
  );
}

export default InputBlock;
