import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private baseURL = environment.apiURL;

  constructor(private client: HttpClient) { }

  public getCharacters() {
    return this.client.get<any[]>(`${this.baseURL}/characters`)
  }

  public getCharactersByBattleId(battleId: number) {
    return this.client.get<any[]>(`${this.baseURL}/characters`, {params: {battleIds: [battleId]}})
  }

  public getCharacterByBattleIdAndUserId(battleId: number, userId: number) {
    return this.client.get<any[]>(`${this.baseURL}/characters`, {params: {battleIds: [battleId], userIds: [userId]}})
  }

  public getCharacterByUserId(userId: number) {
    return this.client.get<any[]>(`${this.baseURL}/characters`, {params: {userIds: [userId]}})
  }

  public createCharacter(payload: Partial<Character>) {
    return this.client.post<any>(`${this.baseURL}/characters`, payload);
  }

  public updateCharacter(id: number, body : any) {
    return this.client.put<any>(`${this.baseURL}/characters/${id}`, body)
  }
}
