import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Ability, CreateAbilityDTO } from '../models/ability';

@Injectable({
  providedIn: 'root'
})
export class AbilityService {
  private baseURL = environment.apiURL;

  constructor(private client: HttpClient) { }

  public getAbilities() {
    return this.client.get<any[]>(`${this.baseURL}/abilities`)
  }

  public createAbility(ability: any) {
    return this.client.post<CreateAbilityDTO>(`${this.baseURL}/abilities`, ability)
  }

  public updateAbility(ability: any) {
    return this.client.put<Ability>(`${this.baseURL}/abilities`, ability)
  }
}
