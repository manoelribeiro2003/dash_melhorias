import { Routes } from '@angular/router';
import { Pages } from './pages';
import { ViewProjects } from '../../features/dashboard/pages/view-projects/view-projects';
import { Dashboard } from '../../features/dashboard/pages/dashboard/dashboard';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        component: Pages,
        children:[
            {
                path: '',
                component: Dashboard,
            },
            {
                path: 'projetos',
                component: ViewProjects
            }
        ]
    },
    { 
        path: '**', 
        component: NotFound
    }
]