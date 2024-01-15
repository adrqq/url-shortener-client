import { FC, useState } from 'react';
import s from './ProfileBlock.module.scss';
import { GoBackButton } from '../../UI/GoBackButton';
import { AuthInput } from '../../UI/AuthInput';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUserProfile } from '../../redux/slices/userSlice';

interface ProfileBlockProps { }

export const ProfileBlock: FC<ProfileBlockProps> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authSlice.user);

  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  console.log(`User`, user);

  const [localUser, setLocalUser] = useState({
    Nickname: user.nickname || '',
  });

  // const handleSaveUserData = (e: React.FormEvent<HTMLFormElement>) => {
  //   dispatch(updateUserProfile({
  //     ...user,
  //     ...localUser,
  //   }));
  // }

  return (
    <div className={s.profile_block}>
      <div className={s.profile_block__header}>
        <GoBackButton />
        <h1 className={s.profile_block__header__title}>
          Profile
        </h1>
      </div>

      <div className={s.profile_block__user}>
        <div className={s.photo_upload}>
          <img
            src={userPhoto || 'https://via.placeholder.com/150'}
            alt=""
            className={s.photo_upload__img}
          />
          <input
            type="file"
            className={s.photo_upload__input}
            accept="image/*"
            onChange={(e) => {
              const reader = new FileReader();
              reader.onload = () => {
                setUserPhoto(reader.result as string);
              };
              reader.readAsDataURL(e.target.files![0]);
            }}
          />
        </div>

        <form className={s.profile_block__user__form}>
          <div className={s.profile_block__input_wrapper}>
            <AuthInput
              legend='Username'
              type='text'
              name='name'
              placeholder='Username'
              value={localUser.Nickname}
              onChange={(e) => setLocalUser({ ...localUser, Nickname: e.target.value })}
              required
            />
          </div>

          <button
            className={s.save_btn}
            type='submit'
          >
            <p className={s.save_btn__text}>
              Save
            </p>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfileBlock;
