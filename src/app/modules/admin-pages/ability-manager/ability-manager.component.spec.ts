import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityManagerComponent } from './ability-manager.component';

describe('AbilityManagerComponent', () => {
  let component: AbilityManagerComponent;
  let fixture: ComponentFixture<AbilityManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilityManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbilityManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
