import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Evento } from '../../models/evento';

@Component({
  selector: 'app-card-evento',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './card-evento.html',
  styleUrl: './card-evento.css',
})
export class CardEvento {
  data = input.required<Evento>();
}
