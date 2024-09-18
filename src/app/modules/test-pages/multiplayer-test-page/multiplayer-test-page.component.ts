import { Component, computed, signal } from '@angular/core';
import { User } from '../../../models/user';
import { Battle } from '../../../models/battle';
import { Character } from '../../../models/character';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  public existingBattleForm: FormGroup = new FormGroup(
    {battleId: new FormControl()}
  )

  constructor() {}

  createUser() {}

  loadUser() {}

  createBattle() {}

  loadBattle() {}

  getCharacters() {}

  createCharacter() {}

  removeCharacter() {}
}
