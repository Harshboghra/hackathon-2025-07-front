import { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../../contexts/user';
import { ICompanyHasUser } from '../CompanyHasUser/CompanyHasUser.model';
import AppButton from '../../components/button/AppButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../state/app.hooks';
import {
  logOut,
  setCompanyHasUserId,
  setCompanyHasUserIdSelected,
  setLoginState,
  setPermissions,
  setRoleBaseMenu,
  setRoleTypeCode,
} from '../../state/auth/auth.reducer';
import { useLazyQuery } from '@apollo/client';
import { GET_COMPANY_HAS_USER_ROLE_WITH_PERMISSIONS } from '../../service/graphql/queries';
import { updateAbility } from '../../library/ability/ability';
import { authService } from '../../service/auth/auth.service';
import { getMenuBasedPermission } from '../../library/utilities/menuGenerators';
import { ContactInformation, MenuModal } from '../../types/layout';
import { useTranslation } from 'react-i18next';
import { client } from '../../service/graphql/graphql';
import { componentFilterService } from '../../service/componentFilter/componentFilter.service';
import { contactInformationService } from '../../service/contactInformation/contactInformation.service';
import AccountItem from '../../components/accountItem/AccountItem';
import { BUTTON_TYPE } from '../../library/utilities/constant';
const AccountSelectPage = () => {
  const user = useContext(UserContext);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [contactInformation, setContactInformation] = useState(
    {} as ContactInformation,
  );

  const [getRoleAndPermissions] = useLazyQuery(
    GET_COMPANY_HAS_USER_ROLE_WITH_PERMISSIONS,
  );
  const { t } = useTranslation();

  useEffect(() => {
    contactInformationService.getContactInformation().then((info) => {
      if (info) setContactInformation(info as ContactInformation);
    });
  }, []);

  const activeCompanyHasUsers = useMemo(() => {
    if (user.user && user.user.company_has_users.length > 0) {
      return user.user.company_has_users.filter(
        (companyHasUser: ICompanyHasUser) =>
          companyHasUser.active && companyHasUser.company.active,
      );
    }
    return null;
  }, [user]);

  const handleContinue = () => {
    if (!selectedId) return;
    dispatch(setCompanyHasUserId(selectedId));
    authService
      .assignCompanyHasUserId({
        user_id: user.user.id,
        company_has_user_id: Number(selectedId),
      })
      .then((res) => {
        dispatch(setLoginState(res));

        getRoleAndPermissions()
          .then((permissions) => {
            if (permissions.data.getRoleAndPermissions.length === 0) return;
            dispatch(
              setRoleTypeCode(
                permissions.data.getRoleAndPermissions[0].role.role_type.code,
              ),
            );
            dispatch(setPermissions(true));
            updateAbility(permissions.data.getRoleAndPermissions);
            const menuItems: MenuModal[] = getMenuBasedPermission();
            dispatch(setRoleBaseMenu(menuItems));
          })
          .catch(() => {
            dispatch(setPermissions(false));
            navigate('/login');
          })
          .finally(() => {
            dispatch(setCompanyHasUserIdSelected(true));
            navigate('/home');
          });
      });
  };

  const handleLogOut = () => {
    dispatch(logOut());
    client.clearStore();
    componentFilterService.clearCurrentFilter();
    localStorage.clear();
    setTimeout(() => {
      navigate('/login');
    });
  };

  return (
    <div
      className="users flex align-items-center justify-content-center"
      style={{ height: '95vh' }}
    >
      <div>
        <div className="w-full mt-3 text-center">
          <Link to="/" className="layout-topbar-logo">
            <img src="/images/logo/logo.png" alt="logo" className="w-9rem" />
          </Link>
        </div>
        <div
          className="grid justify-content-center bg-white m-5 p-5 border-round border-1 border-primary"
          style={{ maxWidth: '500px' }}
        >
          <div className="col-12 mt-3">
            <h3>{t('components.selectAccount.selectCompany')}</h3>
          </div>
          {activeCompanyHasUsers?.map((value: ICompanyHasUser) => {
            return (
              <AccountItem
                key={value.id}
                name={value.company?.name || ''}
                isSelected={value.id === selectedId}
                onChange={() => setSelectedId(value.id)}
              />
            );
          })}
          {selectedId && (
            <div className="col-12 text-center h-3rem w-8rem mb-4">
              <AppButton
                type={BUTTON_TYPE.PRIMARY}
                className="w-full"
                label={t('components.button.name.continue')}
                onClick={handleContinue}
              />
            </div>
          )}

          <div className="col-12 mt-5">
            <p className="text-muted font-bold">
              {t('components.selectAccount.helpTextTitle')}
            </p>
            <p className="text-muted">
              {t('components.selectAccount.helpTextDescription')}
            </p>
          </div>

          <div className="col-12 my-3">
            {
              <AppButton
                type={BUTTON_TYPE.SECONDARY}
                label={t('components.button.name.logout')}
                onClick={handleLogOut}
              />
            }
          </div>
          <div className="col-5 ml-auto">
            <h5 className="mb-0">{t('common.contactInformation.support')}</h5>
            <p>{contactInformation.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSelectPage;
