import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Token } from '../models/token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private baseURL = environment.apiURL;
  
  constructor(private client: HttpClient) { }

  public getTokensWithImages(): Observable<Token[]> {
    return this.client.get<Token[]>(`${this.baseURL}/tokens/tokensWithImages`)
  }
}
