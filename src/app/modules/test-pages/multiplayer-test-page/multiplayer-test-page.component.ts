import { Component, computed, OnInit, signal } from '@angular/core';
import { User } from '../../../models/user';
import { Battle, CharacterMessageDTO, UserJoinedDTO } from '../../../models/battle';
import { Character } from '../../../models/character';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { BattleService } from '../../../services/battle.service';
import { CharacterService } from '../../../services/character.service';
import { WebsocketTestComponent } from "../websocket-test/websocket-test.component";
import { SignalRService } from '../../../services/signal-r.service';
import { ClassService } from '../../../services/class.service';
import { Map, MapCell } from '../../../models/map';
import { BattleGridComponent } from "../../shared/battle-grid/battle-grid.component";

export enum MultiplayerUIStates {
  UserMenu,
  BattleMenu,
  CharacterMenu,
  Map
}

@Component({
  selector: 'app-multiplayer-test-page',
  standalone: true,
  imports: [ReactiveFormsModule, WebsocketTestComponent, BattleGridComponent],
  templateUrl: './multiplayer-test-page.component.html',
  styleUrl: './multiplayer-test-page.component.css'
})
export class MultiplayerTestPageComponent implements OnInit {
  public uiState = signal<MultiplayerUIStates>(MultiplayerUIStates.UserMenu);
  public uiStates = MultiplayerUIStates;

  public usersInBattle = signal<User[] | null>(null);
  public currentUser = signal<User | null>(null);
  public userIsLoaded = computed(() => {
    return this.currentUser() !== null;
  })

  public currentBattle = signal<Battle | null>(null);
  public currentBattleId = computed<number | null>(() => {
    const battle = this.currentBattle();
    if (battle === null) {
      return null;
    }
    return battle.battleId;
  });
  public battleIsLoaded = computed(() => {
    return this.currentBattle() !== null;
  })

  public userCharacters = signal<Character[]>([]);
  public currentCharacter = signal<Character | null>(null);
  public currentCharacterIsSelected = signal<boolean>(false);

  public allCharactersOnMap = signal<Character[]>([]);
  public mapMatrix = computed<MapCell[][]>(() => {
    let mapMatrix = new Array(this.map.length);
    for(let i =0; i < this.map.length; i++ ) {
      mapMatrix[i] = new Array(this.map.width);
      for(let j = 0; j < this.map.width; j++) {
        mapMatrix[i][j] = {token: null, image: null, borderClass: null}
      }
    }
    // this.allCharactersOnMap().forEach(character => {  
    //   if (character.xPosition !== null && character.yPosition !== null) {
    //     mapMatrix[character.xPosition][character.yPosition].image = character.image;
    //   }
    // })
    return mapMatrix;
  }); 

  public loadUserForm: FormGroup = new FormGroup(
    {email: new FormControl()}
  )

  public existingBattleForm: FormGroup = new FormGroup(
    {battleId: new FormControl()}
  )

  public map : Map = {
    length: 5,
    width: 10,
    mapId:1,
    campaignId:1,
    image: '',
    tokens: [],
  }


  constructor(
    private userService: UserService,
    private battleService: BattleService,
    private characterService: CharacterService,
    private signalRService: SignalRService,
    public classService: ClassService
  ) {}

  ngOnInit(): void {
    this.signalRService.startConnection().subscribe(() => {
      this.signalRService.receiveUserJoinedBattleMessage().subscribe((message) => {
        const users: User[] = JSON.parse(message.toLowerCase());
        this.usersInBattle.set(users);
        console.log(`Message received. These are the current users ${message}`)
      });

      this.signalRService.receiveCharacterJoinedBattleMessage().subscribe((message) => {
        const characters: Character[] = JSON.parse(message.toLowerCase());
        this.allCharactersOnMap.set(characters);
      });

      this.signalRService.receiveCharacterUpdateMessage().subscribe((message) => {
        const characters: Character[] = JSON.parse(message.toLowerCase());
        this.allCharactersOnMap.set(characters);
      });
    });
  }

