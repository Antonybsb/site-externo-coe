import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api';
import { NoticiaModel } from '../../../models/noticia.model';
import { Evento } from '../../../models/evento';

@Component({
  selector: 'app-noticias-lista',
  imports: [CommonModule, ContainerPadrao, RouterLink],
  templateUrl: './noticias-lista.html',
  styleUrl: './noticias-lista.css',
})
export class NoticiasLista implements OnInit {
  private apiService = inject(ApiService);

  // Estados reativos (Signals)
  listaNoticias = signal<NoticiaModel[]>([]);
  proximoEvento = signal<Evento | null>(null);
  isLoading = signal(true);

  // Variáveis de Paginação
  paginaAtual = 1;
  itensPorPagina = 5;
  totalItens = 0;
  paginasArray: number[] = [];

  ngOnInit() {
    this.carregarDados(1);
    this.carregarProximoEvento();
  }

  carregarProximoEvento() {
    this.apiService.getProximoEvento().subscribe({
      next: (evento) => {
        this.proximoEvento.set(evento);
      },
      error: (err) => console.error('Erro ao carregar evento lateral', err),
    });
  }

  carregarDados(pagina: number) {
    this.isLoading.set(true);
    this.paginaAtual = pagina;

    this.apiService.getNoticias(pagina, this.itensPorPagina).subscribe({
      next: (resposta) => {
        this.listaNoticias.set(resposta.dados);

        // Atualiza os dados de paginação vindos do Strapi
        this.totalItens = resposta.meta.pagination.total;
        this.atualizarArrayPaginas(resposta.meta.pagination.pageCount);

        this.isLoading.set(false);

        // Rola a tela para o topo suavemente ao mudar de página
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        console.error('Erro ao buscar notícias', err);
        this.isLoading.set(false);
      },
    });
  }

  // Gera o array [1, 2, 3...] para desenhar os botões
  atualizarArrayPaginas(totalPaginas: number) {
    this.paginasArray = Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  // Evento ao trocar itens por página no Select
  mudarItensPorPagina(evento: any) {
    this.itensPorPagina = Number(evento.target.value);
    this.carregarDados(1); // Volta para a página 1 para evitar bugs
  }
}
