// AboutPage.jsx

import React, { FC, useEffect, useState } from 'react';
import s from './AboutPage.module.scss';
import { useAppSelector } from '../../hooks/redux';
import UrlService from '../../services/UrlService';

interface AboutPageProps { }

export const AboutPage: FC<AboutPageProps> = () => {
  const { isUserAuth, user } = useAppSelector((state) => state.authSlice);
  const [aboutText, setAboutText] = useState<string>('');
  const [initialAboutText, setInitialAboutText] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    fetchAboutText();
  }, []);

  const fetchAboutText = async () => {
    try {
      const res = await UrlService.fetchAboutText();
      setAboutText(res.data);
      setInitialAboutText(res.data);
    } catch (e) {
      console.log(`e`, e);
    }
  };

  const handleSave = async () => {
    try {
      await UrlService.saveAboutText(aboutText)
        .then((res) => {
          if (res.status === 200) {
            setSaveSuccess(true);
            setTimeout(() => {
              setSaveSuccess(false);
            }, 2000);
          }
        })
    } catch (e) {
      console.log(`e`, e);
    }
  };

  const handleCancel = () => {
    setAboutText(initialAboutText);
  }

  return (
    <div className={s['about-container']}>
      <h2 className={s['about-title']}>How it works</h2>
      <div className={s['about-input']}>
        <textarea
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          disabled={!user.isAdmin}
        />
      </div>

      {!saveSuccess && (
        <button
          className={s['edit-button']}
          onClick={handleSave}
          disabled={!user.isAdmin}
        >
          Save
        </button>
      )}

      {saveSuccess && (
        <button
          className={s['edit-button']}
          style={{ backgroundColor: 'green' }}
          disabled={true}
        >
          {`Done <3`}
        </button>
      )}

      <button
        className={s['edit-button-cancel']}
        onClick={handleCancel}
        disabled={!user.isAdmin}
      >
        Cancel
      </button>
    </div>
  );
};

export default AboutPage;
