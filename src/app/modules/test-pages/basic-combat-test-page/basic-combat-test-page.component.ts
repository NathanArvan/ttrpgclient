import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { Map } from '../../../models/map';
import { TokenService } from '../../../services/token.service';
import { MapGridComponent } from '../../shared/map-grid/map-grid.component';
import { Token } from '../../../models/token';
import { AbilityService } from '../../../services/ability.service';
import { CharacterService } from '../../../services/character.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basic-combat-test-page',
  standalone: true,
  imports: [MapGridComponent, CommonModule],
  templateUrl: './basic-combat-test-page.component.html',
  styleUrl: './basic-combat-test-page.component.css'
})
export class BasicCombatTestPageComponent implements OnInit {

  public map: Map | null = null;
  public abilities: any[] = [];
  public characters: any[] =[];
  constructor(
    private mapService: MapService,
    private tokenService: TokenService,
    private abilityService: AbilityService,
    private characterService: CharacterService
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
    this.abilityService.getAbilities().subscribe(abilities => {
      this.abilities = abilities;
    })
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    })
  }
  
  onTokenUpdate(event: Token) {
    this.tokenService.updateToken(event).subscribe();
  }
}
