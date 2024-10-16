import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private baseURL = environment.apiURL;

  public ClassImages = [
    {
      classId: 1,
      name: 'Warrior',
      image: '/assets/game-art/figma-assets/Warrior_Token.svg'
    },
    {
      classId: 2,
      name: 'Sage',
      image: '/assets/game-art/figma-assets/Sage_Token.svg',
    },
    {
      classId: 3,
      name: 'Thief',
      image: '/assets/game-art/figma-assets/Thief_Token.svg'
    }
  ]

  constructor(private client: HttpClient) { }

  public getClasses() {
    return this.client.get<any[]>(`${this.baseURL}/classes/`)
  }

  public getNameByClassId(classId: number | null) {
    const found = this.ClassImages.find(classIterator => classId === classIterator.classId);
    if (found === undefined) {
      return '';
    }
    return found.name;
  }

  public getImageByClassId(classId: number) {
    const found = this.ClassImages.find(classIterator => classId === classIterator.classId);
    if (found === undefined) {
      return '';
    }
    return found.image;
  }
}
