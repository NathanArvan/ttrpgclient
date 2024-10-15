import { Component, Input } from '@angular/core';
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
  xIndex: number = 0;
  yIndex: number = 0;

  onCellClicked(xIndex: number, yIndex: number) {
    
  }
}
