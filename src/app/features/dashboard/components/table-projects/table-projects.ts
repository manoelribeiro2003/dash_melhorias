import { AfterViewInit, Component, effect, inject, input, signal, viewChild, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, DatePipe, CurrencyPipe } from '@angular/common';
import { ProjetoService } from '../../services/projeto/projeto.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DialogProject } from '../dialog-project/dialog-project';
import { Projeto } from '../../models/projeto/projeto.interface';

@Component({
  selector: 'app-table-projects',
  imports: [
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    NgClass,
    DatePipe,
    MatPaginatorModule,
    MatDividerModule,
    MatDialogModule,
    CurrencyPipe
  ],
  templateUrl: './table-projects.html',
  styleUrl: './table-projects.scss',
})
export class TableProjects implements AfterViewInit {

  readonly projetosService = inject(ProjetoService);
  readonly dataSource = new MatTableDataSource<Projeto>(this.projetosService.projetos());
  @ViewChild(MatPaginator) readonly paginator!: MatPaginator;
  readonly dialog = inject(MatDialog);
  readonly filtroCategoria = input.required<string>();
  readonly filtroStatus = input<string>('');

  constructor() {
    effect(() => {
      this.aplicarFiltros();
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private aplicarFiltros(): void {
    const projetos = this.projetosService.projetos();

    this.dataSource.data = projetos.filter(projeto => {
      const categoriaOk = !this.filtroCategoria() || projeto.categoria === this.filtroCategoria();

      const filtroStatus = this.filtroStatus();

      const statusOk =
        !filtroStatus
          ? true
          : filtroStatus === 'Atrasado'
            ? projeto.atrasado
            : projeto.status === filtroStatus;

      return categoriaOk && statusOk;

    });
  }






  openDialog(projeto: Projeto): void {

    const dialogRef = this.dialog.open(DialogProject, {
      width: '80vw',
      maxWidth: '1500px',
      data: projeto
    });

    dialogRef.afterClosed().subscribe((projetoRetornado: Projeto | undefined) => {
      if (projetoRetornado === undefined) {
        return;
      }
      this.projetosService.atualizarProjeto(projetoRetornado);
    });
  }




  tableColumns: string[] = [
    'id',
    'nome',
    'categoria',
    'status',
    'dataInicio',
    'dataTermino',
    'orcamento',
    'prioridade',
    'criadoPor',
    'tarefas',
    'tarefasConcluidas',
    'totalTarefas',
    'atrasado',
    'criadoEm',
    'atualizadoEm',
  ];
  displayedColumns: string[] = [
    'nome',
    'criadoPor',
    'status',
    'dataInicio',
    'tarefasConcluidas',
    'dataTermino',
    'orcamento',
    'acoes'
  ];

}