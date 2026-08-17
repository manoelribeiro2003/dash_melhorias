export interface TarefaJson {
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