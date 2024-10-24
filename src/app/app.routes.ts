import { Routes } from '@angular/router';

export const routes: Routes = [ 
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin-pages/admin-pages.module').then(m => m.AdminPagesModule)
    },
    {
        path: 'test-pages',
        loadChildren: () => import('./modules/test-pages/test-pages.module').then(m => m.TestPagesModule)
    }
];
