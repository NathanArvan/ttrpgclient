import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = environment.apiURL;

  constructor(private client: HttpClient) { }

  public getUserByEmail(email: string): Observable<User> {
    return this.client.get<User>(`${this.baseURL}/users/${email}`)
  }

  public createUser(user: User): Observable<User> {
    return this.client.post<User>(`${this.baseURL}/users`, user);
  }
}
