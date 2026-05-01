import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DsaudModel } from '../../models/dsaud.model';

@Component({
  selector: 'app-dsaud-card',
  imports: [CommonModule],
  templateUrl: './dsaud-card.component.html',
  styleUrl: './dsaud-card.component.css',
})
export class DsaudCardComponent {
  dica = input.required<DsaudModel>();
}
