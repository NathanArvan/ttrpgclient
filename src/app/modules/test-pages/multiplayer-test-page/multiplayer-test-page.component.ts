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
  public uiState = signal<MultiplayerUIStates>(MultiplayerUIStates.BattleMenu);
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

  public loadUserForm: FormGroup = new FormGroup(
    {email: new FormControl()}
  )

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

  selectCharacter() {
    
  }
}
