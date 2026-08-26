import { AfterViewInit, Component, effect, inject, signal, viewChild, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, DatePipe } from '@angular/common';
import { GetProjetos } from '../../services/get-projetos/get-projetos';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { DecimalPipe } from '@angular/common';
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
    DecimalPipe,
    MatDialogModule
  ],
  templateUrl: './table-projects.html',
  styleUrl: './table-projects.scss',
})
export class TableProjects implements AfterViewInit {
  private projetosService = inject(GetProjetos);
  dataSource = new MatTableDataSource<Projeto>(this.projetosService.projetos());

  readonly dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      this.dataSource.data = this.projetosService.projetos()
    })
  }

  openDialog(projeto: Projeto): void {
    const dialogRef = this.dialog.open(DialogProject, {
      width: '80vw',
      maxWidth: '1500px',
      data: projeto
    });

    dialogRef.afterClosed().subscribe((projetoRetornado: Projeto | undefined) => {
      if (projetoRetornado !== undefined) {
        this.projetosService.projetos.update(projetos =>
          projetos.map(p =>
            p.id === projetoRetornado.id
              ? projetoRetornado
              : p
          )
        );
      }
    });
  }

  removerPorIndice(item: Projeto) {
    this.projetosService.projetos.update(projetos =>
      projetos.filter((p) => p !== item)
    );
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  tableColumns: string[] = [
    'id',
    'nome',
    'categoria',
    'meta',
    'status',
    'prioridade',
    'atrasado',
    'orcamento',
    'criadoPor',
    'criadoEm',
    'dataConclusao',
    'tarefasConcluidas',
    'totalTarefas',
    'tarefas'
  ];
  displayedColumns: string[] = [
    'nome',
    'criadoPor',
    'status',
    'criadoEm',
    'tarefasConcluidas',
    'dataConclusao',
    'orcamento',
    'acoes'
  ];

}