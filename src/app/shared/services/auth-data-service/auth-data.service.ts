import { Injectable } from '@angular/core';
import { RequestClientBuilderService } from '../request-client-builder/request-client-builder.service';
import { Observable } from 'rxjs';
import { UrlsEnum } from '../../models/enums/urls-enum';
import { UserData } from '../../models/interfaces/interfaces-board';
import { LoginData, LoginResponse, SingUpData } from '../../models/auth-models';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  constructor(
    private readonly RequestClientBuilder: RequestClientBuilderService
  ) {}

  public logIn(data: LoginData): Observable<LoginResponse> {
    return this.RequestClientBuilder.post(UrlsEnum.logIn, data);
  }

  public signUp(data: SingUpData): Observable<UserData> {
    return this.RequestClientBuilder.post(UrlsEnum.signUp, data);
  }
}
