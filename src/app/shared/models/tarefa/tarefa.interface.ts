export interface Tarefa{
    id?: number;
    tempId?: string;
    nome: string;
    ordem: number;
    concluido: boolean;
    dataInicio?: Date;
    dataTermino?: Date
}