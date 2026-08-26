import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProjetoJson } from '../../models/projeto/projeto-json.interface';
import { Projeto } from '../../models/projeto/projeto.interface';
import { Tarefa } from '../../models/tarefa/tarefa.interface';

interface Data {
    ano: number,
    mes: number,
    dia: number
}

@Injectable({
    providedIn: 'root'
})
export class GetProjetos {
    private http = inject(HttpClient);

    // private _tarefas = signal<Tarefa[]>([]);
    projetos = signal<Projeto[]>([]);

    // readonly tarefas = this._tarefas.asReadonly()

    carregar(): void {

        this.http.get<ProjetoJson[]>('/dados.json').subscribe({
            next: (dados) => {
                // this._tarefas.set(this.mapearTarefas(dados));
                this.projetos.set(this.mapearTarefas(dados));
            },
            error: (erro) => {
                console.error(erro);
            }
        });
    }

    private mapearTarefas(data: ProjetoJson[]): Projeto[] {
        return data.map(item => {
            const [tarefasConcluidas = 0, totalTarefas = 0] =
                (item['Itens concluídos da lista de verificação'] ?? '0/0')
                    .split('/')
                    .map(Number);

            const criadoEm = item['Criado em'].split('-').map(Number)
            const dataConclusao = item['Data de conclusão']?.split('-').map(Number) ?? null
    
            const tarefas: Tarefa[] = item['Itens concluídos da lista de verificação']?.split(';').map((nome, index) => ({
                ordem: index + 1,
                nome: nome,
                concluido: false,
                projetoId: item['Identificação da tarefa']
            })) ?? []

            return {
                id: item['Identificação da tarefa'],
                nome: item['Nome da tarefa'],
                categoria: item['Categoria'],
                meta: item['Meta'],
                status: item['Status'],
                prioridade: item['Prioridade'],
                atrasado: item['Atrasados'],
                criadoPor: item['Criado por'] ?? "Sem nome",
                criadoEm: new Date(criadoEm[0], criadoEm[1] - 1, criadoEm[2]),
                dataConclusao: dataConclusao !== null ? new Date(dataConclusao[0], dataConclusao[1] - 1, dataConclusao[2]) : null,
                orcamento: item['Orçamento'],
                tarefasConcluidas: tarefasConcluidas,
                totalTarefas: totalTarefas,
                tarefas: tarefas
            };
        });
    }
}