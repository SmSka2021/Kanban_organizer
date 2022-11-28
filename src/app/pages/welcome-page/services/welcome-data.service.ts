import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map, Observable } from 'rxjs';
import { advantageIconsUrls } from '../../../shared/constant/advantageIconsUrls';
import {
  AdvantagesData,
  TeamData,
} from '../../../shared/models/interfaces/welcome-page';

@Injectable({
  providedIn: 'root',
})
export class WelcomeDataService {
  private advantagesUrls = advantageIconsUrls;

  constructor(private translocoService: TranslocoService) {}

  setAdvantagesData(): Observable<AdvantagesData[]> {
    return this.translocoService
      .selectTranslateObject('welcome.advantages')
      .pipe(
        map((item) => {
          let arr: AdvantagesData[] = [];
          Object.values(item).forEach((currentValue, index) => {
            arr.push({
              text: currentValue,
              iconURL: this.advantagesUrls[index],
            });
          });
          return arr;
        })
      );
  }

  setTeamData(teamData: TeamData[]): Observable<TeamData[]> {
    return this.translocoService.selectTranslateObject('welcome.team').pipe(
      map((item) => {
        return teamData.map((currentObj, index) => {
          currentObj.name = item[`person-${index + 1}`];
          currentObj.description = item[`description-${index + 1}`];
          return currentObj;
        });
      })
    );
  }
}
