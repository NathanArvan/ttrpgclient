import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Token } from '../models/token';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private baseURL = environment.apiURL;
  
  constructor(private client: HttpClient) { }

  public getTokensWithImages(): Observable<Token[]> {
    return this.client.get<Token[]>(`${this.baseURL}/tokens/tokensWithImages`);
  }

  public updateToken(body: Token) {
    return this.client.put<Token>(`${this.baseURL}/tokens`,body);
  }

  public getMockTokens(): Observable<Token[]> {
    const result : Token[] = [{
      tokenId: 1,
      src: 'assets/game-art/Tiny RPG Character Asset Pack v1.03 -Free Soldier&Orc/Characters(100x100)/Soldier/Soldier/Soldier-Idle.png',
      xPosition: 1,
      yPosition: 1,
      mapId: 1,
      CharacterId: 1,
      image: null
    },
    {
      tokenId: 2,
      src: 'assets/game-art/Tiny RPG Character Asset Pack v1.03 -Free Soldier&Orc/Characters(100x100)/Orc/Orc/Orc-Idle.png',
      xPosition: 4,
      yPosition: 4,
      mapId: 1,
      CharacterId: 1,
      image: null
    }
  ]
    return of(result);
  }
}
