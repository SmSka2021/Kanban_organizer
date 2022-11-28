import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './state';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectUserToken = createSelector(
  selectAppState,
  (state: AppState) => state.token
);

export const selectIdBoard = createSelector(
  selectAppState,
  (state: AppState) => state.currentBoardId
);

export const selectApiStatus = createSelector(
  selectAppState,
  (state: AppState) => state.apiStatus
);

export const selectApiResponseMessage = createSelector(
  selectAppState,
  (state: AppState) => state.apiResponseMessage
);

export const selectUserId = createSelector(
  selectAppState,
  (state: AppState) => state.userId
);

export const selectIsLogin = createSelector(
  selectAppState,
  (state: AppState) => state.isLogin
);

export const selectUserData = createSelector(
  selectAppState,
  (state: AppState) => {
    return {
      userName: state.userName,
      userLogin: state.userLogin,
    };
  }
);
