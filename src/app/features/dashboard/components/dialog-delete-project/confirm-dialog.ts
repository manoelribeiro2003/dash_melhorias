import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export interface ConfirmDialogData {
  titulo: string;
  mensagem: string;
  textoCancelar?: string;
  textoConfirmar?: string;
  acao?: 'exclusao' | 'cricao' |'confirmacao'
}

@Component({
  selector: 'confirm-dialog',
  imports: [MatDialogModule, MatButtonModule, NgClass],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly dados = inject<ConfirmDialogData>(MAT_DIALOG_DATA)

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }

}
