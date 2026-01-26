import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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

  // Injetamos o "Fiscal" manual para poder avisar quando mudarmos coisas fora de hora
  private cd = inject(ChangeDetectorRef);

  listaEsportes: ModalidadeModel[] = [];

  ngOnInit() {
    // Inicializa o TWE (componentes visuais)
    initTWE({ Collapse, Dropdown, Ripple });

    this.apiService.getModalidades().subscribe({
      next: (dadosLimpos) => {
        // 1. Atualizamos os dados
        this.listaEsportes = dadosLimpos;

        console.log('Menu carregado:', this.listaEsportes);

        // 2. A CORREÇÃO DO ERRO NG0100
        // Como a atualização dos dados pode afetar o layout que o TWE controla,
        // forçamos o Angular a verificar as mudanças IMEDIATAMENTE.
        this.cd.detectChanges();
      },
      error: (erro) => console.error('Erro no Menu:', erro),
    });
  }
}
