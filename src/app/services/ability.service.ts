import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AbilityService {
  private baseURL = environment.apiURL;

  constructor(private client: HttpClient) { }

  public getAbilities() {
    return this.client.get(`${this.baseURL}/abilities`)
  }
}
