import { Component, input } from '@angular/core';
import { BotaoPadraoComponent } from '../botao-padrao.component/botao-padrao.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-codigo-conduta-cta',
  imports: [CommonModule, BotaoPadraoComponent, RouterLink],
  templateUrl: './codigo-conduta-cta.component.html',
  styleUrl: './codigo-conduta-cta.component.css',
})
export class CodigoCondutaCtaComponent {
  readonly classeCorOverlay = input<string>('bg-[#2B2171]/30');
}
