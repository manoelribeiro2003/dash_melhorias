import { AfterViewInit, Component, effect, inject, viewChild, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, DatePipe } from '@angular/common';
import { GetProjetos } from '../../services/get-projetos/get-projetos';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Projeto } from '../../models/projeto.interface';
import { MatDividerModule } from '@angular/material/divider';
import { DecimalPipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DialogProject } from '../dialog-project/dialog-project';

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

  private tasks = inject(GetProjetos);
  dataSource = new MatTableDataSource<Projeto>(this.tasks.projetos());

  readonly menuTrigger = viewChild.required(MatMenuTrigger);

  readonly dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      this.dataSource.data = this.tasks.projetos()
    })

    // this.abrirDialog()
  }

  abrirDialog(): void {
    this.dialog.open(DialogProject, {
      width: '80vw',
      maxWidth: '1500px',
      // height: '90vh',
    })
  }

  removerPorIndice(item: Projeto) {
    this.tasks.projetos.update(projetos =>
      projetos.filter((p) => p !== item)
    );
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  tableColumns: string[] = [
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
    'itensConcluidos',
    'totalItens',
    'itensChecklist'
  ];
  displayedColumns: string[] = ['nome', 'criadoPor', 'status', 'criadoEm', 'itensConcluidos', 'dataConclusao', 'orcamento', 'acoes'];

}