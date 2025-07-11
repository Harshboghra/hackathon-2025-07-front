import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/auth.reducer';

export const combinedReducer = combineReducers({
  auth: authReducer,
});

export const rootReducer = (state: any, action: any) => {
  return combinedReducer(state, action);
};
