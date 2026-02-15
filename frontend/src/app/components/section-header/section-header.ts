import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [NgClass],
  templateUrl: './section-header.html',
  styleUrl: './section-header.css',
})
export class SectionHeader {
  readonly titulo = input.required<string>();
  readonly variante = input<'padrao' | 'branco'>('padrao');
}
