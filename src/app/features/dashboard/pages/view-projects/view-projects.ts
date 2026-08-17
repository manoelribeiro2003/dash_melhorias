import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProjectsCard } from '../../components/projects-card/projects-card';
import { GetTasks } from '../../services/get-tasks/get-tasks';
import { CardStatus } from "../../components/card-status/card-status";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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

  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.iconRegistry.addSvgIcon(
      'atrasados',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'dashboard/card-status/atrasados.svg'
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
      'emPausa',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'dashboard/card-status/emPausa.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'totalProjetos',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'dashboard/card-status/totalProjetos.svg'
      )
    );
  }
}
