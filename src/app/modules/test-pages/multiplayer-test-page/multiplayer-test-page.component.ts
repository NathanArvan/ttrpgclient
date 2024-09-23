import { Component, computed, signal } from '@angular/core';
import { User } from '../../../models/user';
import { Battle } from '../../../models/battle';
import { Character } from '../../../models/character';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { BattleService } from '../../../services/battle.service';
import { CharacterService } from '../../../services/character.service';
import { ClassService } from '../../../services/class.service';
import { WebsocketTestComponent } from "../websocket-test/websocket-test.component";

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
export class MultiplayerTestPageComponent {
  public uiState = signal<MultiplayerUIStates>(MultiplayerUIStates.UserMenu);
  public uiStates = MultiplayerUIStates;

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

  public characters = signal<Character[]>([]);
  public userCharacter = computed(() =>{
    const currentUserId = this.currentUser()?.userId;
    if (currentUserId === undefined) {
      return null;
    }
    const found = this.characters().find(ch => ch.userId === currentUserId);
    if (found === undefined) {
      return null;
    }
    return found;
  })

  public classes = signal<any[]>([]);

  public createUserForm: FormGroup = new FormGroup(
    {
      name: new FormControl(),
      email: new FormControl()
    }
  )
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
    private classService: ClassService
  ) {}

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
        this.uiState.set(this.uiStates.CharacterMenu);
      })
    }
    else {
      console.log("bad Id");
    }
  }

  getCharacters() {}

  createCharacter() {}

  removeCharacter() {}

  getClasses() {
    this.classService.getClasses().subscribe(classes => {
      this.classes.set(classes);
    });
  }
}
