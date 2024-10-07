import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './user-sign-in.component.html',
  styleUrl: './user-sign-in.component.css'
})
export class UserSignInComponent {
  @Output() userLoaded = new EventEmitter();

  public createUserForm: FormGroup = new FormGroup(
    {
      name: new FormControl(),
      email: new FormControl()
    }
  )
  public loadUserForm: FormGroup = new FormGroup(
    {email: new FormControl()}
  )
  
  constructor(
    private userService: UserService,
  ) {}

  createUser() {
    const user: User = {
      name : this.createUserForm.controls['name'].value,
      email : this.createUserForm.controls['email'].value,
      userId: null,
      characters : null,
    }
    this.userService.createUser(user).subscribe(user => {
      this.userLoaded.emit(user);
    })
  }

  loadUser() {
    const email = this.loadUserForm.controls['email'].value;
    this.userService.getUserByEmail(email).subscribe(user => {
      this.userLoaded.emit(user);
    })
  }
}
