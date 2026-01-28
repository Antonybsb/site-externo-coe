import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroPadrao } from '../../hero-padrao/hero-padrao';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { SectionHeader } from '../../section-header/section-header';
import { RouterLink } from '@angular/router';
import { EspacoIntegracao } from '../../espaco-integracao/espaco-integracao';
import { Ripple, initTWE } from 'tw-elements';
import { CommonModule } from '@angular/common';
import { Evento } from '../../../models/evento';
import { ApiService } from '../../../services/api';

interface GrupoMes {
  nomeMes: string;
  ano: number;
  eventos: Evento[];
}

@Component({
  selector: 'app-eventos',
  imports: [
    HeroPadrao,
    ContainerPadrao,
    SectionHeader,
    RouterLink,
    EspacoIntegracao,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css',
})
export class Eventos implements OnInit {
  private apiService = inject(ApiService);
  grupoDeEventos = signal<GrupoMes[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    initTWE({ Ripple });
    this.carregarEventos();
  }

  carregarEventos() {
    this.apiService.getEventos().subscribe({
      next: (listaEventos) => {
        listaEventos.sort(
          (a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime(),
        );
        this.agruparPorMes(listaEventos);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
        this.isLoading.set(false);
      },
    });
  }

  private agruparPorMes(eventos: Evento[]) {
    const grupos: GrupoMes[] = [];

    eventos.forEach((evento) => {
      const dataInicio = new Date(evento.dataInicio);
      const nomeMes = dataInicio.toLocaleString('pt-BR', { month: 'long' });
      const mesFormatado = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
      const ano = dataInicio.getFullYear();

      let grupoExistente = grupos.find((g) => g.nomeMes === mesFormatado && g.ano === ano);
      if (grupoExistente) {
        grupoExistente.eventos.push(evento);
      } else {
        grupos.push({ nomeMes: mesFormatado, ano: ano, eventos: [evento] });
      }
    });

    this.grupoDeEventos.set(grupos);
  }
}
