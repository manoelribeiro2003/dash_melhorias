import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { DragDropComponent } from '../drag-drop/drag-drop';

@Component({
  selector: 'app-dialog-project',
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

    DragDropComponent
  ],
  templateUrl: './dialog-project.html',
  styleUrl: './dialog-project.scss',
})
export class DialogProject {
  private dialogRef = inject(MatDialogRef<DialogProject>);

  fechar(): void {
    this.dialogRef.close();
  }


  valorFormatado = '';
  formatarValor(event: Event): void {
    const input = event.target as HTMLInputElement;

    const valor = input.value.replace(/\D/g, '');

    if (!valor) {
      this.valorFormatado = '';
      return;
    }

    const numero = Number(valor) / 100;

    this.valorFormatado = numero.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}

