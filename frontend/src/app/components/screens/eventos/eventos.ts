import { Component, OnInit } from '@angular/core';
import { HeroPadrao } from '../../hero-padrao/hero-padrao';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { SectionHeader } from '../../section-header/section-header';
import { RouterLink } from '@angular/router';
import { EspacoIntegracao } from '../../espaco-integracao/espaco-integracao';
import { Ripple, initTWE } from 'tw-elements';

@Component({
  selector: 'app-eventos',
  imports: [HeroPadrao, ContainerPadrao, SectionHeader, RouterLink, EspacoIntegracao],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css',
})
export class Eventos implements OnInit {
  ngOnInit(): void {
    initTWE({ Ripple });
  }
}
