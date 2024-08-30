import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaserTestPageComponent } from './phaser-test-page.component';

describe('PhaserTestPageComponent', () => {
  let component: PhaserTestPageComponent;
  let fixture: ComponentFixture<PhaserTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaserTestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhaserTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
