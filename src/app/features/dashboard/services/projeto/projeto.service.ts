import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProjetoJson } from '../../models/projeto/projeto-json.interface';
import { Projeto } from '../../models/projeto/projeto.interface';

@Injectable({
    providedIn: 'root'
})
export class ProjetoService {

    private apiUrl = 'http://localhost:3000';
    private http = inject(HttpClient);

    private _projetos = signal<Projeto[]>([]);
    readonly projetos = this._projetos.asReadonly()

    criarProjeto(projeto: Projeto): void{
        this.http.post()
    }   

    carregarProjetos(): void {
        this.http.get<ProjetoJson[]>(`${this.apiUrl}/projetos/`).subscribe({
            next: (dados) => {
                this._projetos.set(this.mapearProjetos(dados));
            },
            error: (erro) => {
                console.error(erro);
            }
        });
    }

    atualizarProjeto(projeto: Projeto): void {

        const dataInicio = projeto.dataInicio?.toISOString()

        const dados = {
            nome: projeto.nome,
            categoria: projeto.categoria,
            status: projeto.status,
            dataInicio: projeto.dataInicio,
            dataTermino: projeto.dataTermino,
            orcamento: projeto.orcamento,
            prioridade: projeto.prioridade,
            criadoPorId: projeto.criadoPor.id,
            tarefas: projeto.tarefas
                .filter(tarefa =>
                    tarefa.id !== undefined || tarefa.nome?.trim()
                )
                .map((tarefa, index) => ({
                    ...(tarefa.id !== undefined && { id: tarefa.id }),
                    nome: tarefa.nome?.trim() ?? '',
                    ordem: index + 1,
                    concluido: tarefa.concluido
                }))
        }

        this.http.patch<ProjetoJson>(`${this.apiUrl}/projetos/${projeto.id}`, dados)
            .subscribe({
                next: (projetoAtualizado) => {

                    const projetoMapeado = this.mapearProjetos([projetoAtualizado])[0];

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

    private mapearProjetos(projetos: ProjetoJson[]): Projeto[] {
        return projetos.map(projeto => {

            const dataInicio = projeto.dataInicio?.split('-').map(Number)
            const dataTermino = projeto.dataTermino?.split('-').map(Number)

            const projetos = {
                id: projeto.id,
                nome: projeto.nome,
                categoria: projeto.categoria,
                status: projeto.status,
                dataInicio: dataInicio !== undefined ? new Date(dataInicio[0], dataInicio[1] - 1, dataInicio[2]) : null,
                dataTermino: dataTermino !== undefined ? new Date(dataTermino[0], dataTermino[1] - 1, dataTermino[2]) : null,
                orcamento: projeto.orcamento,
                prioridade: projeto.prioridade,
                criadoPor: projeto.criadoPor,
                tarefas: projeto.tarefas,
                tarefasConcluidas: projeto.tarefas.filter(tarefa => tarefa.concluido).length,
                totalTarefas: projeto.tarefas.length,
                criadoEm: new Date(projeto.createdAt),
                atualizadoEm: new Date(projeto.updatedAt),
                atrasado: projeto.dataTermino &&
                    projeto.status !== 'Concluída'
                    ? new Date(projeto.dataTermino) < new Date()
                    : false
            }

            return projetos;
        }).sort();
    }
}