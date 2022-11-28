import { createAction, props } from '@ngrx/store';
import { AppState } from './state';

export const setAPIStatus = createAction(
  '[API] success or failure status',
  props<{ apiStatus: AppState }>()
);

export const setUserData = createAction(
  '[AUTH] set user data',
  props<{
    token: string;
    userId: string;
    userName: string;
    userLogin: string;
  }>()
);

export const setUserInfo = createAction(
  '[AUTH] set user name and login',
  props<{
    userName: string;
    userLogin: string;
  }>()
);

export const setToken = createAction(
  '[AUTH] set token',
  props<{
    token: string;
  }>()
);

export const setIsLogin = createAction(
  '[AUTH] set is login user',
  props<{
    isLogin: boolean;
  }>()
);

export const setCurrentBoard = createAction(
  '[BOARD] set current board',
  props<{ id: string }>()
);
