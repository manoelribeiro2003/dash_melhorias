import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import plannerJson from '../../../../../dados.json'

interface TarefaJson {
  'Nome da tarefa': string;
  'Categoria': string;
  'Meta': string | null;
  'Status': string;
  'Prioridade': string;
  'Criado por': string | null;
  'Criado em': string;
  'Data de conclusão': string | null;
  'Itens concluídos da lista de verificação': string | null;
  'Itens da lista de verificação': string | null;
}

interface Tarefa {
  nome: string,
  categoria: string,
  meta: string | null,
  status: string,
  prioridade: string,
  criadoPor: string | null,
  criadoEm: string,
  dataConclusao: string | null,
  itensConcluidos: number,
  totalItens: number,
  itensChecklist: string[]
}

@Component({
  selector: 'app-table-projects',
  imports: [
    MatTableModule,
    MatMenuTrigger,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './table-projects.html',
  styleUrl: './table-projects.scss',
})
export class TableProjects {

  tarefas: Tarefa[] = this.mapearTarefas(plannerJson)

  private mapearTarefas(data: TarefaJson[]): Tarefa[] {
  return data.map(item => {
    const [itensConcluidos = 0, totalItens = 0] =
      (item['Itens concluídos da lista de verificação'] ?? '0/0')
        .split('/')
        .map(Number);

    return {
      nome: item['Nome da tarefa'],
      categoria: item['Categoria'],
      meta: item['Meta'],
      status: item['Status'],
      prioridade: item['Prioridade'],
      criadoPor: item['Criado por'] ?? "Sem nome",
      criadoEm: item['Criado em'],
      dataConclusao: item['Data de conclusão'],
      itensConcluidos,
      totalItens,
      itensChecklist: item['Itens da lista de verificação']?.split(';').map(item => item.trim()) ?? []
    };
  });
}

  displayedColumns = [
    'nome',
    // 'categoria',
    // 'meta',
    // 'status',
    // 'prioridade',
    // 'criadoPor',
    // 'criadoEm',
    // 'dataConclusao',
    // 'itensConcluidos',
    // 'totalItens',
    // 'itensChecklist'
  ];

}
