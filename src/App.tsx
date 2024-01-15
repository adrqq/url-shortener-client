import { ReactElement, useEffect } from "react";
import { Router } from "./routes";
import "./App.module.scss";
import { useAppDispatch } from "./hooks/redux";
import { checkAuth } from "./redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function App(): ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (localStorage.getItem('token')) {
        console.log('check auth');

        await dispatch(checkAuth()).then((res: any) => {
          if (typeof res === 'string') {
            navigate('/auth/verify', { replace: true });

            return;
          }

          if (res) {
            navigate('/app/shorten-table/table-view', { replace: true });
          }
        });
      }
    }

    checkAuthStatus();
  }, []);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
