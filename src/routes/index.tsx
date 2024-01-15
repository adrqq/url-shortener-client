import { Suspense, lazy, FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { LoadingPage } from '../pages/LoadingPage';
import { useAppSelector } from '../hooks/redux';

const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Component {...props} />
    </Suspense>
  );
};

export const Router: FC = () => {
  const routes = useRoutes([
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'verify', element: <VerifyAccountPage /> },
      ],
    },
    // {
    //   path: '/',
    //   element: (isUserAuth) ? (
    //     <Navigate to="/app/chats" />
    //   ) : (
    //     <Navigate to="/auth/login" />
    //   ),
    // },
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: 'app/shorten-table',
          element: <ShortUrlsPage />,
        },
        {
          path: 'app/user-profile',
          element: <ProfilePage />,
        },
        {
          path: '/',
          element: <ShortUrlsPage />,
          children: [
            {
              path: 'app/shorten-table/table-view',
              element: <TableView />,
            },
            {
              path: 'app/shorten-table/info-view/:id',
              element: <ShortUrlInfoPage />,
            },
            {
              path: 'app/shorten-table/about',
              element: <AboutPage />,
            },
          ],
        }
      ],
    },
  ]);

  return routes;
};

const DefaultLayout = Loadable(
  lazy(() => import('../layouts/DefaultLayout/DefaultLayout'))
);

const ShortUrlInfoPage = Loadable(
  lazy(() => import('../pages/ShortUrlInfoPage/ShortUrlInfoPage'))
);

const TableView = Loadable(
  lazy(() => import('../components/TableView/TableView'))
);

const AuthLayout = Loadable(
  lazy(() => import('../layouts/AuthLayout/AuthLayout'))
);

const ShortUrlsPage = Loadable(
  lazy(() => import('../pages/ShortUrlsPage/ShortUrlsPage'))
);

const AboutPage = Loadable(lazy(() => import('../pages/AboutPage/AboutPage')));

const ProfilePage = Loadable(lazy(() => import('../pages/ProfilePage/ProfilePage')));
const LoginPage = Loadable(lazy(() => import('../pages/LoginPage/LoginPage')));
const RegisterPage = Loadable(
  lazy(() => import('../pages/RegisterPage/RegisterPage'))
);
const VerifyAccountPage = Loadable(
  lazy(() => import('../pages/VerifyAccountPage/VerifyAccountPage'))
);
