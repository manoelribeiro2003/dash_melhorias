import { Tarefa } from "../tarefa/tarefa.interface";
import { Usuario } from "../usuario/usuario.interface";

export interface Projeto {
  id: number,                   // ok
  nome: string,                 // ok
  categoria: string,            // ok
  status: string,               // ok
  dataInicio: Date | null,      // ok
  dataTermino: Date | null,     // ok
  orcamento: string | null,            // ok
  prioridade: boolean,          // ok
  criadoPor: Usuario,         // ok
  tarefas: Tarefa[]             // ok
  tarefasConcluidas: number,    // ok
  totalTarefas: number,         // ok
  atrasado: boolean,
  criadoEm: Date,
  atualizadoEm: Date
}