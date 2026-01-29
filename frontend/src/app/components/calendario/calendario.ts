import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario',
  imports: [CommonModule],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css',
})
export class Calendario implements OnInit {
  private _diasEvento: { dia: number; mes: number; ano: number }[] = [];

  @Input() set dataEvento(dias: { dia: number; mes: number; ano: number }[]) {
    this._diasEvento = dias;
  }

  @Input() set dataInicial(dataIso: string | undefined | null) {
    if (dataIso) {
      // Ajuste de Fuso Horário seguro: Cria a data e força o meio-dia
      const partes = dataIso.split('-'); // ['2026', '08', '08']
      if (partes.length >= 3) {
        this.dataCorrente = new Date(
          parseInt(partes[0]),
          parseInt(partes[1]) - 1, // Mês 0-11
          parseInt(partes[2]),
        );
        this.renderizarCalendario();
      }
    }
  }

  dataCorrente: Date = new Date();

  mesNomes: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  arrayDias: (number | null)[] = [];
  displayMes: string = '';

  ngOnInit() {
    this.renderizarCalendario();
  }

  renderizarCalendario() {
    const year = this.dataCorrente.getFullYear();
    const month = this.dataCorrente.getMonth();

    this.displayMes = `${this.mesNomes[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay(); // Dia da semana (0-Domingo)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total dias no mês

    this.arrayDias = [];

    // Adiciona espaços vazios antes do dia 1
    for (let i = 0; i < firstDay; i++) {
      this.arrayDias.push(null);
    }

    // Adiciona os dias reais
    for (let i = 1; i <= daysInMonth; i++) {
      this.arrayDias.push(i);
    }
  }

  changeMonth(step: number) {
    this.dataCorrente.setMonth(this.dataCorrente.getMonth() + step);
    this.renderizarCalendario();
  }

  isEventDate(day: number | null): boolean {
    if (!day) return false;

    const year = this.dataCorrente.getFullYear();
    const month = this.dataCorrente.getMonth(); // 0 a 11 (Ex: Agosto = 7)

    return this._diasEvento.some((e) => e.ano === year && e.mes === month && e.dia === day);
  }
}
