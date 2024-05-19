import { Routes } from '@angular/router';
import { MapViewComponent } from './map-view/map-view.component';

export const routes: Routes = [
    {
        component: MapViewComponent,
        path: 'maps/:id'
    },  
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin-pages/admin-pages.module').then(m => m.AdminPagesModule)
    },
    {
        path: 'test-pages',
        loadChildren: () => import('./modules/test-pages/test-pages.module').then(m => m.TestPagesModule)
    }
];
