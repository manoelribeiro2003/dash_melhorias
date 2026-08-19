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
                data:{
                    title: 'Dashborad',
                    description: 'Visão geral do projetos'
                }
            },
            {
                path: 'projetos',
                component: ViewProjects,
                data:{
                    title: 'Projetos',
                    description: 'Liste e acompanhe todo os projetos'
                }
            }
        ]
    },
    { 
        path: '**', 
        component: NotFound
    }
]