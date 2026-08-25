import { Tarefa } from "./tarefa.interface";

export interface Projeto {
  id: string,
  nome: string,
  categoria: string,
  meta: string | null,
  status: string,
  prioridade: string,
  atrasado: boolean;
  criadoPor: string | null,
  criadoEm: Date,
  dataConclusao: Date | null,
  orcamento: number;
  tarefasConcluidas: number,
  totalTarefas: number,
  tarefas: Tarefa[]
}