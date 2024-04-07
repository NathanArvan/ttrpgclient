import { Routes } from '@angular/router';
import { MapViewComponent } from './map-view/map-view.component';
import { MapManagerComponent } from './modules/admin-pages/map-manager/map-manager.component';

export const routes: Routes = [
    {
        component: MapViewComponent,
        path: 'maps/:id'
    },  
    {
        component: MapManagerComponent,
        path: 'admin/map-manager'

    }
];
