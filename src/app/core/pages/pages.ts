import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { Toobar } from '../../shared/components/toobar/toobar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-pages',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLinkWithHref,
    RouterLinkActive,
    Toobar
  ],
  templateUrl: './pages.html',
  styleUrl: './pages.scss',
})
export class Pages {
  menuItems = [
    { label: 'Dashboard', icon: 'home', route: '/', exact: true },
    { label: 'Projetos', icon: 'business_center', route: '/projetos', exact: false },
    { label: 'Tarefas', icon: 'assignment', route: '/tarefas', exact: true },
    { label: 'Cronograma', icon: 'calendar_month', route: '/cronograma', exact: true },
    { label: 'Kanban', icon: 'view_kanban', route: '/kanban', exact: true },
    { label: 'Recursos', icon: 'inventory_2', route: '/recursos', exact: true },
    { label: 'Equipe', icon: 'groups', route: '/equipe', exact: true },
    { label: 'Clientes', icon: 'people', route: '/clientes', exact: true },
    { label: 'Relatórios', icon: 'analytics', route: '/relatorios', exact: true },
    { label: 'Documentos', icon: 'description', route: '/documentos', exact: true },
    { label: 'Riscos', icon: 'warning', route: '/riscos', exact: true },
    { label: 'Financeiro', icon: 'account_balance_wallet', route: '/financeiro', exact: true },
    { label: 'Configurações', icon: 'settings', route: '/configuracoes', exact: true }
  ];

  shortcuts = [
    { label: 'Novo Projeto', icon: 'add', route: '/projetos/novo' },
    { label: 'Minhas Tarefas', icon: 'task_alt', route: '/tarefas/minhas' },
    { label: 'Calendário', icon: 'calendar_month', route: '/calendario' }
  ];

}
