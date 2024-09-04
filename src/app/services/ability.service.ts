import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Ability, CreateAbilityDTO } from '../models/ability';
import { of } from 'rxjs';

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

  public getMockAbilities() {
    const abilities: Ability[] = [
      { 
        abilityId: 1,
        name: 'Arrow',
        description: '',
        range: 30,
        requirements: [],
        target: 'creature',
        duration: 0,
        effect: '1d6 + dex modifier damage',
        image: 'assets/game-art/Tiny RPG Character Asset Pack v1.03 -Free Soldier&Orc/Arrow(Projectile)/Arrow01(32x32).png'
      }
    ] 
    return of(abilities);
  }
}
