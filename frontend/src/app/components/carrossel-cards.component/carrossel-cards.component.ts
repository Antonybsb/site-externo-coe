import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-carrossel-cards',
  imports: [CommonModule],
  templateUrl: './carrossel-cards.component.html',
  styleUrl: './carrossel-cards.component.css',
})
export class CarrosselCardsComponent implements OnInit {
  @Input({ required: true }) totalItens: number = 0;

  indiceAtual = signal(0);
  itensPorVez = signal(3);
  ngOnInit() {
    this.calcularItensPorVez();
  }

  @HostListener('window:resize')
  onResize() {
    this.calcularItensPorVez();
  }

  calcularItensPorVez() {
    const larguraTela = window.innerWidth;
    if (larguraTela < 768) {
      this.itensPorVez.set(1);
    } else if (larguraTela < 1024) {
      this.itensPorVez.set(2);
    } else {
      this.itensPorVez.set(3);
    }
    this.verificarLimites();
  }

  proximo() {
    const maximoCliques = this.totalItens - this.itensPorVez();
    if (this.indiceAtual() < maximoCliques) {
      this.indiceAtual.update((i) => i + 1);
    }
  }

  anterior() {
    if (this.indiceAtual() > 0) {
      this.indiceAtual.update((i) => i - 1);
    }
  }

  private verificarLimites() {
    const maximo = Math.max(0, this.totalItens - this.itensPorVez());
    if (this.indiceAtual() > maximo) {
      this.indiceAtual.set(maximo);
    }
  }

  // Cria um array só para conseguirmos fazer o loop (@for) dos pontinhos no HTML
  gerarArrayDots(): number[] {
    const maximoCliques = Math.max(0, this.totalItens - this.itensPorVez());
    return new Array(maximoCliques + 1).fill(0);
  }

  // Quando o usuário clica direto em um pontinho
  irPara(indice: number) {
    this.indiceAtual.set(indice);
  }
}
