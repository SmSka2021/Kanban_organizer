export interface BoardResponse {
  id: string;
  title: string;
  description: string;
  columns: Column[];
}
interface Files {
  filename: string;
  fileSize: number;
}
export interface Tasks {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files: Files[];
}
export interface Column {
  id: string;
  title: string;
  order: number;
  tasks: Tasks[];
}
export interface CreateUpdateColumn {
  id: string;
  title: string;
  order: number;
}
export type AllTasksOneColumn = GetTaskByIdResponse[];
export interface CreateOneTask {
  id: string;
  title: string;
  description: string;
  userId: string;
}
export interface UpdateOneTaskResponse {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
export interface UpdateOneTaskBody {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
export interface CreateTaskBody {
  title: string;
  description: string;
  userId?: string;
}
export interface CreateTaskResponse {
  id: string;
  title: string;
  description: string;
  userId: string;
}
//////////////////
export interface GetTaskByIdResponse {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: Files[];
}
export interface OneBoard {
  id: string;
  title: string;
  description: string;
}

export type AllBoardsResponse = Array<OneBoard>;
export interface CreateBoardRequest {
  title: string;
  description: string;
}

export interface ErrorResponseServer {
  statusCode: number;
  message: string;
}
export interface UserData {
  id: string;
  name: string;
  login: string;
}
export interface UpdateUserRequestBody {
  name: string;
  login: string;
  password: string;
}

export interface EditTask {
  title: string;
  description: string;
  idColumn: string;
  idTask: string;
}

export interface AddTaskEvent {
  clicked: string;
  value: {
    title: string;
    description: string;
    userId?: string;
  };
}
export interface AddColumn {
  clicked: string;
  value: {
    title: string;
  };
}
export interface UpdateColumnBody {
  title: string;
  order: number;
}

export interface ColumnColor {
  [key: string]: string;
}

export interface User {
  id: string;
  name: string;
  login: string;
  color?: string;
}

export type UsersTasksProject = Array<
  [string, [{ column: string; task: string }]]
>;

export type OneUsersTasks = [string, [{ column: string; task: string }]];

export type UsersTasks = Array<{ column: string; task: string }>;

export interface NgxSpinnerConfig {
  type?: string;
}
export interface BoardAndAllTasks {
  idBoard: string;
  boardTitle: string;
  taskTitle: string;
  taskDescription: string;
  userLogin: string;
}
