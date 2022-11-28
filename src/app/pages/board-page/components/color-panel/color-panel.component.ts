import { Component, Output, EventEmitter } from '@angular/core';
import { Colors } from 'src/app/shared/models/enums/color-enum';

@Component({
  selector: 'app-color-panel',
  templateUrl: './color-panel.component.html',
  styleUrls: ['./color-panel.component.scss'],
})
export class ColorPanelComponent {
  @Output() emitColor: EventEmitter<string> = new EventEmitter();

  colorsData = Object.values(Colors);

  colorEmit(color: string) {
    this.emitColor.emit(color);
  }
}
