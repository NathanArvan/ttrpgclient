import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
