import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { Map } from '../../../models/map';
import { TokenService } from '../../../services/token.service';
import { MapGridComponent } from '../../shared/map-grid/map-grid.component';
import { Token } from '../../../models/token';

@Component({
  selector: 'app-basic-combat-test-page',
  standalone: true,
  imports: [MapGridComponent],
  templateUrl: './basic-combat-test-page.component.html',
  styleUrl: './basic-combat-test-page.component.css'
})
export class BasicCombatTestPageComponent implements OnInit {

  public map: Map | null = null;
  constructor(
    private mapService: MapService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.mapService.getMap(1).subscribe(map => {
      this.map = map;
        this.tokenService.getTokensWithImages().subscribe(tokens => {
        if (this.map !== null) {
          this.map.tokens = tokens;
        }
      })
    })
  }
  
  onTokenUpdate(event: Token) {
    this.tokenService.updateToken(event).subscribe();
  }
}
