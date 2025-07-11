import { ObjectUtils } from 'primereact/utils';
import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { Breadcrumb } from '../types/layout';
import { useLocation } from 'react-router-dom';

const AppBreadcrumb = () => {
  const { pathname } = useLocation();
  const [breadcrumb, setBreadcrumb] = useState<Breadcrumb | null>(null);
  const { breadcrumbs } = useContext(LayoutContext);

  useEffect(() => {
    const filteredBreadcrumbs = breadcrumbs?.find((crumb) => {
      if (crumb.to) {
        const lastPathSegment = crumb.to.split('/').pop();
        const lastRouterSegment = pathname.split('/').pop();

        if (
          lastRouterSegment?.startsWith('[') &&
          !isNaN(Number(lastPathSegment))
        ) {
          return (
            pathname.split('/').slice(0, -1).join('/') ===
            crumb.to?.split('/').slice(0, -1).join('/')
          );
        }
        return crumb.to === pathname;
      }
      return false;
    });

    setBreadcrumb(filteredBreadcrumbs!);
  }, [pathname, breadcrumbs]);

  return (
    <nav className="layout-breadcrumb">
      <ol>
        {ObjectUtils.isNotEmpty(breadcrumb)
          ? breadcrumb!.labels!.map((label, index) => {
              return (
                <React.Fragment key={label}>
                  {index !== 0 && (
                    <li className="layout-breadcrumb-chevron"> / </li>
                  )}
                  <li key={label}>{label}</li>
                </React.Fragment>
              );
            })
          : null}
      </ol>
    </nav>
  );
};

export default AppBreadcrumb;
