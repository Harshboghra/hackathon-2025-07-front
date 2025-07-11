import { useContext, useEffect } from 'react';
import AppMenu from './AppMenu';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { MenuModal } from '../types/layout';

const AppSidebar = (props: {
  sidebarRef: React.RefObject<HTMLDivElement>;
  sideMenu: MenuModal[];
}) => {
  const { setLayoutState, layoutState } = useContext(LayoutContext);

  useEffect(() => {
    return () => {
      resetOverlay();
    };
  }, []);

  const resetOverlay = () => {
    if (layoutState.overlayMenuActive) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        overlayMenuActive: false,
      }));
    }
  };

  let timeout: any = null;

  const onMouseEnter = () => {
    if (!layoutState.anchored) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        sidebarActive: true,
      }));
    }
  };

  const onMouseLeave = () => {
    if (!layoutState.anchored) {
      if (!timeout) {
        timeout = setTimeout(
          () =>
            setLayoutState((prevLayoutState) => ({
              ...prevLayoutState,
              sidebarActive: false,
            })),
          300,
        );
      }
    }
  };

  return (
    <div
      ref={props.sidebarRef}
      className="layout-sidebar"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="sidebar-header logo">
        <div className="logo-image">
          <img
            src={`/images/logo/logo.png`}
            className="w-8rem"
            alt="diamond-layout"
          />
        </div>
      </div>
      <div className="layout-menu-container">
        <MenuProvider>
          <AppMenu menu={props.sideMenu} />
        </MenuProvider>
      </div>
    </div>
  );
};

export default AppSidebar;
