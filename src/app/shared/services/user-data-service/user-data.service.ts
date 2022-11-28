import { Injectable } from '@angular/core';
import { RequestClientBuilderService } from '../request-client-builder/request-client-builder.service';
import { Observable } from 'rxjs';
import { UrlsEnum } from '../../models/enums/urls-enum';
import {
  UserData,
  UpdateUserRequestBody,
} from '../../models/interfaces/interfaces-board';
@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(
    private readonly RequestClientBuilder: RequestClientBuilderService
  ) {}

  public getAllUsers(): Observable<UserData[]> {
    return this.RequestClientBuilder.get<UserData[]>(UrlsEnum.users);
  }

  public getUserById(id: string): Observable<UserData> {
    const url = `${UrlsEnum.users}/${id}`;
    return this.RequestClientBuilder.get<UserData>(url);
  }

  public deleteUser(id: string): Observable<unknown> {
    const url = `${UrlsEnum.users}/${id}`;
    return this.RequestClientBuilder.delete(url);
  }

  public updateUser(
    id: string,
    data: UpdateUserRequestBody
  ): Observable<UserData> {
    const url = `${UrlsEnum.users}/${id}`;
    return this.RequestClientBuilder.put<UserData>(url, data);
  }
}
