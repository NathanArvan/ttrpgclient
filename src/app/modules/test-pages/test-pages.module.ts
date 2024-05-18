import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BasicCombatTestPageComponent } from './basic-combat-test-page/basic-combat-test-page.component';

const routes : Routes = [
    {
    path: 'basic-combat',
    component: BasicCombatTestPageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class TestPagesModule { }
