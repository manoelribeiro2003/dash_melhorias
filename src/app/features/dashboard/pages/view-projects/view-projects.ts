import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProjectsCard } from '../../components/projects-card/projects-card';
import { GetTasks } from '../../services/get-tasks/get-tasks';
import { CardStatus } from "../../components/card-status/card-status";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

type CardValues = {
  icon: string,
  title: string,
  status?: string,
  atrasado?: boolean
}

@Component({
  selector: 'app-view-projects',
  imports: [
    ProjectsCard,
    MatButtonModule,
    CardStatus
  ],
  templateUrl: './view-projects.html',
  styleUrl: './view-projects.scss',
})

export class ViewProjects {
  private tasks = inject(GetTasks);
  tarefas = this.tasks.tarefas;

  cardValues: CardValues[] = [
    {icon: "totalProjetos", title: "Total de Projetos", status: 'TotalDeProjetos'},
    {icon: "emAndamento", title: "Em Andamento", status: 'Em andamento'},
    {icon: "concluidos", title: "Concluídos", status: 'Concluída' },
    {icon: "naoIniciados", title: "Não Iniciados", status: 'Não iniciado' },
    {icon: "atrasado", title: "Atrasados", status: '', atrasado: true },
  ]

  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.iconRegistry.addSvgIcon(
      'naoIniciados',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'dashboard/card-status/naoIniciados.svg'
      )
    );

    this.iconRegistry.addSvgIcon(
      'concluidos',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'dashboard/card-status/concluidos.svg'
      )
    );

    this.iconRegistry.addSvgIcon(
      'emAndamento',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'dashboard/card-status/emAndamento.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'totalProjetos',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'dashboard/card-status/totalProjetos.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'atrasado',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'dashboard/card-status/atrasado.svg'
      )
    );
  }
}
