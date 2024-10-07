import { Component, computed, signal } from '@angular/core';
import { User } from '../../../models/user';
import { UserSignInComponent } from '../../shared/user-sign-in/user-sign-in.component';
import { CharacterManagerComponent } from '../../shared/character-manager/character-manager.component';

@Component({
  selector: 'app-character-create-test-page',
  standalone: true,
  imports: [UserSignInComponent, CharacterManagerComponent],
  templateUrl: './character-create-test-page.component.html',
  styleUrl: './character-create-test-page.component.css'
})
export class CharacterCreateTestPageComponent {

  currentUser = signal<User | null>(null);
  constructor() {}

  onUserLoad(user: User) {
    this.currentUser.set(user);
  }
}
