import { Component, computed, input, OnInit, signal } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { Map, MapCell } from '../../../models/map';
import { TokenService } from '../../../services/token.service';
import { MapGridComponent } from '../../shared/map-grid/map-grid.component';
import { Token } from '../../../models/token';
import { AbilityService } from '../../../services/ability.service';
import { CharacterService } from '../../../services/character.service';
import { CommonModule } from '@angular/common';
import { Ability } from '../../../models/ability';
import { BattleService } from '../../../services/battle.service';
import { Battle } from '../../../models/battle';

export enum SelectionStates {
  'NothingSelected',
  'CharacterSelected',
  'AttackSelected',
  'MoveSelected',
  'EnemySelected'
}

@Component({
  selector: 'app-basic-combat-test-page',
  standalone: true,
  imports: [MapGridComponent, CommonModule],
  templateUrl: './basic-combat-test-page.component.html',
  styleUrl: './basic-combat-test-page.component.css'
})
export class BasicCombatTestPageComponent implements OnInit {
  public states = SelectionStates;

  public currentBattle = signal<Battle | null>(null)
  public battleLoaded = computed(() => this.currentBattle() !== null)
  public battleId = input<string | null>(null);

  public map : Map = {
    length: 5,
    width: 10,
    mapId:1,
    campaignId:1,
    image: '',
    tokens: [],
  }
  public tokens: Token[] | null = null;
  public abilities: any[] = [];
  public characters: any[] =[];
  public mapMatrix: MapCell[][] = [];
  public selectedPosition = signal<{xPosition: number, yPosition: number} | null>(null);
  public characterIsSelected = computed(() => this.selectedPosition()?.xPosition === 1 && this.selectedPosition()?.yPosition === 1 );
  public selectionState = signal<SelectionStates>(SelectionStates.NothingSelected);
  public characterPosition = signal<{xPosition: number, yPosition: number}>({xPosition:1, yPosition:1});
  constructor(
    private mapService: MapService,
    private tokenService: TokenService,
    private abilityService: AbilityService,
    private characterService: CharacterService,
    private battleService: BattleService
  ) {}

  ngOnInit(): void {

    this.tokenService.getMockTokens().subscribe(tokens => {
      this.map.tokens = tokens;
      this.generateMapMatrix();
    });
    this.abilityService.getMockAbilities().subscribe(abilities => {
      this.abilities = abilities;
    })
    // this.characterService.getCharacters().subscribe(characters => {
    //   this.characters = characters;
    // })
  }

  createNewBattle() {
    this.battleService.createBattle().subscribe(battle => {
      this.currentBattle.set(battle);
    })
  }

  loadExistingBattle() {
    const battleIdInput = this.battleId();
    if (battleIdInput !== null) {
      this.battleService.getBattle(parseInt(battleIdInput)).subscribe(battle => {
        this.currentBattle.set(battle);
        this.characterService.getCharacters(); //need to update after adding parameters on backend
      })
    }
    else {
      console.log("bad Id");
    }
  }

  updateBattle() {

  }

  generateMapMatrix() {
    const selectedXPosition = this.selectedPosition()?.xPosition;
    const selectedYPosition = this.selectedPosition()?.yPosition;
    if (this.map !== null) {
      this.mapMatrix = new Array(this.map.length);
      for(let i =0; i < this.map.length; i++ ) {
        this.mapMatrix[i] = new Array(this.map.width);
        for(let j = 0; j < this.map.width; j++) {
          this.mapMatrix[i][j] = {token: null, image: null, borderClass: null}
          if(selectedXPosition === i && selectedYPosition === j) {
            this.mapMatrix[i][j].borderClass = 'green-border';
          }
          if(selectedXPosition === 1 && selectedYPosition === 1 && selectedXPosition === i && selectedYPosition === j) {
            this.mapMatrix[i][j].borderClass = 'red-border';
            this.selectionState.set(SelectionStates.CharacterSelected);
          }
          if(selectedXPosition === 4 && selectedYPosition === 4 && this.selectionState() === SelectionStates.AttackSelected ) {
            console.log("Orc attacked")
            this.selectionState.set(SelectionStates.NothingSelected);
          }
        }
      }
      this.map.tokens.forEach(token => {  
        this.mapMatrix[token.xPosition][token.yPosition].token = token; 
        if (token.src) {
          this.mapMatrix[token.xPosition][token.yPosition].image = token.src;
        }
      })
    }
  }

  onCellClicked(xPosition : number, yPosition: number) {
    this.selectedPosition.set({xPosition, yPosition});
    // var tokenAtPosition = this.map?.tokens.find(token => {
    //   return token.xPosition === xPosition && token.yPosition === yPosition
    // })
    // if (tokenAtPosition && tokenAtPosition !== undefined) {
    //   this.selectedToken = tokenAtPosition;
    // }
    // if(this.selectedToken && (
    //   this.selectedToken.xPosition !== this.selectedPosition.xPosition || this.selectedToken.yPosition !== this.selectedToken.yPosition
    //   )) {
    //     this.showMoveMessage = true;
    //     this.moveMessage = `Move token from ${this.selectedToken.xPosition}, ${this.selectedToken.yPosition} to ${this.selectedPosition.xPosition}, ${this.selectedPosition.yPosition}?` 
    // }
    this.generateMapMatrix();
  }
  
  onTokenUpdate(event: Token) {
    this.tokenService.updateToken(event).subscribe();
  }

  onActionButtonClicked($event: Ability) {
    if($event.abilityId === 1) {
      this.selectionState.set(SelectionStates.AttackSelected)
    } 
    if ($event.abilityId === 2) {
      this.selectionState.set(SelectionStates.MoveSelected);
    }

  }

  moveCharacterToSquare() {

  }
}
