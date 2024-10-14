import { Component, Input, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CharacterService } from '../../../services/character.service';
import { Character } from '../../../models/character';
import { User } from '../../../models/user';
import { ClassService } from '../../../services/class.service';

@Component({
  selector: 'app-character-manager',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './character-manager.component.html',
  styleUrl: './character-manager.component.css'
})
export class CharacterManagerComponent implements OnInit {
  @Input()
  currentUser!: User | null;

  public classes = signal<any[]>([]);
  public characters = signal<Character[]>([]);

  public createCharacterForm: FormGroup = new FormGroup({
    name: new FormControl(),
    classId : new FormControl()
  })

  constructor(
    private characterService: CharacterService,
    public classService: ClassService
  ) {}

  ngOnInit(): void {
    this.getClasses();
    this.getCharactersForUser();
  }

  createCharacter() {
    const classId = this.createCharacterForm.controls["classId"].value;
    const character: Partial<Character> = {
      name: this.createCharacterForm.controls["name"].value,
      classId,
      userId: this.currentUser?.userId,
      image: this.classService.getImageByClassId(classId)
    }
    this.characterService.createCharacter(character).subscribe(character => {
      let previousCharacters = this.characters();
      previousCharacters.push(character);
      this.characters.set(previousCharacters);
    });
  }

  getClasses() {
    this.classService.getClasses().subscribe(classes => {
      this.classes.set(classes);
    });
  }

  getCharactersForUser() {
    if (this.currentUser !== null && this.currentUser.userId !== null) {
      this.characterService.getCharacterByUserId(this.currentUser.userId).subscribe(characters => {
        this.characters.set(characters);
      })
    }
  }

  // getClassNameById(id: number | null): string {
  //   const currentClasses = this.classes();
  //   const foundClass = currentClasses.find(currentClass => {
  //     return currentClass.id === id; 
  //   })
  //   if (foundClass === undefined) {
  //     return "";
  //   }
  //   return foundClass.name;
  // }
}
