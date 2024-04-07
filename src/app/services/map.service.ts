import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Map, MapCreateDTO } from '../models/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private baseURL = environment.apiURL;

  constructor(private client: HttpClient) { }

  public getMaps() : Observable<Map[]> {
    return this.client.get<Map[]>(`${this.baseURL}/maps`);
  }

  public getMap(mapId: number): Observable<Map> {
    return this.client.get<Map>(`${this.baseURL}/maps/${mapId}`)
  }

  public createMap(map: MapCreateDTO): Observable<Map> {
    return this.client.post<Map>(`${this.baseURL}/maps}`, map);
  }
}
