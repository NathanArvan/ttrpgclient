import { Routes } from '@angular/router';
import { MapViewComponent } from './map-view/map-view.component';

export const routes: Routes = [{
    component: MapViewComponent,
    path: 'maps/:id'
}];
