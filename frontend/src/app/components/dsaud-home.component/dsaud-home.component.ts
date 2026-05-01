import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { SectionHeader } from '../section-header/section-header';
import { BotaoPadraoComponent } from '../botao-padrao.component/botao-padrao.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dsaud-home',
  imports: [CommonModule, SectionHeader, BotaoPadraoComponent, DsaudHomeComponent, RouterLink],
  templateUrl: './dsaud-home.component.html',
  styleUrl: './dsaud-home.component.css',
})
export class DsaudHomeComponent implements OnInit {
  private apiService = inject(ApiService);

  dicas = signal<any[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.carregarDicas();
  }

  carregarDicas() {
    // Buscamos as últimas 4 dicas para a Home
    this.apiService.getDicasSaude(4).subscribe({
      next: (dados) => {
        this.dicas.set(dados);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar dicas da Disaud', err);
        this.isLoading.set(false);
      },
    });
  }
}
