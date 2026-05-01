import { Component, inject, OnInit, signal } from '@angular/core';
import { DsaudHomeComponent } from '../../dsaud-home.component/dsaud-home.component';
import { Calendario } from '../../calendario/calendario';
import { CommonModule } from '@angular/common';
import { HeroPadrao } from '../../hero-padrao/hero-padrao';
import { SectionHeader } from '../../section-header/section-header';
import { ApiService } from '../../../services/api';
import { DsaudModel } from '../../../models/dsaud.model';
import { DsaudCardComponent } from '../../dsaud-card.component/dsaud-card.component';

@Component({
  selector: 'app-dsaud-lista.component',
  imports: [CommonModule, HeroPadrao, SectionHeader, Calendario, DsaudCardComponent],
  templateUrl: './dsaud-lista.component.html',
  styleUrl: './dsaud-lista.component.css',
})
export class DsaudListaComponent implements OnInit {
  private apiService = inject(ApiService);

  todasDicas = signal<DsaudModel[]>([]);
  dicasBackup: DsaudModel[] = [];

  ngOnInit() {
    this.carregarTodasDicas();
  }

  carregarTodasDicas() {
    this.apiService.getDicasSaude(100).subscribe({
      next: (dicas) => {
        this.dicasBackup = dicas;
        this.todasDicas.set(dicas);
      },
    });
  }
}
