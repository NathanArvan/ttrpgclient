import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Map, MapCreateDTO } from '../models/map';
import { Observable, of } from 'rxjs';

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

  public getTestMap() : Observable<Map> {
    const test: Map = { length : 5, width: 10, mapId: 1, campaignId: 1, image: '', tokens: []}
    return of(test);
  }

  public createMap(map: MapCreateDTO): Observable<Map> {
    return this.client.post<Map>(`${this.baseURL}/maps`, map);
  }

  public updateMap(map: MapCreateDTO): Observable<Map> {
    return this.client.put<Map>(`${this.baseURL}/maps`, map);
  }
}
