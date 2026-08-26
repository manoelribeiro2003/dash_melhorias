import { Tarefa } from "../tarefa/tarefa.interface";

export interface Projeto {
  id: number,                   // ok
  nome: string,                 // ok
  categoria: string,            // ok
  status: string,               // ok
  dataInicio: Date,             // ok
  dataTermino: Date | null,     // ok
  orcamento: string;            // ok
  prioridade: boolean,          // ok
  tarefas: Tarefa[]             // ok nao faz sentido  ter
  criadoPorId: number,           // ok
  tarefasConcluidas: number,    // não há no banco
  totalTarefas: number,         // não há no banco
}