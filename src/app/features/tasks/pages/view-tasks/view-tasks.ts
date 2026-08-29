import { Component, inject } from '@angular/core';
import { CardStatusTasks } from '../../components/card-status/card-status';
import { ProjetoService } from '../../../../shared/services/projeto/projeto.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

type CardValues = {
  icon: string,
  title: string,
  status?: string,
  atrasado?: boolean
}

@Component({
  selector: 'app-view-tasks',
  imports: [CardStatusTasks],
  templateUrl: './view-tasks.html',
  styleUrl: './view-tasks.scss',
})
export class ViewTasks {

  private projetosService = inject(ProjetoService);
  projetos = this.projetosService.projetos;

  cardValues: CardValues[] = [
    { icon: "totalProjetos", title: "Tarefas da Semana", status: 'TotalDeProjetos' },
    { icon: "emAndamento", title: "Em Andamento", status: 'Em andamento' },
    { icon: "concluidos", title: "Concluídas", status: 'Concluída' },
    { icon: "naoIniciados", title: "Não Iniciadas", status: 'Não iniciado' },
    { icon: "atrasado", title: "Atrasadas", status: '', atrasado: true },
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
