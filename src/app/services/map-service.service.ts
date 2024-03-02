import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Map } from '../models/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {
  private baseURL = environment.apiURL;
  private headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:7144/");

  constructor(private client: HttpClient) { }

  public getMaps() : Observable<Map[]> {
    return this.client.get<Map[]>(`${this.baseURL}/maps`, {headers: this.headers});
  }

  public getMap(mapId: number): Observable<Map> {
    return this.client.get<Map>(`${this.baseURL}/maps/${mapId}`)
  }

  public createMap(map: Map): Observable<Map> {
    return this.client.post<Map>(`${this.baseURL}/maps}`, map);
  }
}
