import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { TarefaJson } from '../../models/taferas-json.interface';
import { Tarefa } from '../../models/tarefa.interface';

@Injectable({
    providedIn: 'root'
})
export class GetTasks {
    private http = inject(HttpClient);

    private carregado = false;

    private _tarefas = signal<Tarefa[]>([]);

    readonly tarefas = this._tarefas.asReadonly()

    carregar(): void {
        if (this.carregado) {
            return;
        }

        this.carregado = true;

        this.http.get<TarefaJson[]>('/dados.json').subscribe({
            next: (dados) => {
                this._tarefas.set(this.mapearTarefas(dados));
            },
            error: (erro) => {
                this.carregado = false;
                console.error(erro);
            }
        });
    }

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
}