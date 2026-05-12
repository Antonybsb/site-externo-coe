import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

import { Collapse, Dropdown, Ripple, initTWE } from 'tw-elements';
import { ModalidadeModel } from '../../models/modalidade.model';

initTWE({ Collapse, Dropdown, Ripple });

@Component({
  selector: 'app-mega-menu',
  imports: [CommonModule, RouterLink],
  templateUrl: './mega-menu.html',
  styleUrl: './mega-menu.css',
})
export class MegaMenu implements OnInit {
  private apiService = inject(ApiService);

  listaEsportes = signal<ModalidadeModel[]>([]);

  ngOnInit() {
    // Inicializa o TWE (componentes visuais)
    initTWE({ Collapse, Dropdown, Ripple });

    this.apiService.getModalidades().subscribe({
      next: (dadosLimpos) => {
        // 1. Atualizamos os dados
        this.listaEsportes.set(dadosLimpos);

        console.log('Menu carregado:', this.listaEsportes);
      },
      error: (erro) => console.error('Erro no Menu:', erro),
    });
  }
}
