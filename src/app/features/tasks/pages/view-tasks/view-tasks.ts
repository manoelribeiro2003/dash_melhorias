import { Component, inject } from '@angular/core';
import { CardStatusTasks } from '../../components/card-status/card-status';
import { ProjetoService } from '../../../../shared/services/projeto/projeto.service';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { groupBy } from '../../../../shared/utils/group-by';
import { Projeto } from '../../../../shared/models/projeto/projeto.interface';
import { DatePipe } from '@angular/common';
import { Tarefa } from '../../../../shared/models/tarefa/tarefa.interface';

type CardValues = {
  icon: string,
  title: string,
  status?: string,
  atrasado?: boolean
}

type PessoaProjetos = {
  nome: string;
  projetos: Projeto[];
};


@Component({
  selector: 'app-view-tasks',
  imports: [
    CardStatusTasks,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDividerModule,
    MatDialogModule,
    MatSortModule,
    MatCardModule,
    DatePipe
  ],
  templateUrl: './view-tasks.html',
  styleUrl: './view-tasks.scss',
})
export class ViewTasks {

  private projetosService = inject(ProjetoService);
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  readonly projetos = this.projetosService.projetos().map(projetos => {

    const projeto: Projeto = {
      ...projetos,
      tarefas: projetos.tarefas.filter(tarefa => !tarefa.concluido),
    }

    return projeto
  }).filter(projeto => projeto.status !== 'Concluída' && projeto.status !== 'Não iniciado')

  projetos_p_nome = groupBy(this.projetos, projeto => projeto.criadoPor.nome)

  dataSource: PessoaProjetos[] = Array.from(this.projetos_p_nome.entries()).map(([nome, projetos]) => ({ nome, projetos }));
  displayedColumns = ['nome', 'prazo', 'projetos',]

  columnsToDisplay = ['nome'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  expandedElement: PessoaProjetos | null = null; expandedProjeto: Projeto | null = null;
  toggleRow(pessoa: PessoaProjetos): void {
    if (this.expandedElement === pessoa) {
      this.expandedElement = null;
      this.expandedProjeto = null;
      return;
    }
    this.expandedElement = pessoa;
    this.expandedProjeto = null;
  }
  toggleProjeto(projeto: Projeto, event: Event): void {
    event.stopPropagation(); 
    this.expandedProjeto = this.expandedProjeto === projeto ? null : projeto;
  }

  cardValues: CardValues[] = [
    { icon: "totalProjetos", title: "Tarefas da Semana", status: 'TotalDeProjetos' },
    { icon: "emAndamento", title: "Em Andamento", status: 'Em andamento' },
    { icon: "concluidos", title: "Concluídas", status: 'Concluída' },
    { icon: "naoIniciados", title: "Não Iniciadas", status: 'Não iniciado' },
    { icon: "atrasado", title: "Atrasadas", status: '', atrasado: true },
  ]


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