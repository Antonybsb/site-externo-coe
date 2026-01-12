import { Component } from '@angular/core';
import { ContainerPadrao } from '../container-padrao/container-padrao';
import { SectionHeader } from '../section-header/section-header';

@Component({
  selector: 'app-espaco-integracao',
  imports: [ContainerPadrao, SectionHeader],
  templateUrl: './espaco-integracao.html',
  styleUrl: './espaco-integracao.css',
})
export class EspacoIntegracao {}
