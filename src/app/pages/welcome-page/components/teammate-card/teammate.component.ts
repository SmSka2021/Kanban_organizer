import { Component, Input } from '@angular/core';
import { TeamData } from '../../../../shared/models/interfaces/welcome-page';

@Component({
  selector: 'app-teammate',
  templateUrl: './teammate.component.html',
  styleUrls: ['./teammate.component.scss'],
})
export class TeammateComponent {
  @Input() teammateData: TeamData;
}
