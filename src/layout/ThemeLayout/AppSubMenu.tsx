import { Tooltip } from 'primereact/tooltip';
import React, { useContext, useEffect, useRef } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import {
  Breadcrumb,
  BreadcrumbItem,
  MenuModal,
  MenuProps,
} from '../types/layout';
import { useTranslation } from 'react-i18next';

const AppSubMenu = (props: MenuProps) => {
  const { t } = useTranslation();
  const { model } = props;
  const { layoutState, setBreadcrumbs } = useContext(LayoutContext);
  const tooltipRef = useRef<Tooltip | null>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.hide();
      (tooltipRef.current as any).updateTargetEvents();
    }
  }, [layoutState.overlaySubmenuActive]);

  useEffect(() => {
    generateBreadcrumbs(model);
  }, [t, model]);

  const generateBreadcrumbs = (model: MenuModal[]) => {
    const breadcrumbs: Breadcrumb[] = [];
    const getBreadcrumb = (item: BreadcrumbItem, labels: string[] = []) => {
      const { label, to, items } = item;

      label && labels.push(label);
      items &&
        items.forEach((_item) => {
          getBreadcrumb(_item, labels.slice());
        });
      to && breadcrumbs.push({ labels, to });
    };

    model.forEach((item) => {
      getBreadcrumb(item);
    });
    setBreadcrumbs(breadcrumbs);
  };

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item.separator ? (
            <React.Fragment key={`${item.label}-${i}`}>
              <AppMenuitem item={item} root={true} index={i} key={item.label} />
            </React.Fragment>
          ) : (
            <li key={`${item.label}-${i}`} className="menu-separator"></li>
          );
        })}
      </ul>
      <Tooltip
        ref={tooltipRef}
        target="li:not(.active-menuitem)>.tooltip-target"
      />
    </MenuProvider>
  );
};

export default AppSubMenu;
