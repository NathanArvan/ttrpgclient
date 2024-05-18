import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private baseURL = environment.apiURL;

  constructor(private client: HttpClient) { }

  public getCharacters() {
    return this.client.get(`${this.baseURL}/characters`)
  }

  public updateCharacter(id: number, body : any) {
    return this.client.put(`${this.baseURL}/characters/${id}`, body)
  }
}
