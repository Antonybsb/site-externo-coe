import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Parceiros } from '../../parceiros/parceiros';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { CardEvento } from '../../card-evento/card-evento';
import { SectionHeader } from '../../section-header/section-header';
import { ModalidadeModel } from '../../../models/modalidade.model';
import { HeroPadrao } from '../../hero-padrao/hero-padrao';
import { Evento } from '../../../models/evento';

@Component({
  selector: 'app-modalidades',
  imports: [
    CommonModule,
    Parceiros,
    ContainerPadrao,
    CardEvento,
    SectionHeader,
    HeroPadrao,
    ContainerPadrao,
  ],
  templateUrl: './modalidades.html',
  styleUrl: './modalidades.css',
})
export class Modalidades implements OnInit {
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);

  private cd = inject(ChangeDetectorRef);

  protected modalidadeDestaque: ModalidadeModel | null = null;

  protected listaEventos: Evento[] = [];

  // Variável para controlar o estado de carregamento
  protected isLoading = true;

  baseUrl = 'http://localhost:1337';

  ngOnInit() {
    this.carregareventosGerais();
    this.route.paramMap.subscribe((params) => {
      const slugAtual = params.get('slug');

      console.log('Rota mudou! Novo Slug:', slugAtual);

      this.modalidadeDestaque = null;
      this.isLoading = true;

      this.cd.detectChanges();

      if (slugAtual) {
        this.carregarEsporteEspecifico(slugAtual);
      } else {
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  carregareventosGerais() {
    this.apiService.getEventos().subscribe({
      next: (eventos) => {
        this.listaEventos = eventos;
        this.cd.detectChanges();
      },
      error: (erro) => console.error('Erro ao carregar eventos:', erro),
    });
  }

  carregarEsporteEspecifico(slug: string) {
    this.apiService.getModalidadePorSlug(slug).subscribe({
      next: (dadoLimpo) => {
        this.modalidadeDestaque = dadoLimpo;
        this.isLoading = false;

        if (!dadoLimpo) {
          console.warn(`Strapi não encontrou nada para o slug: ${slug}`);
        }

        this.cd.detectChanges();
      },
      error: (erro) => {
        console.error('Erro na API:', erro);
        this.isLoading = false;
        this.cd.detectChanges(); // Atualiza a tela mesmo com erro
      },
    });
  }
}
