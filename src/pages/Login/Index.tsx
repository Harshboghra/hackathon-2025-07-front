import { useState } from 'react';
import LoginPage from './LoginPage';
import LoginForm from './_loginForm';
import { LOGIN_TYPE } from '../../library/utilities/constant';
import ForgotPasswordForm from './_forgotPasswordForm';
import { LoginValues } from './login.model';
import { authService } from '../../service/auth/auth.service';
import { useAppDispatch, useAppSelector } from '../../state/app.hooks';
import {
  authSelector,
  setCompanyHasUserIdSelected,
  setLoginDialogOpen,
  setLoginState,
  setPermissions,
  setRoleBaseMenu,
  setRoleTypeCode,
} from '../../state/auth/auth.reducer';
import { componentFilterService } from '../../service/componentFilter/componentFilter.service';
import { refetchQueries } from '../../service/graphql/graphql';
import {
  GET_COMPANY_HAS_USER_ROLE_WITH_PERMISSIONS,
  GET_CURRENT_USER,
} from '../../service/graphql/queries';
import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { updateAbility } from '../../library/ability/ability';
import { getMenuBasedPermission } from '../../library/utilities/menuGenerators';
import { MenuModal } from '../../types/layout';
import { setApiErrorsToForm } from '../../contexts/message';
import { useForm } from 'react-hook-form';
import { IAttributeObject } from '../../components/form/formInterface/forms.model';
import { useTranslation } from 'react-i18next';
import { changeLanguageAndFetchTranslations } from '../../i18n';
import { LocalStorageService } from '../Setting/SettingIndex';

const LoginIndex = ({ type = LOGIN_TYPE.FRESH_LOGIN }: { type?: string }) => {
  const { t } = useTranslation();
  const authState = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm();
  const [getRoleAndPermissions] = useLazyQuery(
    GET_COMPANY_HAS_USER_ROLE_WITH_PERMISSIONS,
  );
  const [getCurrentUser] = useLazyQuery(GET_CURRENT_USER);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const login_attributes: IAttributeObject = {
    username: {
      label: 'Username',
      rules: {},
      placeholder: t('common.login.userName'),
    },
    password: {
      label: 'Password',
      placeholder: t('common.login.password'),
      rules: {
        type: 'password',
      },
    },
  };

  const handleLoginSubmit = (values: LoginValues) => {
    onFormSubmit(values).catch((err) => {
      setApiErrorsToForm(err?.response, methods);
    });
  };

  const onFormSubmit = (values: LoginValues) => {
    if (type === LOGIN_TYPE.RE_LOGIN) {
      values = { ...values, companyHasUserId: authState.companyHasUserId };
    }
    return authService.login(values).then((res) => {
      componentFilterService.clearCurrentFilter();
      dispatch(setLoginState(res));
      dispatch(setLoginDialogOpen(false));

      if (type === LOGIN_TYPE.RE_LOGIN) {
        refetchQueriesAfterReLogin();
      }
      if (res && type !== LOGIN_TYPE.RE_LOGIN) {
        afterLogin();
      } else if (
        type === LOGIN_TYPE.RE_LOGIN &&
        res.companyHasUserId !== authState.companyHasUserId
      ) {
        dispatch(setCompanyHasUserIdSelected(false));
        afterLogin();
      }
    });
  };

  const refetchQueriesAfterReLogin = () => {
    refetchQueries();
  };

  const afterLogin = () => {
    getCurrentUser().then((res) => {
      if (res.error) {
        navigate('/login');
      } else {
        getRoleAndPermissions()
          .then((permissions: any) => {
            dispatch(
              setRoleTypeCode(
                permissions.data.getRoleAndPermissions[0].role.role_type.code,
              ),
            );
            updateAbility(permissions.data.getRoleAndPermissions);
            dispatch(setPermissions(true));
            const menu: MenuModal[] = getMenuBasedPermission();
            dispatch(setRoleBaseMenu(menu));
            type === 're-login' && navigate('/');
          })
          .catch(() => {
            dispatch(setPermissions(false));
            navigate('/login');
          })
          .finally(() => {
            changeLanguageAndFetchTranslations(
              res.data.getCurrentUser.language,
            );
            LocalStorageService.setLanguage(res.data.getCurrentUser.language);
            if (res.data.getCurrentUser.company_has_users.length > 1) {
              navigate('/select');
            } else {
              dispatch(setCompanyHasUserIdSelected(true));
              type !== 're-login' && dispatch(setPermissions(true));
              navigate('/');
            }
          });
      }
    });
  };

  const loginModel = () => {
    return (
      <LoginForm
        type={type}
        login_attributes={login_attributes}
        onSubmit={handleLoginSubmit}
      />
    );
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsForgotPassword(true);
  };
  const renderForgotPasswordForm = () => {
    return (
      <div className="w-full lg:w-4 h-full text-center px-6 py-6 flex flex-column justify-content-between">
        <div className="h-4rem mt-4" />
        <div className="flex flex-column align-items-center gap-4">
          <div className="mb-3">
            <h2>{t('common.login.forgotPassword')}</h2>
            <p>{t('common.resetPassword.resetPasswordText')}</p>
          </div>

          <span className="p-input-icon-left w-full md:w-25rem">
            <ForgotPasswordForm setIsForgotPassword={setIsForgotPassword} />
          </span>
        </div>

        <p className="text-color-secondary font-semibold">
          {t('common.login.problemText')}{' '}
          <a className="text-primary hover:underline cursor-pointer font-medium">
            {t('common.login.clickHere')}
          </a>{' '}
          {t('common.login.helpYouText')}
        </p>
      </div>
    );
  };

  const mainLoginPage = () => {
    return (
      <LoginPage
        login_attributes={login_attributes}
        onSubmit={handleLoginSubmit}
        handelForgotPassword={handleForgotPasswordClick}
      />
    );
  };

  return (
    <>
      {type === LOGIN_TYPE.RE_LOGIN ? (
        loginModel()
      ) : (
        <div className="flex h-screen">
          {/* Login Page */}
          {isForgotPassword ? renderForgotPasswordForm() : mainLoginPage()}

          {/* Side Content - Login Page */}
          <div
            className="w-8 hidden lg:flex flex-column justify-content-between align-items-center px-6 py-6 bg-cover bg-norepeat"
            style={{ backgroundImage: "url('/images/auth/bg-login.jpg')" }}
          >
            <div className="mt-auto mb-auto">
              <span className="block text-white text-7xl font-semibold">
                {t('common.login.loginPageTitle')}
              </span>
              <span className="block text-white text-2xl mt-2">
                {t('common.login.loginPageSubTitle')}
              </span>
            </div>
            <div className="flex align-items-center gap-5">
              <i className="pi pi-github text-3xl p-1 surface-overlay border-circle cursor-pointer"></i>
              <i className="pi pi-twitter text-3xl p-1 surface-overlay border-circle cursor-pointer"></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginIndex;
