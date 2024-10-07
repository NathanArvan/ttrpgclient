import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CharacterService } from '../../../services/character.service';
import { Character } from '../../../models/character';
import { User } from '../../../models/user';

@Component({
  selector: 'app-character-manager',
  standalone: true,
  imports: [],
  templateUrl: './character-manager.component.html',
  styleUrl: './character-manager.component.css'
})
export class CharacterManagerComponent {
  @Input()
  currentUser!: User;

  public createCharacterForm: FormGroup = new FormGroup({
    name: new FormControl(),
    classId : new FormControl()
  })

  constructor(
    private characterService: CharacterService
  ) {}

  createCharacter() {
    const character: Partial<Character> = {
      name: this.createCharacterForm.controls["name"].value,
      classId: this.createCharacterForm.controls["classId"].value,
      userId: this.currentUser?.userId,
    }
    this.characterService.createCharacter(character).subscribe(character => {
    });
  }

}
