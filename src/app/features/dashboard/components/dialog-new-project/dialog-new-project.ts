import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Projeto } from '../../models/projeto/projeto.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropComponent } from '../drag-drop/drag-drop';
import { Tarefa } from '../../models/tarefa/tarefa.interface';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario/usuario.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProjetoService } from '../../services/projeto/projeto.service';

function obterSemanaAtual(): { inicio: Date; termino: Date } {
  const hoje = new Date();

  const diaSemana = hoje.getDay();
  const diferencaSegunda = diaSemana === 0 ? -6 : 1 - diaSemana;

  const inicio = new Date(hoje);
  inicio.setDate(hoje.getDate() + diferencaSegunda);

  const termino = new Date(inicio);
  termino.setDate(inicio.getDate() + 4);

  return {
    inicio,
    termino
  };
}

@Component({
  selector: 'app-dialog-new-project',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    DragDropModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    FormsModule,
    DragDropComponent,
    MatSlideToggleModule
  ],
  templateUrl: './dialog-new-project.html',
  styleUrl: './dialog-new-project.scss',
})
export class DialogNewProject {
  private usuariosService = inject(UsuarioService)
  readonly usuarios = this.usuariosService.usuarios()
  private dialogRef = inject(MatDialogRef<DialogNewProject>);
  readonly projetosService = inject(ProjetoService);

  readonly novoProjeto: Partial<Projeto> = {
    status: 'Não iniciado',
    dataInicio: obterSemanaAtual().inicio,
    dataTermino: obterSemanaAtual().termino,
    prioridade: false,
    tarefas: [
      {
        nome: '',
        ordem: 1,
        concluido: false,
      }
    ]
  };

  compararUsuarios(usuario1: Usuario | null, usuario2: Usuario | null): boolean {
    return usuario1?.id === usuario2?.id;
  }

  atualizarTarefas(tarefas: Tarefa[]): void {
    this.novoProjeto.tarefas = tarefas;
  }

  fechar(): void {
    this.dialogRef.close();
  }

  salvarProjeto(): void {
    this.projetosService.criarProjeto(this.novoProjeto)
    
    console.log(this.novoProjeto);

    this.dialogRef.close();
  }
}
