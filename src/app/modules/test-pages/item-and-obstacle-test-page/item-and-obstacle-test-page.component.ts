import { Component } from '@angular/core';
import { BattleGridComponent } from '../../shared/battle-grid/battle-grid.component';
import { Map, Obstacle } from '../../../models/map';

@Component({
  selector: 'app-item-and-obstacle-test-page',
  standalone: true,
  imports: [BattleGridComponent],
  templateUrl: './item-and-obstacle-test-page.component.html',
  styleUrl: './item-and-obstacle-test-page.component.css'
})
export class ItemAndObstacleTestPageComponent {

  createBattle() {
    // create map dimensions, obstacles, items, and characters

    const rock : Obstacle = {
      position : {x: 2, y: 2},
      image: "rock"
    };

    const tree : Obstacle = {
      position :  {x: 4, y: 4},
      image: "tree"
    }

    const map: Partial<Map> = {
      width :10,
      length : 5,
      obstacles: [rock, tree]
    }
  }

  loadBattle() {}

  saveBattle() {}

}
