export interface Tarefa {
  nome: string,
  categoria: string,
  meta: string | null,
  status: string,
  prioridade: string,
  criadoPor: string | null,
  criadoEm: string,
  dataConclusao: string | null,
  atrasado: boolean;
  orcamento: number;
  itensConcluidos: number,
  totalItens: number,
  itensChecklist: string[]
}