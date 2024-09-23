import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { webSocket } from 'rxjs/webSocket'
 
@Component({
  selector: 'app-websocket-test',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './websocket-test.component.html',
  styleUrl: './websocket-test.component.css'
})
export class WebsocketTestComponent {

  @Input() battleId : number | null = null

  public subject = webSocket(`ws://localhost:7144/battle/${this.battleId}/users`);

  public websocketMessageForm: FormGroup = new FormGroup(
    {message: new FormControl()}
  )

  constructor() {
    this.subject.subscribe(message => console.log(message));
  }

  sendMessage() {
    this.subject.next({message: this.websocketMessageForm.controls['message'].value});
  }

}
