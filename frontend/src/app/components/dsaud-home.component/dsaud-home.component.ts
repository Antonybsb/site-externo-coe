import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { SectionHeader } from '../section-header/section-header';

@Component({
  selector: 'app-dsaud-home',
  imports: [CommonModule, SectionHeader],
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
