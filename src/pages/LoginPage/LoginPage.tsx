import React, { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./LoginPage.module.scss";
import AuthInput from "../../UI/AuthInput/AuthInput";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { login } from "../../redux/slices/authSlice";

interface LoginPageProps { }

export const LoginPage: FC<LoginPageProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoginLoading, isLoginError } = useAppSelector((state) => state.authSlice);

  const [submitError, setSubmitError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSkipLogin = async () => {
    navigate("/app/shorten-table/table-view", { replace: true });
  }

  const handleLogin = async () => {
    if (submitError) {

      return;
    }

    console.log("login");
    await dispatch(login({ email, password })).then((res: any) => {
      if (!res.payload) {
        console.log("error");

        return;
      }

      console.log(`res`, res.payload);

      if (res.payload.isActivated === false) {
        console.log("user is not activated");

        navigate("/auth/verify", { replace: true });

        return;
      }

      if (res.payload) {
        console.log("user is activated and logged in");

        navigate("/app/shorten-table/table-view", { replace: true });
      }
    });
  };

  return (
    <>
      {isLoginError && <div className={s.login_page}>error</div>}
      {isLoginLoading ? (
        <div className={s.login_page}>...loading</div>
      ) : (
        <div className={s.login_page}>
          <h1 className={s.login_page__title}>Login to UrlShorty</h1>

          <div className={s.redirect_wrapper}>
            <div className={s.redirect}>
              <p className={s.redirect__text}>New user?</p>

              <NavLink to="/auth/register" className={s.redirect__link}>
                Create an account
              </NavLink>
            </div>
          </div>
          <form
            className={s.login_page__form}
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className={s.login_page__input_wrapper}>
              <AuthInput
                legend="Email"
                type="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                submitError={submitError}
                setSubmitError={setSubmitError}
              />
            </div>

            <div className={s.login_page__input_wrapper}>
              <AuthInput
                legend="Password"
                type="password"
                name="email"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                submitError={submitError}
                setSubmitError={setSubmitError}
              />
            </div>

            <div className={s.login_page__btn_wrapper}>
              <button type="submit" className={s.submit_btn}>
                Login
              </button>
            </div>
          </form>

          <div className={s.login_page__or_wrapper}>
            <div className={s.login_page__or}>
              <p className={s.login_page__or__legend}>or</p>
            </div>

            <div className={s.login_page__socials}>
              <button
                type="button"
                className={s.socials_btn}
                onClick={() => {
                  handleSkipLogin();
                }}
              >
                Continue without login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
