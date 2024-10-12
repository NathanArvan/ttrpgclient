import { Component, computed, OnInit, signal } from '@angular/core';
import { User } from '../../../models/user';
import { Battle } from '../../../models/battle';
import { Character } from '../../../models/character';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { BattleService } from '../../../services/battle.service';
import { CharacterService } from '../../../services/character.service';
import { WebsocketTestComponent } from "../websocket-test/websocket-test.component";
import { SignalRService } from '../../../services/signal-r.service';

export enum MultiplayerUIStates {
  UserMenu,
  BattleMenu,
  CharacterMenu,
  Map
}

@Component({
  selector: 'app-multiplayer-test-page',
  standalone: true,
  imports: [ReactiveFormsModule, WebsocketTestComponent],
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

  public userCharacter = signal<Character | null>(null)



  public existingBattleForm: FormGroup = new FormGroup(
    {battleId: new FormControl()}
  )


  constructor(
    private userService: UserService,
    private battleService: BattleService,
    private characterService: CharacterService,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    this.signalRService.startConnection().subscribe(() => {
      this.signalRService.receiveUserJoinedBattleMessage().subscribe((message) => {
        const users: User[] = JSON.parse(message.toLowerCase());
        this.usersInBattle.set(users);
        console.log(`Message received. These are the current users ${message}`)
      });
    });
  }

  createUser() {
    const user: User = {
      name : this.createUserForm.controls['name'].value,
      email : this.createUserForm.controls['email'].value,
      userId: null,
      characters : null,
    }
    this.userService.createUser(user).subscribe(user => {
      this.currentUser.set(user);
      this.uiState.set(this.uiStates.BattleMenu);
    })
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
    })
  }

  loadBattle() {
    const battleIdInput = this.existingBattleForm.controls['battleId'].value;
    if (battleIdInput !== null) {
      this.battleService.getBattle(parseInt(battleIdInput)).subscribe(battle => {
        this.currentBattle.set(battle);
        this.getCharactersForThisBattleAndUser();
        this.uiState.set(this.uiStates.CharacterMenu);
      })
    }
    else {
      console.log("bad Id");
    }
  }

  // getCharacters() {}

  createCharacter() {
    const character: Partial<Character> = {
      name: this.createCharacterForm.controls["name"].value,
      classId: this.createCharacterForm.controls["classId"].value,
      battleId: this.currentBattleId(),
    }
    this.characterService.createCharacter(character).subscribe(character => {
      let user = this.currentUser()
      if( user !== null) {
        user.characters = [character];
        this.currentUser.set(user);
        this.signalRService.userJoined(user)
        this.userCharacter.set(character);
      }
      this.uiState.set(MultiplayerUIStates.Map);
    });
  }

  getCharactersForThisBattleAndUser() {
    const battleId = this.currentBattle()?.battleId;
    const userId = this.currentUser()?.userId;
    if (battleId !== undefined && userId !== undefined && userId !== null) {
      this.characterService.getCharacterByBattleIdAndUserId(battleId, userId)
      .subscribe((characters: Character[]) => {
        if (characters !== undefined && characters.length > 0) {
          const character = characters[0];
          this.userCharacter.set(character);
        }
      })
    }
  }

  useCurrentCharacter() {
    let user = this.currentUser()
    if( user !== null) {
      this.signalRService.userJoined(user)
    }
    this.uiState.set(MultiplayerUIStates.Map);
  }

  removeCharacter() {}


}
