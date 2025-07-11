import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user';
import { t } from 'i18next';
import AppButton from '../../components/button/AppButton';
import { BUTTON_TYPE } from '../../library/utilities/constant';

export const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div className="flex justify-content-center align-items-center h-screen text-center ">
      <div className="w-8">
        <h1 className="mb-5 text-6xl">{`401 - ${t(
          'common.error.unauthorized',
        )}`}</h1>
        <p className="text-xl">{t('common.messages.role')}</p>
        {user?.company_has_users?.length > 1 ? (
          <div className="mt-5">
            <AppButton
              type={BUTTON_TYPE.PRIMARY}
              label={t('components.button.name.backToPage')}
              onClick={() => {
                navigate('/login');
              }}
            />
          </div>
        ) : (
          <div className="mt-5">
            <AppButton
              type={BUTTON_TYPE.PRIMARY}
              label={t('components.button.name.backToPage')}
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
