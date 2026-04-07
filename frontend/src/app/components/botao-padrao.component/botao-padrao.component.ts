import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-botao-padrao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botao-padrao.component.html',
})
export class BotaoPadraoComponent {
  label = input.required<string>();
  tamanho = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
  tipo = input<'primario' | 'secundario' | 'terciario' | 'link' | 'perigo' | 'alerta'>('primario');

  classesBase = computed(
    () =>
      'inline-flex items-center justify-center gap-2 font-medium rounded transition-colors w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed',
  );

  classesTamanho = computed(() => {
    if (this.tipo() === 'link' || this.tipo() === 'terciario') return 'p-0';

    switch (this.tamanho()) {
      case 'lg':
        return 'px-8 py-3 text-lg';
      case 'sm':
        return 'px-4 py-1.5 text-sm';
      case 'md':
      default:
        return 'px-6 py-2 text-base';
    }
  });

  classesTipo = computed(() => {
    switch (this.tipo()) {
      case 'primario':
        return 'bg-[#3A71C7] text-[#FEFEFE] hover:bg-[#1C519B] shadow-sm';

      case 'secundario':
        return 'bg-transparent border border-[#3A71C7] text-[#3A71C7] hover:bg-blue-50';

      case 'terciario':
        return 'bg-transparent text-[#3A71C7] hover:text-[#1C519B]';

      case 'link':
        return 'bg-transparent text-[#3A71C7] hover:text-[#1C519B] underline decoration-dashed hover:decoration-solid underline-offset-4';

      case 'perigo':
        return 'bg-red-800 text-[#FEFEFE] hover:bg-red-600 shadow-sm';
      case 'alerta':
        return 'bg-[#FFC72E] text-[#0D264A] hover:bg-[#B78F00] shadow-sm';

      default:
        return 'bg-[#3A71C7] text-[#FEFEFE] hover:bg-[#1C519B]';
    }
  });
}
