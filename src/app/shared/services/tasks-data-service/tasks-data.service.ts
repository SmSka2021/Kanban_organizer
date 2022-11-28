import { Injectable } from '@angular/core';
import { RequestClientBuilderService } from '../request-client-builder/request-client-builder.service';
import { Observable } from 'rxjs';
import { UrlsEnum } from '../../models/enums/urls-enum';
import {
  AllTasksOneColumn,
  CreateTaskBody,
  CreateTaskResponse,
  GetTaskByIdResponse,
  UpdateOneTaskBody,
  UpdateOneTaskResponse,
  //ErrorResponseServer,
} from '../../models/interfaces/interfaces-board';
@Injectable({
  providedIn: 'root',
})
export class TasksDataService {
  constructor(
    private readonly RequestClientBuilder: RequestClientBuilderService
  ) {}

  public getAllTasks(
    boardId: string,
    columnId: string
  ): Observable<AllTasksOneColumn> {
    const url =
      UrlsEnum.boards +
      `/${boardId}/` +
      UrlsEnum.columns +
      `/${columnId}/` +
      UrlsEnum.tasks;
    return this.RequestClientBuilder.get<AllTasksOneColumn>(url);
  }

  public createTask(
    boardId: string,
    columnId: string,
    data: CreateTaskBody
  ): Observable<CreateTaskResponse> {
    const url =
      UrlsEnum.boards +
      `/${boardId}/` +
      UrlsEnum.columns +
      `/${columnId}/` +
      UrlsEnum.tasks;
    return this.RequestClientBuilder.post<CreateTaskResponse>(url, data);
  }

  public getTaskById(
    boardId: string,
    columnId: string,
    taskId: string
  ): Observable<GetTaskByIdResponse> {
    const url =
      UrlsEnum.boards +
      `/${boardId}/` +
      UrlsEnum.columns +
      `/${columnId}/` +
      UrlsEnum.tasks +
      `/${taskId}`;
    return this.RequestClientBuilder.get<GetTaskByIdResponse>(url);
  }

  public deleteTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Observable<unknown> {
    const url =
      UrlsEnum.boards +
      `/${boardId}/` +
      UrlsEnum.columns +
      `/${columnId}/` +
      UrlsEnum.tasks +
      `/${taskId}`;
    return this.RequestClientBuilder.delete<unknown>(url);
  }

  public updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    data: UpdateOneTaskBody
  ): Observable<UpdateOneTaskResponse> {
    const url =
      UrlsEnum.boards +
      `/${boardId}/` +
      UrlsEnum.columns +
      `/${columnId}/` +
      UrlsEnum.tasks +
      `/${taskId}`;
    return this.RequestClientBuilder.put<UpdateOneTaskResponse>(url, data);
  }
}
