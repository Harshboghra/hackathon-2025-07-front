import React, { createContext, useState } from 'react';
import type { MenuContextProps } from '../../types/types';

export const MenuContext = createContext({} as MenuContextProps);

interface MenuProviderProps {
  children: React.ReactNode;
}

export const MenuProvider = (props: MenuProviderProps) => {
  const [activeMenu, setActiveMenu] = useState('');

  const value = React.useMemo(
    () => ({
      activeMenu,
      setActiveMenu,
    }),
    [activeMenu, setActiveMenu],
  );

  return (
    <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>
  );
};
