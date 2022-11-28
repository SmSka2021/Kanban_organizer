import { createAction, props } from '@ngrx/store';
import { BoardResponse } from '../../../shared/models/interfaces/interfaces-board';

export const invokeBoardAPI = createAction(
  '[Board API] Invoke Board Fetch API'
);

export const boardFetchAPISuccess = createAction(
  '[Board API] Fetch API Success',
  props<{ boardResponse: BoardResponse }>()
);
