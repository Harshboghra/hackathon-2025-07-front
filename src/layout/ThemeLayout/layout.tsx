import {
  useCallback,
  useEffect,
  useRef,
  useContext,
  ReactElement,
} from 'react';
import { classNames, DomHandler } from 'primereact/utils';
import { LayoutContext } from './context/layoutcontext';
import {
  useEventListener,
  useMountEffect,
  useResizeListener,
  useUnmountEffect,
} from 'primereact/hooks';
import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppSearch from './AppSearch';
import AppBreadCrumb from './AppBreadCrumb';
import { Tooltip } from 'primereact/tooltip';
import { MenuModal } from '../types/types';
import { PrimeReactContext } from 'primereact/api';
import { Outlet } from 'react-router-dom';

const Layout = (props: {
  children?: ReactElement<any, any>;
  sideMenu: MenuModal[];
}) => {
  const { sideMenu, children } = props;
  const { setRipple } = useContext(PrimeReactContext);
  const {
    layoutConfig,
    layoutState,
    setLayoutState,
    isSlim,
    isCompact,
    isHorizontal,
    isDesktop,
  } = useContext(LayoutContext);
  const topBarRef = useRef<any>(null);
  const sidebarRef = useRef<any>(null);
  const copyTooltipRef = useRef(null);
  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
    useEventListener({
      type: 'click',
      listener: (event) => {
        const isOutsideClicked = !(
          sidebarRef.current.isSameNode(event.target) ||
          sidebarRef.current.contains(event.target) ||
          topBarRef.current.menubutton.isSameNode(event.target) ||
          topBarRef.current.menubutton.contains(event.target)
        );
        if (isOutsideClicked) {
          hideMenu();
        }
      },
    });

  const [bindDocumentResizeListener, unbindDocumentResizeListener] =
    useResizeListener({
      listener: () => {
        if (isDesktop() && !DomHandler.isTouchDevice()) {
          hideMenu();
        }
      },
    });

  const hideMenu = useCallback(() => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      overlaySubmenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
      menuClick: false,
      resetMenu: (isSlim() || isCompact() || isHorizontal()) && isDesktop(),
    }));
  }, [isSlim, isHorizontal, isDesktop, setLayoutState, isCompact]);

  const blockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  };

  const unblockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi',
        ),
        ' ',
      );
    }
  };
  useMountEffect(() => {
    setRipple && setRipple(layoutConfig.ripple);
  });

  useEffect(() => {
    if (
      layoutState.overlayMenuActive ||
      layoutState.staticMenuMobileActive ||
      layoutState.overlaySubmenuActive
    ) {
      bindMenuOutsideClickListener();
    }

    if (layoutState.staticMenuMobileActive) {
      blockBodyScroll();
      (isSlim() || isCompact() || isHorizontal()) &&
        bindDocumentResizeListener();
    }

    return () => {
      unbindMenuOutsideClickListener();
      unbindDocumentResizeListener();
      unblockBodyScroll();
    };
  }, [
    layoutState.overlayMenuActive,
    layoutState.staticMenuMobileActive,
    layoutState.overlaySubmenuActive,
    bindMenuOutsideClickListener,
    isSlim,
    isCompact,
    isHorizontal,
    bindDocumentResizeListener,
    unbindMenuOutsideClickListener,
    unbindDocumentResizeListener,
  ]);

  useUnmountEffect(() => {
    unbindMenuOutsideClickListener();
  });

  const containerClassName = classNames(
    'layout-wrapper',
    {
      'layout-static': layoutConfig.menuMode === 'static',
      'layout-slim': layoutConfig.menuMode === 'slim',
      'layout-horizontal': layoutConfig.menuMode === 'horizontal',
      'layout-drawer': layoutConfig.menuMode === 'drawer',
      'layout-overlay': layoutConfig.menuMode === 'overlay',
      'layout-compact': layoutConfig.menuMode === 'compact',
      'layout-reveal': layoutConfig.menuMode === 'reveal',
      'layout-sidebar-dim': layoutConfig.colorScheme === 'dim',
      'layout-sidebar-dark': layoutConfig.colorScheme === 'dark',
      'layout-overlay-active': layoutState.overlayMenuActive,
      'layout-mobile-active': layoutState.staticMenuMobileActive,
      'layout-static-inactive':
        layoutState.staticMenuDesktopInactive &&
        layoutConfig.menuMode === 'static',
      'p-input-filled': layoutConfig.inputStyle === 'filled',
      'p-ripple-disabled': !layoutConfig.ripple,
      'layout-sidebar-active': layoutState.sidebarActive,
      'layout-sidebar-anchored': layoutState.anchored,
    },
    layoutConfig.colorScheme === 'light'
      ? 'layout-sidebar-' + layoutConfig.menuTheme
      : '',
  );

  return (
    <div className={containerClassName} data-theme={layoutConfig.colorScheme}>
      <Tooltip
        ref={copyTooltipRef}
        target=".block-action-copy"
        position="bottom"
        content="Copied to clipboard"
        event="focus"
      />

      <div className="layout-content-wrapper">
        <AppTopbar
          ref={topBarRef}
          sidebarRef={sidebarRef}
          sideMenu={sideMenu}
        />
        <div className="layout-content">
          <AppBreadCrumb />
          {children}
          <Outlet />
        </div>
        <AppFooter />
      </div>
      <AppSearch />
      <div className="layout-mask"></div>
    </div>
  );
};

export default Layout;
