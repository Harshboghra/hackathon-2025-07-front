import { useContext } from 'react';
import { UserContext } from '../../contexts/user';
import UserUpdate from '../User/UserUpdate';
import { useTranslation } from 'react-i18next';
import { USE_USER_FORM } from '../../library/utilities/constant';

const ProfileIndex = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  return (
    <div className="card">
      <h5>{t('components.myProfile.header')}</h5>
      {user && <UserUpdate data={user} useFor={USE_USER_FORM.MY_PROFILE} />}
    </div>
  );
};
export default ProfileIndex;
