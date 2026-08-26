import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProjetoJson } from '../../models/projeto/projeto-json.interface';
import { Projeto } from '../../models/projeto/projeto.interface';

@Injectable({
    providedIn: 'root'
})
export class GetProjetos {
    private http = inject(HttpClient);

    // private _tarefas = signal<Tarefa[]>([]);
    projetos = signal<Projeto[]>([]);

    // readonly tarefas = this._tarefas.asReadonly()

    carregar(): void {

        this.http.get<ProjetoJson[]>('http://localhost:3000/projetos/').subscribe({
            next: (dados) => {
                // this._tarefas.set(this.mapearTarefas(dados));
                this.projetos.set(this.mapearTarefas(dados));
            },
            error: (erro) => {
                console.error(erro);
            }
        });
    }

    private mapearTarefas(projeto: ProjetoJson[]): Projeto[] {
        return projeto.map(item => {

            const dataInicio = item.dataInicio?.split('-').map(Number)
            const dataTermino = item.dataTermino?.split('-').map(Number)

            const projetos = {
                id: item.id,
                nome: item.nome,
                categoria: item.categoria,
                status: item.status,
                dataInicio: dataInicio !== undefined ? new Date(dataInicio[0], dataInicio[1], dataInicio[2]) : null,
                dataTermino: dataTermino !== undefined ? new Date(dataTermino[0], dataTermino[1], dataTermino[2]) : null,
                orcamento: item.orcamento,
                prioridade: item.prioridade,
                criadoPor: item.criadoPor,
                tarefas: item.tarefas,
                tarefasConcluidas: item.tarefas.filter(tarefa => tarefa.concluido).length,
                totalTarefas: item.tarefas.length,
                criadoEm: new Date(item.createdAt),
                atualizadoEm: new Date(item.updatedAt),
                atrasado: item.dataTermino &&
                    item.status !== 'Concluída'
                    ? new Date(item.dataTermino) < new Date()
                    : false
            }

            return projetos;
        });
    }
}