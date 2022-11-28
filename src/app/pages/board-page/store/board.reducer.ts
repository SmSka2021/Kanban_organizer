import { on, createReducer } from '@ngrx/store';
import { boardFetchAPISuccess } from './board.actions';
import { StateBoard, initialStateBoard } from './state-board';

export const boardReducer = createReducer(
  initialStateBoard,
  on(boardFetchAPISuccess, (state, { boardResponse }): StateBoard => {
    let clonedObject: StateBoard = JSON.parse(JSON.stringify(boardResponse));
    clonedObject.columns.forEach((col) =>
      col.tasks.sort((a, b) => a.order - b.order)
    );
    clonedObject.columns.sort((a, b) => a.order - b.order);

    return clonedObject;
  })
);
