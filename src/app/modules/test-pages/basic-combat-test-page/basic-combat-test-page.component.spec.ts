import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCombatTestPageComponent } from './basic-combat-test-page.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('BasicCombatTestPageComponent', () => {
  let component: BasicCombatTestPageComponent;
  let fixture: ComponentFixture<BasicCombatTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicCombatTestPageComponent],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicCombatTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.map = null;
    expect(component).toBeTruthy();
  });
});
