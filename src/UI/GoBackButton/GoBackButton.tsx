import React, { FC } from 'react';
import s from './GoBackButton.module.scss';
import arrowLeft from '../../images/arrow-left-dimmed-icon.svg';
import { useNavigate } from 'react-router-dom';

interface GoBackButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  buttonSize?: number;
  iconSize?: number;
  preventGoBack?: boolean;
}

export const GoBackButton: FC<GoBackButtonProps> = ({
  onClick,
  disabled = false,
  buttonSize = 40,
  iconSize = 26,
  preventGoBack = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (!preventGoBack) {
      navigate(-1);
    }
  }

  return (
    <button
      className={s.go_back}
      style={{
        width: `${buttonSize}px`,
        height: `${buttonSize}px`,
      }}
      onClick={handleClick}
    >
      <img
        src={arrowLeft}
        alt="Go back"
        className={s.go_back__icon}
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
        }}
      />
    </button>
  )
}

export default GoBackButton;
