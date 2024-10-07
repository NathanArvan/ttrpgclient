import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCreateTestPageComponent } from './character-create-test-page.component';

describe('CharacterCreateTestPageComponent', () => {
  let component: CharacterCreateTestPageComponent;
  let fixture: ComponentFixture<CharacterCreateTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCreateTestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterCreateTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
