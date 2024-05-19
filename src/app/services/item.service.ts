import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { CreateItemDto, Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseURL = environment.apiURL;

  constructor(private client: HttpClient) { }

  public getItems() {
    return this.client.get<Item[]>(`${this.baseURL}/items`);
  }

  public createItem(item: CreateItemDto) {
    return this.client.post<Item>(`${this.baseURL}/items`, item)
  }

  public updateItem(item: any) {
    return this.client.put<Item>(`${this.baseURL}/items`, item)
  }
}
