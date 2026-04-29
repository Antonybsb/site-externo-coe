import { ChangeDetectorRef, Component, inject, OnInit, output, signal } from '@angular/core';
import { Evento } from '../../../models/evento';
import { HeroPadrao } from '../../hero-padrao/hero-padrao';
import { SectionHeader } from '../../section-header/section-header';
import { CardEventoVitrineComponent } from '../../card-evento-vitrine.component/card-evento-vitrine.component';
import { ApiService } from '../../../services/api';
import { Calendario } from '../../calendario/calendario';

@Component({
  selector: 'app-eventos-lista',
  standalone: true,
  imports: [
    HeroPadrao,
    SectionHeader,
    CardEventoVitrineComponent,
    EventosListaComponent,
    Calendario,
  ],
  templateUrl: './eventos-lista.component.html',
  styleUrl: './eventos-lista.component.css',
})
export class EventosListaComponent implements OnInit {
  private apiService = inject(ApiService);
  private cd = inject(ChangeDetectorRef);

  todosEventos = signal<Evento[]>([]);
  eventosBackup: Evento[] = [];
  mesVisualizado = signal<Date>(new Date());

  filtroAberto = signal(false);
  labelFiltro = signal('Data');

  eventosGerais = signal<Evento[]>([]);
  eventosAnuais = signal<Evento[]>([]);

  todosEventosGerais: Evento[] = [];
  todosEventosAnuais: Evento[] = [];

  ngOnInit() {
    this.carregarTodosEventos();
  }

  toggleFiltro() {
    this.filtroAberto.update((v) => !v);
  }

  carregarTodosEventos() {
    this.apiService.getEventos().subscribe({
      next: (eventos) => {
        this.eventosBackup = eventos;
        this.todosEventos.set(eventos); // Alimenta a tela inicialmente
        this.cd.detectChanges();
      },
      error: (erro) => console.error('Erro ao carregar a lista completa de eventos:', erro),
    });
  }

  aplicarFiltroRapido(tipo: 'semana' | 'fds' | 'mes' | 'limpar') {
    const hoje = new Date();
    let inicio: Date, fim: Date;

    if (tipo === 'limpar') {
      // Puxa do backup e atualiza a tela
      this.todosEventos.set(this.eventosBackup);
      this.labelFiltro.set('Data');
      this.filtroAberto.set(false);
      return;
    }

    switch (tipo) {
      case 'semana':
        const diaSemana = hoje.getDay();
        inicio = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - diaSemana);
        fim = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + (6 - diaSemana));
        this.labelFiltro.set('Nesta semana');
        break;
      case 'fds':
        const diasParaSabado = 6 - hoje.getDay();
        inicio = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + diasParaSabado);
        fim = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + diasParaSabado + 1);
        this.labelFiltro.set('Neste fim de semana');
        break;
      case 'mes':
        inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
        this.labelFiltro.set('Neste mês');
        break;
    }

    this.executarFiltro(inicio!, fim!);
  }

  filtrarPorDiaExato(data: Date) {
    this.labelFiltro.set(data.toLocaleDateString('pt-BR'));
    this.executarFiltro(data, data);
  }

  private executarFiltro(inicio: Date, fim: Date) {
    inicio.setHours(0, 0, 0, 0);
    fim.setHours(23, 59, 59, 999);

    // Filtra o array de backup
    const filtrados = this.eventosBackup.filter((ev) => {
      // Trata campos nulos de data, ignorando-os no filtro
      if (!ev.dataInicio) return false;
      const dataEv = new Date(ev.dataInicio + 'T12:00:00');
      return dataEv >= inicio && dataEv <= fim;
    });

    // Atualiza o Signal lido pelo HTML
    this.todosEventos.set(filtrados);
    this.filtroAberto.set(false);
  }

  filtrarPorMesVisualizado(dataDoCalendario: Date) {
    // Pega o primeiro e o último dia baseados na data exata que o calendário está exibindo
    const inicio = new Date(dataDoCalendario.getFullYear(), dataDoCalendario.getMonth(), 1);
    const fim = new Date(dataDoCalendario.getFullYear(), dataDoCalendario.getMonth() + 1, 0);

    // Formata o label com a primeira letra maiúscula
    const mesNomes = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    const nomeFormatado = `${mesNomes[dataDoCalendario.getMonth()]} ${dataDoCalendario.getFullYear()}`;

    this.labelFiltro.set(nomeFormatado);
    this.executarFiltro(inicio, fim);
  }
}
