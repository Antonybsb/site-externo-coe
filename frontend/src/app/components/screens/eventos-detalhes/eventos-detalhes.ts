import { Component } from '@angular/core';
import { HeroPadrao } from '../../hero-padrao/hero-padrao';
import { SectionHeader } from '../../section-header/section-header';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { Calendario } from '../../calendario/calendario';

@Component({
  selector: 'app-eventos-detalhes',
  imports: [HeroPadrao, SectionHeader, ContainerPadrao, Calendario],
  templateUrl: './eventos-detalhes.html',
  styleUrl: './eventos-detalhes.css',
})
export class EventosDetalhes {
  diasDoEvento = [
    { dia: 8, mes: 8, ano: 2026 },
    { dia: 9, mes: 8, ano: 2026 },
    { dia: 10, mes: 8, ano: 2026 },
  ];
}
