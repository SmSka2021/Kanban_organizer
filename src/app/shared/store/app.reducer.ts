import { createReducer, on } from '@ngrx/store';
import {
  setAPIStatus,
  setUserData,
  setCurrentBoard,
  setIsLogin,
  setToken,
  setUserInfo,
} from './app.action';
import { AppState } from './state';
import { initialState } from './state';

export const appReducer = createReducer(
  initialState,
  on(setAPIStatus, (state, { apiStatus }): AppState => {
    return {
      ...state,
      ...apiStatus,
    };
  }),
  on(setUserData, (state, action): AppState => {
    return {
      ...state,
      token: action.token,
      userId: action.userId,
      userName: action.userName,
      userLogin: action.userLogin,
    };
  }),
  on(setUserInfo, (state, action): AppState => {
    return {
      ...state,
      userName: action.userName,
      userLogin: action.userLogin,
    };
  }),
  on(setIsLogin, (state, action): AppState => {
    return {
      ...state,
      isLogin: action.isLogin,
    };
  }),
  on(setToken, (state, action): AppState => {
    return {
      ...state,
      token: action.token,
    };
  }),
  on(setCurrentBoard, (state, action): AppState => {
    return {
      ...state,
      currentBoardId: action.id,
    };
  })
);
