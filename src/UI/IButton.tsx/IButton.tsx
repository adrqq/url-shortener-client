import React from 'react';
import s from './IButton.module.scss';

interface IButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

export const IButton: React.FC<IButtonProps> = ({
  text,
  type = 'button',
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={s.button}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}