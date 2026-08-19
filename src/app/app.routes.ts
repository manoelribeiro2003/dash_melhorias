import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./core/pages/pages.routes').then(p => p.routes),
    }
];
