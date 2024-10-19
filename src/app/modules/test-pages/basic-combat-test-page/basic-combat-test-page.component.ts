import { Component, computed, input, OnInit, signal } from '@angular/core';
import { MapService } from '../../../services/map.service';
import { Map, MapCell } from '../../../models/map';
import { TokenService } from '../../../services/token.service';
import { Token } from '../../../models/token';
import { AbilityService } from '../../../services/ability.service';
import { CharacterService } from '../../../services/character.service';
import { CommonModule } from '@angular/common';
import { Ability } from '../../../models/ability';
import { BattleService } from '../../../services/battle.service';
import { Battle } from '../../../models/battle';
import { Character } from '../../../models/character';
import { forkJoin, switchMap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export enum SelectionStates {
  'NothingSelected',
  'CharacterSelected',
  'AttackSelected',
  'MoveSelected',
  'EnemySelected'
}

export let TestCharacter : Partial<Character> = {
  name: 'Test Character',
  xPosition: 1,
  yPosition: 1,
  image: 'assets/game-art/Tiny RPG Character Asset Pack v1.03 -Free Soldier&Orc/Characters(100x100)/Soldier/Soldier/Soldier-Idle Resize.png'
}

export let TestEnemy: Partial<Character> = {
  name: 'Test Enemy',
  xPosition: 4,
  yPosition: 4,
  image: 'assets/game-art/Tiny RPG Character Asset Pack v1.03 -Free Soldier&Orc/Characters(100x100)/Orc/Orc/Orc-Idle-Resize.png'
}

@Component({
  selector: 'app-basic-combat-test-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './basic-combat-test-page.component.html',
  styleUrl: './basic-combat-test-page.component.css'
})
export class BasicCombatTestPageComponent implements OnInit {
  public states = SelectionStates;

  public existingBattleForm: FormGroup = new FormGroup(
    {battleId: new FormControl()}
  )
  
  public currentBattle = signal<Battle | null>(null)
  public battleLoaded = computed(() => this.currentBattle() !== null)

  public characters = signal<Character[]>([]);
  public characterPosition = computed<{xPosition: number, yPosition: number} | null>(() => {
    const character = this.characters().find(pc => pc.name === "Test Character");
    if (character === undefined || character.xPosition === null || character.yPosition === null) {
      return null;
    }
    return {xPosition: character.xPosition, yPosition: character.yPosition}
  });
  public enemy = computed<Character | null>(() => {
    const character = this.characters().find(pc => pc.name === "Test Enemy");
    if (character === undefined) {
      return null;
    }
    return character;
  });
  public enemyPosition = computed<{xPosition: number, yPosition: number} | null>(() => {
    const character = this.enemy();
    if (character !== null && character.xPosition !== null && character.yPosition !== null) {
      return {xPosition: character?.xPosition, yPosition: character?.yPosition}
    }
    return null;
  });


  public selectedPosition = signal<{xPosition: number, yPosition: number} | null>(null);
  public characterIsSelected = computed(() => {
    this.selectedPosition()?.xPosition === this.characterPosition()?.xPosition && this.selectedPosition()?.yPosition === this.characterPosition()?.yPosition
  });

  public selectionState = signal<SelectionStates>(SelectionStates.NothingSelected);

  public mapMatrix = computed<MapCell[][]>(() => {
    const selectedXPosition = this.selectedPosition()?.xPosition;
    const selectedYPosition = this.selectedPosition()?.yPosition;
    const characterXPosition = this.characterPosition()?.xPosition;
    const characterYPosition = this.characterPosition()?.xPosition;
    let mapMatrix = new Array(this.map.length);
    for(let i =0; i < this.map.length; i++ ) {
      mapMatrix[i] = new Array(this.map.width);
      for(let j = 0; j < this.map.width; j++) {
        mapMatrix[i][j] = {token: null, image: null, borderClass: null}
        if(selectedXPosition === i && selectedYPosition === j) {
          mapMatrix[i][j].borderClass = 'green-border';
        }
        if(selectedXPosition === characterXPosition && selectedYPosition === characterYPosition && selectedXPosition === i && selectedYPosition === j) {
          mapMatrix[i][j].borderClass = 'red-border';
        }
      }
    }
    this.characters().forEach(character => {  
      if (character.xPosition !== null && character.yPosition !== null)
      mapMatrix[character.xPosition][character.yPosition].image = character.image;
    })
    return mapMatrix;
  }); 

  public map : Map = {
    length: 5,
    width: 10,
    mapId:1,
    campaignId:1,
    image: '',
    tokens: [],
  }
  
  public abilities: any[] = [];
  // public mapMatrix: MapCell[][] = [];

  constructor(
    private mapService: MapService,
    private tokenService: TokenService,
    private abilityService: AbilityService,
    private characterService: CharacterService,
    private battleService: BattleService
  ) {}

  ngOnInit(): void {
    this.abilityService.getMockAbilities().subscribe(abilities => {
      this.abilities = abilities;
    })
  }

  createNewBattle() {
    this.battleService.createBattle().pipe(
      switchMap(battle => {
        this.currentBattle.set(battle);
        TestCharacter.battleId = battle.battleId;
        TestEnemy.battleId = battle.battleId;
        const characterObservable = this.characterService.createCharacter(TestCharacter);
        const enemyObservable = this.characterService.createCharacter(TestEnemy);
        return forkJoin({characterObservable, enemyObservable})
      }),    
    ).subscribe({
      next: result => {
        this.characters.set([...this.characters(), result.characterObservable, result.enemyObservable])
        //this.generateMapMatrix();
      }
    })
  }

  loadExistingBattle() {
    const battleIdInput = this.existingBattleForm.controls['battleId'].value;
    if (battleIdInput !== null) {
      this.battleService.getBattle(parseInt(battleIdInput)).subscribe(battle => {
        this.currentBattle.set(battle);
        this.characterService.getCharactersByBattleId(battle.battleId).subscribe(characters => {
          this.characters.set(characters);
          //this.generateMapMatrix();
        })
      })
    }
    else {
      console.log("bad Id");
    }
  }

  updateBattle() {

  }


  onCellClicked(xPosition : number, yPosition: number) {
    const characterXPosition = this.characterPosition()?.xPosition;
    const characterYPosition = this.characterPosition()?.yPosition;
    this.selectedPosition.set({xPosition, yPosition});
    if (xPosition === characterXPosition && yPosition === characterYPosition) {
      this.selectionState.set(SelectionStates.CharacterSelected);
    }
    switch(this.selectionState()) {
      case SelectionStates.MoveSelected: {
        this.moveCharacterToSquare(xPosition, yPosition);
        break;
      }
      case SelectionStates.AttackSelected: {
        if (this.enemyPosition()?.xPosition === xPosition && this.enemyPosition()?.yPosition && yPosition) {
          this.attackEnemy();
        }
        break;
      }
    }
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

  moveCharacterToSquare(xPosition : number, yPosition: number) {
    let currentCharacters = this.characters();
    const characterIndex = currentCharacters.findIndex(ch => ch.name === "Test Character");
    let character = currentCharacters[characterIndex];
    if (character === undefined) {
      throw Error("No Character found");
    }
    character.xPosition = xPosition;
    character.yPosition = yPosition;
    this.characterService.updateCharacter(character.characterId, character).subscribe(updatedCharacter => {
      currentCharacters[characterIndex] = updatedCharacter;
      this.characters.set([...currentCharacters]);
      this.selectionState.set(SelectionStates.NothingSelected);
    })
  }

  attackEnemy() {
    let currentCharacters = this.characters();
    const characterIndex = currentCharacters.findIndex(ch => ch.name === "Test Enemy");
    let character = currentCharacters[characterIndex];
    if (character === undefined) {
      throw Error("No Character found");
    }
    character.hitPoints = character.hitPoints - 5;
    this.characterService.updateCharacter(character.characterId, character).subscribe(updatedCharacter => {
      currentCharacters[characterIndex] = updatedCharacter;
      this.characters.set([...currentCharacters]);
      this.selectionState.set(SelectionStates.NothingSelected);
    })
  }
}
