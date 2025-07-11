import { MenuModal } from '../types/layout';
import AppSubMenu from './AppSubMenu';

const AppMenu = (props: { menu: MenuModal[] }) => {
  return <AppSubMenu model={props.menu} />;
};

export default AppMenu;
