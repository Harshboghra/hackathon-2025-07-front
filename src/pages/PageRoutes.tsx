import React, { useEffect, useState } from 'react';
import { LayoutProvider } from '../layout/ThemeLayout/context/layoutcontext';
import Layout from '../layout/ThemeLayout/layout';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LoginIndex from './Login/Index';
import DashboardIndex from './Dashboard';
import { ProtectedRoute } from '../utils/ProtectedRoute';
import { useAppDispatch, useAppSelector } from '../state/app.hooks';
import { authSelector, setRoleBaseMenu } from '../state/auth/auth.reducer';
import { Dialog } from 'primereact/dialog';
import CompanyIndex from './Company/Index';
import { Unauthorized } from '../globalPages/Unauthorize';
import { useLazyQuery } from '@apollo/client';
import { GET_COMPANY_HAS_USER_ROLE_WITH_PERMISSIONS } from '../service/graphql/queries';
import { ability, updateAbility } from '../library/ability/ability';
import { getMenuBasedPermission } from '../library/utilities/menuGenerators';
import UserProvider from '../contexts/user';
import { PERMISSION } from '../library/utilities/permission.constant';
import RoleIndex from './Role/Index';
import PermissionIndex from './Role/Permission/Index';
import LoadingComponent from '../globalPages/Unauthorize/LoadingComponent/LoadingComponent';
import SettingIndex from './Setting/SettingIndex';
import ProfileIndex from './Profile/Profile';
import CompanySettingIndex from './CompanySetting/Index';
import ResetPasswordPage from './ResetPassword/Index';
import { useTranslation } from 'react-i18next';
import { MenuModal } from '../types/layout';
import AccountSelectPage from './Login/AccountSelectPage';
import { LOGIN_TYPE } from '../library/utilities/constant';
import IntegrationIndex from './Integration/Index';
import IntegrationHasFlowHasLogsIndex from './IntegrationHasFlowHasLogs/Index';
import UserIndex from './User/Index';

const PageRoutes = () => {
  const { t } = useTranslation();
  const authState = useAppSelector(authSelector);
  const { pathname } = useLocation();
  const [getRoleAndPermissions] = useLazyQuery(
    GET_COMPANY_HAS_USER_ROLE_WITH_PERMISSIONS,
  );
  const [abilityUpdate, setAbilityUpdate] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      authState &&
      authState.isSetPermissions &&
      !authState.isLoginDialogOpen
    ) {
      getRoleAndPermissions().then((permissions: any) => {
        updateAbility(permissions.data.getRoleAndPermissions);
        setAbilityUpdate(true);
        const menu: MenuModal[] = getMenuBasedPermission();
        dispatch(setRoleBaseMenu(menu));
      });
    }
  }, [
    t,
    authState.isSetPermissions,
    authState.roleTypeCode,
    ability,
    authState.isLoginDialogOpen,
  ]);

  const isDialogVisible = () =>
    pathname !== '/login' &&
    pathname !== '/unauthorized' &&
    !pathname.includes('/reset-password') &&
    authState.isLoginDialogOpen &&
    !abilityUpdate;

  const publicRoutes = [
    { path: '/login', element: <LoginIndex /> },
    { path: '/reset-password/:token', element: <ResetPasswordPage /> },
    { path: '*', element: <Navigate to="/login" /> },
  ];

  const withPermission = (
    Component: React.FC,
    action: string,
    page: string,
  ): React.ReactElement => {
    return ability.can(action, page) ? (
      <Component />
    ) : (
      <Navigate to="/unauthorized" replace />
    );
  };

  const routesConfig = [
    { path: '/', element: <DashboardIndex /> },
    { path: '/home', element: <DashboardIndex /> },
    { path: '/profile', element: <ProfileIndex /> },
    { path: '/setting', element: <SettingIndex /> },
    { path: '/company-setting', element: <CompanySettingIndex /> },
    { path: '/integrations', element: <IntegrationIndex /> },
    {
      path: '/integration-log/:id',
      element: <IntegrationHasFlowHasLogsIndex />,
    },
    { path: '/user', element: <UserIndex /> },
    {
      path: '/role',
      element: withPermission(
        RoleIndex,
        PERMISSION.ACTION.VIEW,
        PERMISSION.PAGE.ROLES,
      ),
    },
    {
      path: '/role/:id',
      element: withPermission(
        PermissionIndex,
        PERMISSION.ACTION.UPDATE,
        PERMISSION.PAGE.ROLES,
      ),
    },
    {
      path: '/companies',
      element: withPermission(
        CompanyIndex,
        PERMISSION.ACTION.VIEW,
        PERMISSION.PAGE.COMPANIES,
      ),
    },
  ];

  return (
    <UserProvider>
      <LayoutProvider>
        <Routes>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route element={<ProtectedRoute />}>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/select" element={<AccountSelectPage />} />
            {authState.isSetPermissions && authState.roleBaseMenu && (
              <Route element={<Layout sideMenu={authState.roleBaseMenu} />}>
                {abilityUpdate ? (
                  <React.Fragment>
                    {routesConfig.map(({ path, element }, index) => (
                      <Route key={index} path={path} element={element} />
                    ))}

                    <Route path="*" element={<Navigate to="/" />} />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {!abilityUpdate && authState.isLogin && (
                      <React.Fragment>
                        <Route
                          path={pathname !== '/login' ? pathname : ''}
                          element={<LoadingComponent />}
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}
              </Route>
            )}
          </Route>
        </Routes>
        {pathname !== '/login' && (
          <Dialog
            appendTo="self"
            className="w-3 border-round-2xl"
            visible={isDialogVisible()}
            header={t('common.login.loginAccount')}
            modal
            onHide={() => {}}
          >
            <LoginIndex type={LOGIN_TYPE.RE_LOGIN} />
          </Dialog>
        )}
      </LayoutProvider>
    </UserProvider>
  );
};

export default PageRoutes;
