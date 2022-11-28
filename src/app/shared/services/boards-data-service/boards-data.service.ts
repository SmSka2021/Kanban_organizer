import { Injectable } from '@angular/core';
import { RequestClientBuilderService } from '../request-client-builder/request-client-builder.service';
import { Observable } from 'rxjs';
import { StateBoard } from '../../../pages/board-page/store/state-board';
import { UrlsEnum } from '../../models/enums/urls-enum';
import {
  AllBoardsResponse,
  CreateBoardRequest,
  OneBoard,
  //ErrorResponseServer,
} from '../../models/interfaces/interfaces-board';

@Injectable({
  providedIn: 'root',
})
export class BoardsDataService {
  constructor(
    private readonly RequestClientBuilder: RequestClientBuilderService
  ) {}

  public getAllBoards(): Observable<AllBoardsResponse> {
    return this.RequestClientBuilder.get<AllBoardsResponse>(UrlsEnum.boards);
  }

  public getBoardById(id: string): Observable<StateBoard> {
    const url = `${UrlsEnum.boards}/${id}`;
    return this.RequestClientBuilder.get<StateBoard>(url);
  }

  public createBoard(data: CreateBoardRequest): Observable<OneBoard> {
    return this.RequestClientBuilder.post<OneBoard>(UrlsEnum.boards, data);
  }

  public deleteBoard(id: string): Observable<unknown> {
    const url = `${UrlsEnum.boards}/${id}`;
    return this.RequestClientBuilder.delete<unknown>(url);
  }

  public updateBoard(
    id: string,
    data: CreateBoardRequest
  ): Observable<OneBoard> {
    const url = `${UrlsEnum.boards}/${id}`;
    return this.RequestClientBuilder.put<OneBoard>(url, data);
  }
}
