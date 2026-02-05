import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { SectionHeader } from '../../section-header/section-header';
import { NoticiasLista } from '../noticias-lista/noticias-lista';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NoticiaModel } from '../../../models/noticia.model';
import { ApiService } from '../../../services/api';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../breadcrumb.component/breadcrumb.component';

@Component({
  selector: 'app-noticia-artigo',
  standalone: true,
  imports: [
    CommonModule,
    ContainerPadrao,
    SectionHeader,
    NoticiasLista,
    RouterLink,
    BreadcrumbComponent,
  ],
  templateUrl: './noticia-artigo.html',
  styleUrl: './noticia-artigo.css',
})
export class NoticiaArtigo implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  // Signal para guardar a notícia carregada
  noticia = signal<NoticiaModel | null>(null);
  isLoading = signal(true);
  proximoEvento = signal<any | null>(null);
  breadcrumbItems = signal<BreadcrumbItem[]>([]);

  ngOnInit() {
    // Pega o ID da URL (ex: /noticia-artigo/1)
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.carregarNoticia(Number(id));
    }
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

  carregarNoticia(id: number) {
    this.isLoading.set(true);

    this.apiService.getNoticiaPorId(id).subscribe({
      next: (dados) => {
        this.noticia.set(dados);
        this.isLoading.set(false);
        this.breadcrumbItems.set([
          { label: 'Home', url: '/' },
          { label: 'Notícias', url: '/noticias' }, // Ou a rota da sua listagem
          { label: dados.titulo }, // Último item sem URL (página atual)
        ]);
      },
      error: (err) => {
        console.error('Erro ao carregar notícia', err);
        this.isLoading.set(false);
      },
    });
  }
}
