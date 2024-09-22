import { Component, computed, signal } from '@angular/core';
import { User } from '../../../models/user';
import { Battle } from '../../../models/battle';
import { Character } from '../../../models/character';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { BattleService } from '../../../services/battle.service';
import { CharacterService } from '../../../services/character.service';

export enum MultiplayerUIStates {
  UserMenu,
  BattleMenu,
  CharacterMenu,
  Map
}

@Component({
  selector: 'app-multiplayer-test-page',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    private characterService: CharacterService
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
    })
  }

  loadUser() {
    const email = this.loadUserForm.controls['email'].value;
    this.userService.getUserByEmail(email).subscribe(user => {
      this.currentUser.set(user);
    })
  }

  createBattle() {
    this.battleService.createBattle().subscribe(battle => {
      this.currentBattle.set(battle);
    })
  }

  loadBattle() {
    const battleIdInput = this.existingBattleForm.controls['battleId'].value;
    if (battleIdInput !== null) {
      this.battleService.getBattle(parseInt(battleIdInput)).subscribe(battle => {
        this.currentBattle.set(battle);
        this.characterService.getCharactersByBattleId(battle.battleId).subscribe(characters => {
          this.characters.set(characters);
        })
      })
    }
    else {
      console.log("bad Id");
    }
  }

  getCharacters() {}

  createCharacter() {}

  removeCharacter() {}
}
