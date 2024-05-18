import { TestBed } from '@angular/core/testing';

import { AbilityService } from './ability.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AbilityService', () => {
  let service: AbilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(AbilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
