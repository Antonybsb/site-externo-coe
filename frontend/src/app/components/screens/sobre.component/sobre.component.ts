import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroPadrao } from '../../hero-padrao/hero-padrao';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { CommonModule } from '@angular/common';
import { SectionHeader } from '../../section-header/section-header';
import { EspacoIntegracao } from '../../espaco-integracao/espaco-integracao';
import { ApiService } from '../../../services/api';
import { MembroModel } from '../../../models/membro.model';
import { Parceiros } from '../../parceiros/parceiros';

@Component({
  selector: 'app-sobre.component',
  imports: [HeroPadrao, ContainerPadrao, CommonModule, SectionHeader, EspacoIntegracao, Parceiros],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css',
})
export class SobreComponent implements OnInit {
  private apiService = inject(ApiService);

  membrosComite = signal<MembroModel[]>([]);
  voluntarios = signal<MembroModel[]>([]);
  mostrarTodosComite = signal(false);
  mostrarTodosVoluntarios = signal(false);

  ngOnInit() {
    this.carregarEquipe();
  }

  carregarEquipe() {
    this.apiService.getEquipe().subscribe({
      next: (todos) => {
        // Filtra e popula os signals separados
        this.membrosComite.set(todos.filter((m) => m.categoria === 'comite'));
        this.voluntarios.set(todos.filter((m) => m.categoria === 'voluntario'));
      },
      error: (err) => console.error('Erro ao buscar equipe', err),
    });
  }

  toggleComite() {
    this.mostrarTodosComite.update((val) => !val);
  }

  toggleVoluntarios() {
    this.mostrarTodosVoluntarios.update((val) => !val);
  }
}
