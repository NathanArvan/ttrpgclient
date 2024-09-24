import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as signalR from '@microsoft/signalr';
import { User } from '../../../models/user';
 
@Component({
  selector: 'app-websocket-test',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './websocket-test.component.html',
  styleUrl: './websocket-test.component.css'
})
export class WebsocketTestComponent {

  @Input() battleId : number | null = null

  // public subject = webSocket(`wss://localhost:7144/battle/users`);
  public connection = new signalR.HubConnectionBuilder()
    .withUrl("/Combat")
    .build();

  public websocketMessageForm: FormGroup = new FormGroup(
    {message: new FormControl()}
  )

  constructor() {
    this.connection.on("UserJoined", (message) => {
      console.log(`user joined, now these are the users ${message}`);
    })
  }

  sendMessage() {
    const user: User = {
      name: 'Test User',
      userId: 1,
      email: 'test@email.com',
      characters: null
    }
    const serializedUser = JSON.stringify(user);
    this.connection.invoke("UserJoinedBattle", 1, serializedUser)
  }

}
