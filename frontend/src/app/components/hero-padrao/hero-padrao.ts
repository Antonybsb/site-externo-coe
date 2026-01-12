import { UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-padrao',
  imports: [UpperCasePipe],
  templateUrl: './hero-padrao.html',
  styleUrl: './hero-padrao.css',
})
export class HeroPadrao {
  readonly titulo = input.required<string>();
  readonly imagemUrl = input.required<string>();
  readonly classeCorOverlay = input<string>('bg-[#2B2171]/30');
  readonly posicaoImagem = input<string>('center');
}
