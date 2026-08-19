import { Component, input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-toobar',
  imports: [
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './toobar.html',
  styleUrl: './toobar.scss',
})
export class Toobar {
  title = input.required<string>();
  description = input.required<string>();
}
