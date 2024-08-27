import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, User, ArrowRight, Users, Zap } from 'angular-feather/icons';

const icons = {
  Camera,
  Heart,
  Github,
  User,
  Users,
  ArrowRight,
  Zap,
};


@NgModule({
  declarations: [],
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
