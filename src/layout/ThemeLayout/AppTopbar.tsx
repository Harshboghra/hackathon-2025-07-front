import React, {
  forwardRef,
  useImperativeHandle,
  useContext,
  useRef,
  useMemo,
} from 'react';
import AppBreadCrumb from './AppBreadCrumb';
import { LayoutContext } from './context/layoutcontext';
import AppSidebar from './AppSidebar';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import {
  logOut,
  setCompanyHasUserIdSelected,
} from '../../state/auth/auth.reducer';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../state/app.hooks';
import { client } from '../../service/graphql/graphql';
import { PERMISSION } from '../../library/utilities/permission.constant';
import { UserContext } from '../../contexts/user';
import { useTranslation } from 'react-i18next';
import { MenuModal } from '../types/layout';
import { ICompanyHasUser } from '../../pages/CompanyHasUser/CompanyHasUser.model';
import { ability } from '../../library/ability/ability';

const AppTopBar = forwardRef(
  (
    props: {
      sidebarRef: React.RefObject<HTMLDivElement>;
      sideMenu: MenuModal[];
    },
    ref,
  ) => {
    const btnRef2 = useRef(null);
    const menubuttonRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { onMenuToggle } = useContext(LayoutContext);
    const { user } = useContext(UserContext);
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      menubutton: menubuttonRef.current,
    }));

    const handleLogOut = () => {
      dispatch(logOut());
      client.clearStore();
      localStorage.clear();
      setTimeout(() => {
        navigate('/login');
      });
    };

    const companyName = useMemo(() => {
      if (user && user.company_has_users.length > 1 && user.companyHasUserId) {
        const selectedCompanyHasUser: any = user.company_has_users.find(
          (company_has_user: ICompanyHasUser) =>
            company_has_user?.id === user.companyHasUserId,
        );
        if (selectedCompanyHasUser?.company?.name)
          return selectedCompanyHasUser.company.name;
      }
      return '';
    }, [user]);

    const handleCompanyChange = () => {
      dispatch(setCompanyHasUserIdSelected(false));
      navigate('/select');
    };

    const profileMenuItems = [
      {
        label: t('topMenu.myProfile.profile'),
        icon: 'pi-user',
        onClick: () => navigate('/profile'),
      },
      {
        label: t('topMenu.myProfile.role'),
        icon: 'pi-lock',
        onClick: () => navigate('/role'),
        condition: ability.can(PERMISSION.ACTION.VIEW, PERMISSION.PAGE.ROLES),
      },
      {
        label: t('topMenu.myProfile.setting'),
        icon: 'pi-language',
        onClick: () => navigate('/setting'),
      },
      {
        label: t('topMenu.myProfile.companySetting'),
        icon: 'pi-cog',
        onClick: () => navigate('/company-setting'),
      },
      {
        label: t('topMenu.myProfile.logout'),
        icon: 'pi-power-off',
        onClick: handleLogOut,
      },
    ];

    const renderProfileMenuItems = () =>
      profileMenuItems
        .filter((item) => item.condition !== false)
        .map((item) => (
          <li key={item.label}>
            <a
              className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer"
              onClick={item.onClick}
            >
              <i className={`pi ${item.icon} mr-3`}></i>
              <span className="flex flex-column font-semibold">
                {item.label}
              </span>
              <Ripple />
            </a>
          </li>
        ));

    return (
      <div className="layout-topbar">
        <div className="topbar-left">
          <button
            ref={menubuttonRef}
            type="button"
            className="menu-button p-link"
            onClick={onMenuToggle}
          >
            <i className="pi pi-chevron-left"></i>
          </button>

          <span className="topbar-separator"></span>
          <AppBreadCrumb />
        </div>
        <div className="layout-topbar-menu-section">
          <AppSidebar sidebarRef={props.sidebarRef} sideMenu={props.sideMenu} />
        </div>
        <div className="layout-mask modal-in"></div>

        <div className="topbar-right">
          <ul className="topbar-menu">
            {companyName && (
              <li className="search-item white-space-nowrap">
                <span className="m-2 capitalize-first">{companyName}</span>
                <span
                  onClick={() => handleCompanyChange()}
                  className="cursor-pointer"
                >
                  <i className="pi pi-arrow-right-arrow-left"></i>
                </span>
              </li>
            )}
            <li className="profile-item static sm:relative">
              <StyleClass
                nodeRef={btnRef2}
                selector="@next"
                enterClassName="hidden"
                enterActiveClassName="scalein"
                leaveToClassName="hidden"
                leaveActiveClassName="fadeout"
                hideOnOutsideClick={true}
              >
                <a tabIndex={1} ref={btnRef2}>
                  <i className="pi pi-user mr-3"></i>
                  <span className="profile-name">
                    {user?.first_name} {user?.last_name}
                  </span>
                </a>
              </StyleClass>
              <ul className="list-none p-3 m-0 border-round shadow-2 absolute surface-overlay hidden origin-top w-full sm:w-19rem mt-2 right-0 z-5 top-auto">
                {renderProfileMenuItems()}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  },
);

export default AppTopBar;
