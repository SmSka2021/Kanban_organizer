import { Column } from '../../../shared/models/interfaces/interfaces-board';
export interface StateBoard {
  id: string;
  title: string;
  description: string;
  columns: Column[];
}
export const initialStateBoard: StateBoard = {
  id: '',
  title: '',
  description: '',
  columns: [],
};
