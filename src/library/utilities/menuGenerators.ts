import { MenuModal } from '../../types/layout';
import { ability } from '../ability/ability';
import { PERMISSION } from './permission.constant';
import i18next from 'i18next';

export const getMenuBasedPermission = (): MenuModal[] => {
  const menu: MenuModal[] = [
    {
      items: [
        {
          label: i18next.t('sideMenu.home'),
          icon: 'pi pi-fw pi-home',
          to: '/home',
        },
        {
          label: i18next.t('sideMenu.integrations'),
          icon: 'pi pi-fw pi-arrow-right-arrow-left',
          to: '/integrations',
        },
      ],
    },
  ];
  if (ability && menu[0].items) {
    if (ability.can(PERMISSION.ACTION.VIEW, PERMISSION.PAGE.COMPANIES)) {
      menu[0].items.push({
        label: i18next.t('sideMenu.companies'),
        icon: 'pi pi-fw pi-box',
        to: '/companies',
      });
    }
  }
  return menu;
};
