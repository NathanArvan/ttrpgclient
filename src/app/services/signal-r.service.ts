import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { UserJoinedDTO } from '../models/battle';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7144/combat")
    .build();
   }

   startConnection(): Observable<void> {
    return new Observable<void>((observer) => {
      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection established with SignalR hub');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.error('Error connecting to SignalR hub:', error);
          observer.error(error);
        });
    });
  }

  receiveMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.hubConnection.on('UserJoinedBattle', (message: string) => {
        observer.next(message);
      });
    });
  }

  
  userJoined(user : User): void {
    const payload : UserJoinedDTO = {
      battleId : 1,
      user
    }
    this.hubConnection.invoke('UserJoinedBattle', JSON.stringify(payload));
  }
}
