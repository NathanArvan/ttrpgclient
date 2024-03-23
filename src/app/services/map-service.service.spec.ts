import { TestBed } from '@angular/core/testing';

import { MapServiceService } from './map-service.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('MapServiceService', () => {
  let service: MapServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(MapServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
