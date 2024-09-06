import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Battle } from '../models/battle';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  private baseURL = environment.apiURL;

  constructor(private client: HttpClient) { }

  public getBattle(id: number) {
    return this.client.get<Battle>(`${this.baseURL}/battle/${id}`)
  }

  public createBattle() {
    return this.client.post<Battle>(`${this.baseURL}/battle/`, {})
  }

  public updateBattle(body: Battle) {
    return this.client.put<Battle>(`${this.baseURL}/battle/`, body)
  }
}
