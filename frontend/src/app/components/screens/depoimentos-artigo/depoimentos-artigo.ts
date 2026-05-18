import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../breadcrumb.component/breadcrumb.component';
import { ApiService } from '../../../services/api';
import { HistoriaInspiradoraModel } from '../../../models/historia-inspiradora.model';

@Component({
  selector: 'app-depoimentos-artigo',
  imports: [CommonModule, ContainerPadrao, RouterLink, BreadcrumbComponent],
  templateUrl: './depoimentos-artigo.html',
  styleUrl: './depoimentos-artigo.css',
})
export class DepoimentosArtigo implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  artigo = signal<HistoriaInspiradoraModel | null>(null);
  breadcrumbItems = signal<BreadcrumbItem[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.apiService.getHistorias().subscribe({
        next: (historias) => {
          // Localiza a história específica pelo ID
          const historiaEncontrada = historias.find((h) => h.id === +id!);

          if (historiaEncontrada) {
            this.artigo.set(historiaEncontrada);

            // Monta o breadcrumb dinamicamente com o nome retornado
            this.breadcrumbItems.set([
              { label: 'Home', url: '/' },
              { label: 'Depoimentos', url: '/depoimentos' },
              { label: historiaEncontrada.nome },
            ]);
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Erro ao carregar artigo:', err);
          this.isLoading.set(false);
        },
      });
    }
  }
}
