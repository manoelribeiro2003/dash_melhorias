import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProjetoJson } from '../../models/projeto-json.interface';
import { Projeto } from '../../models/projeto.interface';
import { Tarefa } from '../../models/tarefa.interface';

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
            const [itensConcluidos = 0, totalItens = 0] =
                (item['Itens concluídos da lista de verificação'] ?? '0/0')
                    .split('/')
                    .map(Number);
            
            const tarefas: Tarefa[] = item['Itens concluídos da lista de verificação']?.split(';').map((nome,index) => ({
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
                criadoEm: item['Criado em'],
                dataConclusao: item['Data de conclusão'],
                orcamento: item['Orçamento'],
                itensConcluidos: itensConcluidos,
                totalItens: totalItens,
                itensChecklist: tarefas
            };
        });
    }
}