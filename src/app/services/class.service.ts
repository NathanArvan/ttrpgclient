import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private baseURL = environment.apiURL;

  constructor(private client: HttpClient) { }

  public getClasses() {
    return this.client.get<any[]>(`${this.baseURL}/classes/`)
  }
}
