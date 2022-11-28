import { Component, Input } from '@angular/core';
import { AdvantagesData } from '../../../../shared/models/interfaces/welcome-page';

@Component({
  selector: 'app-advantage-card',
  templateUrl: './advantage-card.component.html',
  styleUrls: ['./advantage-card.component.scss'],
})
export class AdvantageCardComponent {
  @Input() advantageData: AdvantagesData;
}
