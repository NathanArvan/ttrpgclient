import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerTestPageComponent } from './multiplayer-test-page.component';

describe('MultiplayerTestPageComponent', () => {
  let component: MultiplayerTestPageComponent;
  let fixture: ComponentFixture<MultiplayerTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiplayerTestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiplayerTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
