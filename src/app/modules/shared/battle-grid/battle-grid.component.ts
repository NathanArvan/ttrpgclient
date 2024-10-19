import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapCell } from '../../../models/map';

@Component({
  selector: 'app-battle-grid',
  standalone: true,
  imports: [],
  templateUrl: './battle-grid.component.html',
  styleUrl: './battle-grid.component.css'
})
export class BattleGridComponent {

  @Input() mapMatrix: MapCell[][] = [];
  @Output() cellClicked = new EventEmitter();
  xIndex: number = 0;
  yIndex: number = 0;

  onCellClicked(xIndex: number, yIndex: number) {
    console.log(xIndex, yIndex);
    this.cellClicked.emit({xIndex, yIndex});
  }
}
