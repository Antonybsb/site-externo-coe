import { Component, signal } from '@angular/core';
import { ContainerPadrao } from '../container-padrao/container-padrao';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BotaoPadraoComponent } from '../botao-padrao.component/botao-padrao.component';

@Component({
  selector: 'app-footer',
  imports: [ContainerPadrao, CommonModule, RouterLink, BotaoPadraoComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  mostrarMapa = signal(false);

  alternarMapa() {
    this.mostrarMapa.update((valorAtual) => !valorAtual);
  }
}
