import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Parceiros } from '../../parceiros/parceiros';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { CardEvento } from '../../card-evento/card-evento';
import { SectionHeader } from '../../section-header/section-header';
import { ModalidadeModel } from '../../../models/modalidade.model';
import { HeroPadrao } from '../../hero-padrao/hero-padrao';
import { Evento } from '../../../models/evento';
import { CardEventoVitrineComponent } from '../../card-evento-vitrine.component/card-evento-vitrine.component';

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
    CardEventoVitrineComponent,
    RouterModule,
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

  protected mostrarTextoCompleto = signal(false);

  protected modalidadesSemGrupo: any[] = [
    'Atletismo',
    'Bocha',
    'Bozó',
    'Cabo de Guerra',
    'Canoa Havaiana',
    'Capoeira',
    'Damas',
    'Esqui',
    'Jogo Online',
    'Mergulho',
    'Pesca',
    'Peteca',
    'Sinuca',
    'Stand UP',
    'Tênis de Mesa',
    'Tiro Esportivo',
    'Trekking',
    'Vôlei de Praia Masculino',
  ].map((nome, index) => ({
    id: index,
    nome: nome,
    icone: null, // Como é nulo, o HTML vai acionar automaticamente a imagem de fallback
  })); // No futuro, tipar com a interface correta

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
        console.log('DADOS RECEBIDOS DO STRAPI:', dadoLimpo);
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

  alternarTexto() {
    this.mostrarTextoCompleto.update((valor) => !valor);
  }

  obterLogoParceiro(parceiro: any): string {
    // Cenário 1: O Strapi mandou a imagem como Objeto Único (Single Media)
    if (parceiro?.logo?.url) {
      return `${this.baseUrl}${parceiro.logo.url}`;
    }

    // Cenário 2: O Strapi mandou a imagem como Array (Multiple Media)
    if (Array.isArray(parceiro?.logo) && parceiro.logo.length > 0 && parceiro.logo[0].url) {
      return `${this.baseUrl}${parceiro.logo[0].url}`;
    }

    // Cenário 3: Fallback seguro (Vamos usar o UI Avatars, pois sabemos que a sua rede não bloqueia ele, já que funcionou nos Líderes)
    return `https://ui-avatars.com/api/?name=${parceiro.nome}&background=f3f4f6&color=374151&font-size=0.33`;
  }
}
