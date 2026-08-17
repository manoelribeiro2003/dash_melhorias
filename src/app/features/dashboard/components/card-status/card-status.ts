import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-card-status',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './card-status.html',
  styleUrl: './card-status.scss',
})
export class CardStatus {

  icon = input.required<string>();
  title = input.required<string>();
  value = input.required<string | number>();
}
