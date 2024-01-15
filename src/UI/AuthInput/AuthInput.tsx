import React, { FC, useEffect, useRef, useState } from 'react';
import s from './AuthInput.module.scss';

import eyeOpen from '../../images/pass-eye-open.svg';
import eyeClosed from '../../images/pass-eye-closed.svg';
import classNames from 'classnames';

interface AuthInputProps {
  legend: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  errorMessage?: string;
  submitError?: boolean;
  setSubmitError?: (value: boolean) => void;
  isTextArea?: boolean;
  disabled?: boolean;
  isHover?: boolean;
}

export const AuthInput: FC<AuthInputProps> = ({
  legend,
  type,
  name,
  placeholder,
  value = '',
  onChange = () => { },
  required = false,
  submitError = false,
  setSubmitError = () => { },
  isTextArea = false,
  disabled = false,
  isHover = true
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      console.log('initial render');
      return;
    }

    if (value && value.trim().length === 0 && required) {
      setErrorMessage('This field is required');

      setSubmitError(true);
    } else {
      setErrorMessage('');
      setSubmitError(false);
    }

    if (type === 'email' && !value.includes('@') && value.trim().length > 0) {
      setErrorMessage('Invalid email');

      setSubmitError(true);
    } else if (type === 'email' && value.includes('@')) {
      setErrorMessage('');
      setSubmitError(false);
    }
  }, [value, required, setSubmitError, type]);

  return (
    <div className={s.auth_input_wrapper}>
      <fieldset
        className={classNames(
          s.auth_input,
          { [s.auth_input__hover]: isHover },
          { [s.auth_input__error]: submitError }
        )}
      >
        <legend className={s.auth_input__legend}>
          {legend}
        </legend>

        {isTextArea ? (
          <textarea
            className={s.auth_input__textarea}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        ) : (
          <input
            className={s.auth_input__input}
            type={type === 'password' && isPasswordVisible ? 'text' : type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        )}

        {type === 'password' && (
          <div className={s.pass_visibility_eye_wrapper}>
            <button
              type='button'
              className={s.pass_visibility_eye}
            >
              <img
                src={isPasswordVisible ? eyeOpen : eyeClosed}
                alt="pass-visibility-eye"
                className={s.pass_visibility_eye__ico}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            </button>
          </div>
        )}
      </fieldset>

      {submitError && (
        <p className={s.auth_input__error}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default AuthInput;
