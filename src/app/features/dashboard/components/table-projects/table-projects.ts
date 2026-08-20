import { AfterViewInit, Component, effect, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, DatePipe } from '@angular/common';
import { GetTasks } from '../../services/get-tasks/get-tasks';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Tarefa } from '../../models/tarefa.interface';
import { MatDividerModule } from '@angular/material/divider';

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
    MatDividerModule
  ],
  templateUrl: './table-projects.html',
  styleUrl: './table-projects.scss',
})
export class TableProjects implements AfterViewInit {
  private tasks = inject(GetTasks);
  constructor() {
    effect(() => {
      this.dataSource.data = this.tasks.tarefas()
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Tarefa>(this.tasks.tarefas());
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
    'criadoPor',
    'criadoEm',
    'dataConclusao',
    'itensConcluidos',
    'totalItens',
    'itensChecklist'
  ];
  displayedColumns: string[] = ['nome', 'criadoPor', 'status', 'criadoEm', 'itensConcluidos', 'dataConclusao', 'acoes'];

}
