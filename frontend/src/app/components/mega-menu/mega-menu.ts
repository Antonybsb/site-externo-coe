import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

import { Collapse, Dropdown, Ripple, initTWE } from 'tw-elements';

initTWE({ Collapse, Dropdown, Ripple });

@Component({
  selector: 'app-mega-menu',
  imports: [CommonModule, RouterLink],
  templateUrl: './mega-menu.html',
  styleUrl: './mega-menu.css',
})
export class MegaMenu implements OnInit {
  private apiService = inject(ApiService);

  listaEsportes: any[] = [];
  private cd = inject(ChangeDetectorRef);

  ngOnInit() {
    initTWE({ Collapse, Dropdown, Ripple });

    this.apiService.getModalidades().subscribe({
      next: (response) => {
        const dadosCheios = response.data || response;

        this.listaEsportes = dadosCheios;

        // <--- 3. A MARRETA: Atualiza a tela imediatamente e corrige o erro NG0100
        this.cd.detectChanges();

      },
      error: (erro) => console.error("Erro no Menu:", erro)
    });
  }
}
