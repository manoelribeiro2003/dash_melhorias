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

type CardValues = {
  icon: string,
  title: string,
  status?: string,
  atrasado?: boolean
}

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
    MatSortModule
  ],
  templateUrl: './view-tasks.html',
  styleUrl: './view-tasks.scss',
})
export class ViewTasks {

  private projetosService = inject(ProjetoService);
  readonly projetos = this.projetosService.projetos();
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);


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

interface AtividadeTeste {
  id: number;
  nome: string;
  prazo: string;
  status: 'Concluída' | 'Em andamento' | 'Pendente' | 'Atrasada';
}

interface ProjetoTeste {
  id: number;
  nome: string;
  categoria: string;
  atividades: AtividadeTeste[];
}

interface PessoaTeste {
  id: number;
  nome: string;
  cargo: string;
  iniciais: string;
  projetos: ProjetoTeste[];
}

const pessoas: PessoaTeste[] = [
  {
    id: 1,
    nome: 'Manoel Ribeiro',
    cargo: 'Analista de Processos',
    iniciais: 'MR',
    projetos: [
      {
        id: 1,
        nome: 'Automação do Processo de Cadastro',
        categoria: 'RPA',
        atividades: [
          {
            id: 1,
            nome: 'Levantar regras do processo',
            prazo: '26/08',
            status: 'Concluída'
          },
          {
            id: 2,
            nome: 'Desenvolver automação',
            prazo: '28/08',
            status: 'Em andamento'
          },
          {
            id: 3,
            nome: 'Testar automação',
            prazo: '29/08',
            status: 'Em andamento'
          }
        ]
      },
      {
        id: 2,
        nome: 'Padronização de Documentos',
        categoria: 'Melhoria',
        atividades: [
          {
            id: 4,
            nome: 'Revisar documentação',
            prazo: '30/08',
            status: 'Pendente'
          }
        ]
      }
    ]
  }
];