  loadUser() {
    const email = this.loadUserForm.controls['email'].value;
    this.userService.getUserByEmail(email).subscribe(user => {
      this.currentUser.set(user);
      this.uiState.set(this.uiStates.BattleMenu);
    })
  }

  createBattle() {
    this.battleService.createBattle().subscribe(battle => {
      this.currentBattle.set(battle);
      this.uiState.set(this.uiStates.CharacterMenu);
      const userId = this.currentUser()?.userId;
      if (userId !== undefined) {
        this.getCharactersForUser(userId)
      }
    })
  }

  loadBattle() {
    const battleIdInput = this.existingBattleForm.controls['battleId'].value;
    if (battleIdInput !== null) {
      this.battleService.getBattle(parseInt(battleIdInput)).subscribe(battle => {
        this.currentBattle.set(battle);
        this.uiState.set(this.uiStates.CharacterMenu);
        const userId = this.currentUser()?.userId;
        if (userId !== undefined) {
          this.getCharactersForUser(userId)
        }
      })
    }
    else {
      console.log("bad Id");
    }
  }

  getCharactersForUser(userId: number | null) {
    if (userId !== null) {
      this.characterService.getCharacterByUserId(userId).subscribe(characters => {
        this.userCharacters.set(characters);
      })
    }
  }

  selectCharacter(character: Character) {
    this.currentCharacter.set(character);
    this.uiState.set(this.uiStates.Map);
    const user = this.currentUser();
    const battleId = this.currentBattleId();
    if (battleId !== null && user !== null) {
      const userData: UserJoinedDTO = {
        battleId,
        user
      }
      this.userJoinedBattle(userData);
    }

    if (battleId !== null && character !== null) {
      const characterData: CharacterMessageDTO = {
        battleId,
        character
      }
      this.characterJoinedBattle(characterData);
    }
  }

  currentCharacterSelected() {
    this.currentCharacterIsSelected.set(true);
  }

  onMatrixCellClicked($event: {xPosition: number, yPosition: number}) {
    const currentCellOccupant = this.getCharacterAtPosition($event);
    const cellIsEmpty = currentCellOccupant === null;
    const cellOccupantIsCurrentCharacter = (currentCellOccupant === this.currentCharacter() && currentCellOccupant !== null);
    if (this.currentCharacterIsSelected() && cellIsEmpty) {
      this.updateCharacterPosition($event)
      return;
    }
    if (cellOccupantIsCurrentCharacter) {
      this.currentCharacterIsSelected.set(false);
      return;
    }
    if (!cellIsEmpty && this.currentCharacterIsSelected()) {
      this.enemyAttacked (currentCellOccupant);
    }
  }

  updateCharacterPosition(position: {xPosition: number, yPosition: number}) {
    let character = this.currentCharacter();
    if (character !== null) {
      character.xPosition = position.xPosition;
      character.yPosition = position.yPosition;
    }
    this.currentCharacter.set(character);
    const battleId = this.currentBattleId();
    if (battleId !== null && character !== null) {
      const message: CharacterMessageDTO = {
        battleId,
        character
      }
      this.characterUpdate(message)
    }
  }

  enemyAttacked(character: Character) {
    character.hitPoints = character.hitPoints - 5;
    const battleId = this.currentBattleId();
    if (battleId !== null && character !== null) {
      const message: CharacterMessageDTO = {
        battleId,
        character
      }
      this.characterUpdate(message)
    }
  }

  getCharacterAtPosition(position: {xPosition: number, yPosition: number}) {
    const found = this.allCharactersOnMap().find(ch => ch.xPosition === position.xPosition && ch.yPosition === position.yPosition);
    if (found === undefined) {
      return null;
    }
    return found;
  }
  
  userJoinedBattle(payload: UserJoinedDTO) {
    this.signalRService.userJoined(payload)
  }

  characterJoinedBattle(payload: CharacterMessageDTO) {
    this.signalRService.characterJoined(payload);
  }

  characterUpdate(payload: CharacterMessageDTO) {
    this.signalRService.characterUpdate(payload);
  }
}
