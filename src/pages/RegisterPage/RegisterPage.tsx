import { FC, useState } from "react";
import s from "./RegisterPage.module.scss";

import AuthInput from "../../UI/AuthInput/AuthInput";

import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { register } from "../../redux/slices/authSlice";
import { IButton } from "../../UI/IButton.tsx/IButton";

interface RegisterPageProps { }

export const RegisterPage: FC<RegisterPageProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isRegisterLoading, isRegisterError } = useAppSelector(
    (state) => state.authSlice
  );

  const [submitError, setSubmitError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [adminCredentials, setAdminCredentials] = useState('');

  const handleRegister = async () => {
    if (submitError) {
      return;
    }

    await dispatch(
      register({
        email,
        password,
        nickname,
        adminCredentials,
      })
    ).then((res: any) => {
      if (!res.payload) {
        console.log("error");

        return;
      }

      console.log(`res`, res.payload);

      navigate("/auth/verify", { replace: true });
    });
  };

  const handleSkipLogin = async () => {
    navigate("/app/shorten-table/table-view", { replace: true });
  }

  return (
    <>
      {isRegisterError && <div className={s.register_page}>error</div>}
      {isRegisterLoading ? (
        <div className={s.register_page}>...loading</div>
      ) : (
        <div className={s.register_page}>
          <h1 className={s.register_page__title}>Get started with UrlShorty</h1>

          <div className={s.redirect_wrapper}>
            <div className={s.redirect}>
              <p className={s.redirect__text}>Already have an account?</p>

              <NavLink to="/auth/login" className={s.redirect__link}>
                Sign in
              </NavLink>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className={s.register_page__form}
          >
            <div className={s.register_page__input_wrapper}>
              <AuthInput
                legend="admin credentials (optional)"
                type="text"
                name="text"
                placeholder="Enter admin credentials default: GTRR34"
                value={adminCredentials}
                onChange={(e) => setAdminCredentials(e.target.value)}
                required={false}
                submitError={submitError}
                setSubmitError={setSubmitError}
              />
            </div>

            <div className={s.register_page__input_wrapper}>
              <AuthInput
                legend="nickname"
                type="text"
                name="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required={true}
                submitError={submitError}
                setSubmitError={setSubmitError}
              />
            </div>

            <div className={s.register_page__input_wrapper}>
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

            <div className={s.register_page__input_wrapper}>
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

            <div className={s.register_page__forgot_pass_wrapper}>
              <NavLink
                to="/forgot-password"
                className={s.forgot_pass}
              >
                Forgot password?
              </NavLink>
            </div>

            <div className={s.register_page__btn_wrapper}>
              <IButton text="Register" type="submit" />
            </div>
          </form>

          <div className={s.register_page__or_wrapper}>
            <div className={s.register_page__or}>
              <p className={s.register_page__or__legend}>or</p>
            </div>

            <div className={s.register_page__socials}>
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

export default RegisterPage;
