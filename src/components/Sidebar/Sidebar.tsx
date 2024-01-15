import { FC, useRef, useState } from 'react';
import s from './Sidebar.module.scss';
import classNames from 'classnames';
import { NavLink, useNavigate } from "react-router-dom";
import { LinksModal } from '../../UI/LinksModal';

import testAvatar from '../../images/avatar.svg';
import usersIcon from '../../images/black-users-logo.svg'
import signoutIcon from '../../images/sign-out-logo-black.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../redux/slices/authSlice';

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const navigate = useNavigate();
  const ignoreButtonRef = useRef<HTMLButtonElement>(null);

  const { isUserAuth } = useAppSelector((state) => state.authSlice);

  return (
    <div className={s.sidebar}>
      <div className={s.sidebar__functional}>
        <div className={s.sidebar__logo}>
          <div className={s.sidebar__logo_icon} />
        </div>

        <NavLink
          to="app/shorten-table/table-view"
          className={({ isActive, isPending }) =>
            classNames(s.sidebar__item,
              s.sidebar__table,
              isActive && s.sidebar__table__selected,
              isActive && s.sidebar__item__selected,
            )
          }
        />

        <div className={s.black_line} />

        <NavLink
          to="app/shorten-table/about"
          className={({ isActive, isPending }) =>
            classNames(s.sidebar__item,
              s.sidebar__about,
              isActive && s.sidebar__about__selected,
              isActive && s.sidebar__item__selected,
            )
          }
        />
      </div>

      <div className={s.sidebar__info__wrapper}>
        <button
          className={s.avatar}
          onClick={() => setIsLinksModalOpen(!isLinksModalOpen)}
          ref={ignoreButtonRef}
        >
          <img src={testAvatar} alt="avatar" />
        </button>

        {isLinksModalOpen && (
          <div className={s.links_modal_wrapper}>
            <LinksModal
              linksData={[
                {
                  text: 'Profile',
                  icon: usersIcon,
                  to: 'app/user-profile',
                },
                {
                  text: isUserAuth ? 'Sign Out' : 'Sign In',
                  icon: signoutIcon,
                  onClick: () => {
                    dispatch(logout())
                      .then(() => {
                        navigate('/auth/login', { replace: true });
                      });
                  },
                },
              ]}
              closeModal={() => setIsLinksModalOpen(false)}
              ignoreButtonRef={ignoreButtonRef}
              width={'175px'}
              outerPadding={'15px'}
              linkGap={'10px'}
            />
          </div>
        )}
      </div>
    </div >
  );
};

export default Sidebar;
