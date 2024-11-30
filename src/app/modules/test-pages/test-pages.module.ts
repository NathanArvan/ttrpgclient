import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CampaignCreateTestPageComponent } from './campaign-create-test-page/campaign-create-test-page.component';
import { LoadBattleTestPageComponent } from './load-battle-test-page/load-battle-test-page.component';
import { ItemAndObstacleTestPageComponent } from './item-and-obstacle-test-page/item-and-obstacle-test-page.component';

const routes : Routes = [
  {
    path: 'campaign-create',
    component: CampaignCreateTestPageComponent
  },
  {
    path: 'load-battle',
    component: LoadBattleTestPageComponent
  },
  {
    path: 'item-and-obstacle',
    component: ItemAndObstacleTestPageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class TestPagesModule { }
