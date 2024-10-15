import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleGridComponent } from './battle-grid.component';

describe('BattleGridComponent', () => {
  let component: BattleGridComponent;
  let fixture: ComponentFixture<BattleGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
