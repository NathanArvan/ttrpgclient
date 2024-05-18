import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
