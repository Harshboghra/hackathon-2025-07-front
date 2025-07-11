import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app.model';
import { IAuthState } from './auth.model';
import { MenuModal } from '../../types/layout';

export const initialState: IAuthState = {
  isLogin: false,
  login: {
    loading: false,
    hasErrors: false,
    data: null,
  },
  isCompanyHasUserIdSelected: false,
  companyHasUserId: 0,
  roleTypeCode: '',
  isLoginDialogOpen: true,
  isSetPermissions: false,
  roleBaseMenu: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    setAccessToken: (state: any, action: PayloadAction<string>) => {
      state.isLogin = true;
      if (state.login.data) state.login.data.access_token = action.payload;
    },
    setCompanyHasUserIdSelected: (
      state: any,
      action: PayloadAction<boolean>,
    ) => {
      state.isCompanyHasUserIdSelected = action.payload;
    },
    setCompanyHasUserId: (state: any, action: PayloadAction<number | null>) => {
      state.companyHasUserId = action.payload;
    },

    setLoginDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isLoginDialogOpen = action.payload;
    },
    setPermissions: (state, action: PayloadAction<boolean>) => {
      state.isSetPermissions = action.payload;
    },

    setLoginState: (state, action: PayloadAction<any>) => {
      state.login.data = action.payload;
      state.login.loading = false;
      state.login.hasErrors = false;
      state.isLogin = true;
    },

    setRoleTypeCode: (state, action: any) => {
      state.roleTypeCode = action.payload;
    },

    setRoleBaseMenu: (
      state,
      action: {
        payload: MenuModal[];
      },
    ) => {
      state.roleBaseMenu = action.payload;
    },
  },
});

// A selector
export const authSelector = (state: RootState) => state.auth;

// Actions
export const {
  logOut,
  setAccessToken,
  setCompanyHasUserIdSelected,
  setCompanyHasUserId,
  setLoginDialogOpen,
  setPermissions,
  setRoleTypeCode,
  setLoginState,
  setRoleBaseMenu,
} = authSlice.actions;

// The reducer
export default authSlice.reducer;
