import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAndObstacleTestPageComponent } from './item-and-obstacle-test-page.component';

describe('ItemAndObstacleTestPageComponent', () => {
  let component: ItemAndObstacleTestPageComponent;
  let fixture: ComponentFixture<ItemAndObstacleTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemAndObstacleTestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemAndObstacleTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
