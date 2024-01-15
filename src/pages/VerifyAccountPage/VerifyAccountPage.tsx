import React from "react";
import s from "./VerifyAccountPage.module.scss";
import { IButton } from "../../UI/IButton.tsx/IButton";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import AuthService from "../../services/AuthService";

export const VerifyAccountPage = () => {
  const { activationEmail } = useAppSelector((state) => state.authSlice);
  const [timer, setTimer] = React.useState(30);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const resendEmail = async () => {
    try {
      console.log(`activationEmail11`, activationEmail);

      const response = await AuthService.sandActivationMail(activationEmail);

      console.log(`response`, response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={s.verify_account_page}>
      <h1 className={s.verify_account_page__title}>
        Verify your email address
      </h1>

      <div className={s.black_row} />

      <p className={s.verify_account_page__text}>
        In order to start using your Coinbase account, you need to confirm your
        email address.
      </p>

      {timer <= 0 ? (
        <IButton text="Resend email" type="button" onClick={resendEmail} />
      ) : (
        <div className={s.activation__info__no_mail__timer}>{timer}</div>
      )}
    </div>
  );
};

export default VerifyAccountPage;
