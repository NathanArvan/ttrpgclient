import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCombatTestPageComponent } from './basic-combat-test-page.component';

describe('BasicCombatTestPageComponent', () => {
  let component: BasicCombatTestPageComponent;
  let fixture: ComponentFixture<BasicCombatTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicCombatTestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicCombatTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
