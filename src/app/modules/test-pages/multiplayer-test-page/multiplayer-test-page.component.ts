import { Component, computed, signal } from '@angular/core';
import { User } from '../../../models/user';
import { Battle } from '../../../models/battle';
import { Character } from '../../../models/character';

@Component({
  selector: 'app-multiplayer-test-page',
  standalone: true,
  imports: [],
  templateUrl: './multiplayer-test-page.component.html',
  styleUrl: './multiplayer-test-page.component.css'
})
export class MultiplayerTestPageComponent {
  public currentUser = signal<User | null>(null);
  public userIsLoaded = computed(() => {
    return this.currentUser() !== null;
  })

  public currentBattle = signal<Battle | null>(null);
  public battleIsLoaded = computed(() => {
    return this.currentBattle() !== null;
  })

  public characters = signal<Character[]>([]);
}
