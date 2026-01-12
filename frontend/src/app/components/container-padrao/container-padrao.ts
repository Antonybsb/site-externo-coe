import { Component, input } from '@angular/core';

@Component({
  selector: 'app-container-padrao',
  imports: [],
  templateUrl: './container-padrao.html',
  styleUrl: './container-padrao.css',
})
export class ContainerPadrao {
  readonly bgColor = input<string>('bg-white');
}
