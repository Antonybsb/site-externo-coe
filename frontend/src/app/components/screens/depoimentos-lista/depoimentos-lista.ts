import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { SectionHeader } from '../../section-header/section-header';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api';
import { HistoriaInspiradoraModel } from '../../../models/historia-inspiradora.model';

@Component({
  selector: 'app-depoimentos-lista',
  imports: [CommonModule, ContainerPadrao, SectionHeader, RouterLink],
  templateUrl: './depoimentos-lista.html',
  styleUrl: './depoimentos-lista.css',
})
export class DepoimentosLista implements OnInit {
  private apiService = inject(ApiService);
  private cd = inject(ChangeDetectorRef);

  todasHistorias = signal<HistoriaInspiradoraModel[]>([]);
  historiasExibidas = signal<HistoriaInspiradoraModel[]>([]); // Guarda os 12 da página atual

  // Controle de Paginação
  paginaAtual = signal(1);
  itensPorPagina = 12;
  totalItens = signal(0);
  paginasArray = signal<number[]>([]);

  ngOnInit(): void {
    this.carregarDepoimentos();
  }

  carregarDepoimentos() {
    this.apiService.getHistorias().subscribe({
      next: (dados) => {
        this.todasHistorias.set(dados);
        this.totalItens.set(dados.length);
        this.calcularPaginas();
        this.mudarPagina(1); // Inicia na página 1
      },
      error: (erro) => console.error('Erro ao buscar depoimentos:', erro),
    });
  }

  calcularPaginas() {
    const totalPaginas = Math.ceil(this.totalItens() / this.itensPorPagina);
    // Cria um array de [1, 2, 3...] baseado no total
    this.paginasArray.set(Array.from({ length: totalPaginas }, (_, i) => i + 1));
  }

  mudarPagina(pagina: number) {
    if (pagina < 1 || pagina > this.paginasArray().length) return; // Trava limites

    this.paginaAtual.set(pagina);

    // Matemática do fatiamento (slice)
    const inicio = (pagina - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;

    this.historiasExibidas.set(this.todasHistorias().slice(inicio, fim));
    this.cd.detectChanges();
  }

  // Helpers para o HTML: "Exibindo 1-12 de 30 itens"
  get itemInicial(): number {
    return this.totalItens() === 0 ? 0 : (this.paginaAtual() - 1) * this.itensPorPagina + 1;
  }

  get itemFinal(): number {
    const fim = this.paginaAtual() * this.itensPorPagina;
    return fim > this.totalItens() ? this.totalItens() : fim;
  }
}
