import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroPadrao } from '../../hero-padrao/hero-padrao';
import { SectionHeader } from '../../section-header/section-header';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { Calendario } from '../../calendario/calendario';
import { Evento } from '../../../models/evento';
import { ApiService } from '../../../services/api';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-eventos-detalhes',
  imports: [HeroPadrao, SectionHeader, ContainerPadrao, Calendario, CommonModule, RouterLink],
  templateUrl: './eventos-detalhes.html',
  styleUrl: './eventos-detalhes.css',
})
export class EventosDetalhes implements OnInit {
  /* diasDoEvento = [
    { dia: 8, mes: 8, ano: 2026 },
    { dia: 9, mes: 8, ano: 2026 },
    { dia: 10, mes: 8, ano: 2026 },
  ]; */
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  // Signals para os dados
  evento = signal<Evento | null>(null);
  outrosEventos = signal<Evento[]>([]);
  isLoading = signal(true);

  // Para o Calendário (Sidebar)
  diasDoEvento: { dia: number; mes: number; ano: number }[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.carregarDados(slug);
      }
    });
  }

  carregarDados(slug: string) {
    this.isLoading.set(true);

    // 1. Busca o evento principal
    this.apiService.getEventoPorSlug(slug).subscribe({
      next: (ev) => {
        this.evento.set(ev);
        this.gerarDiasDoEvento(ev);
        this.carregarOutrosEventos(ev.id); // Busca os outros, exceto este
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro', err);
        this.isLoading.set(false);
      },
    });
  }

  carregarOutrosEventos(idAtual: number) {
    this.apiService.getEventos().subscribe((lista) => {
      // Filtra para não mostrar o evento que a pessoa já está vendo
      const outros = lista.filter((e) => e.id !== idAtual).slice(0, 4);
      this.outrosEventos.set(outros);
    });
  }

  // Gera o array de dias para pintar o calendário (ex: ['2026-08-08', '2026-08-09'])
  gerarDiasDoEvento(ev: Evento) {
    if (!ev.dataInicio) return;

    // Cria as datas base convertendo a string do Strapi
    const inicio = new Date(ev.dataInicio + 'T00:00:00');
    const fim = ev.dataFim ? new Date(ev.dataFim + 'T00:00:00') : new Date(inicio);

    const listaDias = [];
    const loop = new Date(inicio);

    // Loop para preencher todos os dias entre o início e o fim
    while (loop <= fim) {
      listaDias.push({
        dia: loop.getDate(), // Ex: 8
        mes: loop.getMonth(), // Ex: 7 (Agosto é 7 no Javascript pq começa em 0)
        ano: loop.getFullYear(), // Ex: 2026
      });

      // Avança um dia
      loop.setDate(loop.getDate() + 1);
    }

    this.diasDoEvento = listaDias;
  }

  // Helper para o link do WhatsApp (remove caracteres especiais)
  get whatsappLimpo() {
    const tel = this.evento()?.telefone || '';
    return tel.replace(/\D/g, ''); // Remove tudo que não é número
  }
}
