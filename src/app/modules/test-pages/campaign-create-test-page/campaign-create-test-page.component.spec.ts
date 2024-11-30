import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCreateTestPageComponent } from './campaign-create-test-page.component';

describe('CampaignCreateTestPageComponent', () => {
  let component: CampaignCreateTestPageComponent;
  let fixture: ComponentFixture<CampaignCreateTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignCreateTestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampaignCreateTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
