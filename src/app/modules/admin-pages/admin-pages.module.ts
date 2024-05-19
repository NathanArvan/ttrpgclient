import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { CharacterManagerComponent } from './character-manager/character-manager.component';
import { MapManagerComponent } from './map-manager/map-manager.component';
import { TokenManagerComponent } from './token-manager/token-manager.component';
import { AbilityManagerComponent } from './ability-manager/ability-manager.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomePageComponent
  },
  {
    path: 'character-manager',
    component: CharacterManagerComponent
  },
  {
    path: 'map-manager',
    component: MapManagerComponent
  },
  {
    path: 'token-manager',
    component: TokenManagerComponent
  },
  {
    path: 'ability-manager',
    component: AbilityManagerComponent
  }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminPagesModule { }
