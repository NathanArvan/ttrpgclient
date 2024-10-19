import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { CharacterMessageDTO, UserJoinedDTO } from '../models/battle';
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

  receiveUserJoinedBattleMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.hubConnection.on('UserJoinedBattle', (message: string) => {
        observer.next(message);
      });
    });
  }
  
  userJoined(payload : UserJoinedDTO): void {
    this.hubConnection.invoke('UserJoinedBattle', JSON.stringify(payload));
  }

  receiveCharacterJoinedBattleMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.hubConnection.on('CharacterJoinedBattle', (message: string) => {
        observer.next(message);
      });
    });
  }

  
  characterJoined(payload : CharacterMessageDTO): void {
    this.hubConnection.invoke('CharacterJoinedBattle', JSON.stringify(payload));
  }

  receiveCharacterUpdatedMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.hubConnection.on('CharacterUpdated', (message: string) => {
        observer.next(message);
      });
    });
  }

  
  characterUpdated(payload : CharacterMessageDTO): void {
    this.hubConnection.invoke('CharacterUpdated', JSON.stringify(payload));
  }
}
