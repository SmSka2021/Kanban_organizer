import { Injectable } from '@angular/core';
import { RequestClientBuilderService } from '../request-client-builder/request-client-builder.service';
import { Observable } from 'rxjs';
import { UrlsEnum } from '../../models/enums/urls-enum';
import {
  CreateUpdateColumn,
  Column,
  //ErrorResponseServer,
} from '../../models/interfaces/interfaces-board';
@Injectable({
  providedIn: 'root',
})
export class ColumnDataService {
  constructor(
    private readonly RequestClientBuilder: RequestClientBuilderService
  ) {}

  public getAllColumns(boardId: string): Observable<CreateUpdateColumn[]> {
    const url = UrlsEnum.boards + `/${boardId}/` + UrlsEnum.columns;
    return this.RequestClientBuilder.get<CreateUpdateColumn[]>(url);
  }

  public createColumn(
    boardId: string,
    data: { title: string }
  ): Observable<CreateUpdateColumn> {
    const url = UrlsEnum.boards + `/${boardId}/` + UrlsEnum.columns;
    return this.RequestClientBuilder.post<CreateUpdateColumn>(url, data);
  }

  public getColumnById(boardId: string, columnId: string): Observable<Column> {
    const url =
      UrlsEnum.boards + `/${boardId}/` + UrlsEnum.columns + `/${columnId}`;
    return this.RequestClientBuilder.get<Column>(url);
  }

  public deleteColumn(boardId: string, columnId: string): Observable<unknown> {
    const url =
      UrlsEnum.boards + `/${boardId}/` + UrlsEnum.columns + `/${columnId}`;
    return this.RequestClientBuilder.delete<unknown>(url);
  }

  public updateColumn(
    boardId: string,
    columnId: string,
    data: {
      title: string;
      order: number;
    }
  ): Observable<CreateUpdateColumn> {
    const url =
      UrlsEnum.boards + `/${boardId}/` + UrlsEnum.columns + `/${columnId}`;
    return this.RequestClientBuilder.put<CreateUpdateColumn>(url, data);
  }
}
