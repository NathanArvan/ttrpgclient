import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BasicCombatTestPageComponent } from './basic-combat-test-page/basic-combat-test-page.component';
import { PhaserTestPageComponent } from './phaser-test-page/phaser-test-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiplayerTestPageComponent } from './multiplayer-test-page/multiplayer-test-page.component';

const routes : Routes = [
  {
    path: 'basic-combat',
    component: BasicCombatTestPageComponent
  },
  {
    path: 'phaserjs-test',
    component: PhaserTestPageComponent
  },
  {
    path: 'multiplayer-test',
    component: MultiplayerTestPageComponent
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
