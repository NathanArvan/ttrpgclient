import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapManagerComponent } from './map-manager.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('MapManagerComponent', () => {
  let component: MapManagerComponent;
  let fixture: ComponentFixture<MapManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapManagerComponent],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
