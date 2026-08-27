import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProjetoJson } from '../../models/projeto/projeto-json.interface';
import { Projeto } from '../../models/projeto/projeto.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GetProjetos {

    private apiUrl = 'http://localhost:3000';
    private http = inject(HttpClient);

    private _projetos = signal<Projeto[]>([]);
    readonly projetos = this._projetos.asReadonly()

    carregar(): void {
        this.http.get<ProjetoJson[]>(`${this.apiUrl}/projetos/`).subscribe({
            next: (dados) => {
                this._projetos.set(this.mapearTarefas(dados));
            },
            error: (erro) => {
                console.error(erro);
            }
        });
    }

    atualizarProjeto(projeto: Projeto): void {

        const dados = {
            nome: projeto.nome,
            categoria: projeto.categoria,
            status: projeto.status,
            dataInicio: projeto.dataInicio,
            dataTermino: projeto.dataTermino,
            orcamento: projeto.orcamento,
            prioridade: projeto.prioridade,
            criadoPorId: projeto.criadoPor.id,
            tarefas: projeto.tarefas.map(tarefa => ({
                id: tarefa.id,
                nome: tarefa.nome,
                ordem: tarefa.ordem,
                concluido: tarefa.concluido
            }))
        }

        this.http.patch<ProjetoJson>(`${this.apiUrl}/projetos/${projeto.id}`, dados)
            .subscribe({
                next: (projetoAtualizado) => {

                    const projetoMapeado = this.mapearTarefas([projetoAtualizado])[0];

                    this._projetos.update(projetos =>
                        projetos.map(p =>
                            p.id === projetoMapeado.id
                                ? projetoMapeado
                                : p
                        )
                    );

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