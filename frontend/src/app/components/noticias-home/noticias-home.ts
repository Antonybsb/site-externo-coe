import { Component, inject, OnInit, signal } from '@angular/core';
import { ContainerPadrao } from '../container-padrao/container-padrao';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { NoticiaModel } from '../../models/noticia.model';

@Component({
  selector: 'app-noticias-home',
  standalone: true,
  imports: [ContainerPadrao, CommonModule, RouterLink],
  templateUrl: './noticias-home.html',
  styleUrl: './noticias-home.css',
})
export class NoticiasHome implements OnInit {
  private apiService = inject(ApiService);

  destaque = signal<NoticiaModel | null>(null);
  listaLateral = signal<NoticiaModel[]>([]);

  ngOnInit() {
    this.carregarNoticias();
  }

  carregarNoticias() {
    // Pedimos a página 1, com 4 itens (1 destaque + 3 laterais)
    this.apiService.getNoticias(1, 4).subscribe({
      next: (resposta) => {
        const noticias = resposta.dados;

        if (noticias.length > 0) {
          // A primeira vai para o destaque
          this.destaque.set(noticias[0]);

          // As restantes (do índice 1 em diante) vão para a lateral
          if (noticias.length > 1) {
            this.listaLateral.set(noticias.slice(1));
          }
        }
      },
      // CORREÇÃO 3: Adicionar tipagem ': any' ou ': Error' para parar o erro do TS
      error: (err: any) => console.error('Erro ao carregar notícias da home', err),
    });
  }
}
