import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterTutorialComponent } from './character-tutorial.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CharacterTutorialComponent', () => {
  let component: CharacterTutorialComponent;
  let fixture: ComponentFixture<CharacterTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterTutorialComponent],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
