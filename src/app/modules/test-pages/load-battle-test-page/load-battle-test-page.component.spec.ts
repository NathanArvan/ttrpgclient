import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBattleTestPageComponent } from './load-battle-test-page.component';

describe('LoadBattleTestPageComponent', () => {
  let component: LoadBattleTestPageComponent;
  let fixture: ComponentFixture<LoadBattleTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadBattleTestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadBattleTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
