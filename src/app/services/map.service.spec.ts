import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('MapServiceService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
