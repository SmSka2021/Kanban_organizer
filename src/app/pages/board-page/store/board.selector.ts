import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateBoard } from './state-board';
import { Column } from './../../../shared/models/interfaces/interfaces-board';

export const selectBoards = createFeatureSelector<StateBoard>('myboard');

export const selectIdBoard = createSelector(
  selectBoards,
  (state: StateBoard) => state.id
);

export const selectTitleBoard = createSelector(
  selectBoards,
  (state: StateBoard) => state.title
);

export const selectDescriptionBoard = createSelector(
  selectBoards,
  (state: StateBoard) => state.description
);

export const selectColumnsBoard = createSelector(
  selectBoards,
  (state: StateBoard) => state.columns
);

export const selectColumnById = (columnId: string) =>
  createSelector(selectColumnsBoard, (state: Column[]) => {
    const columnChecked = state.filter((column) => column.id === columnId);
    return columnChecked[0];
  });

export const selectColumnByOrder = (colOrder: number) =>
  createSelector(selectColumnsBoard, (state: Column[]) => {
    const columnChecked = state.filter((column) => column.order === colOrder);
    return columnChecked[0];
  });
