import { Component } from '@angular/core';
import { HeroPadrao } from '../../hero-padrao/hero-padrao';

@Component({
  selector: 'app-codigo-conduta.component',
  imports: [HeroPadrao],
  templateUrl: './codigo-conduta.component.html',
  styleUrl: './codigo-conduta.component.css',
})
export class CodigoCondutaComponent {
  valores = [
    {
      icone: 'integridade',
      titulo: 'Integridade e honestidade',
      texto:
        'Jogamos limpo, sempre. A vitória só tem sabor quando conquistada com ética e transparência.',
    },
    {
      icone: 'respeito',
      titulo: 'Respeito e dignidade',
      texto:
        'Tratamos a todos – colegas, adversários, torcedores – com a mesma consideração que gostaríamos de receber. A diversidade é a nossa força!',
    },
    {
      icone: 'equipe',
      titulo: 'Espírito de equipe e solidariedade',
      texto:
        'Juntos somos mais fortes. Apoiamos uns aos outros, celebramos as conquistas coletivas e superamos os desafios em união.',
    },
    {
      icone: 'imparcialidade',
      titulo: 'Imparcialidade e transparência',
      texto:
        'Nossas ações são sempre justas e claras, refletindo a lisura que esperamos em todas as esferas.',
    },
  ];

  condutas = [
    {
      titulo: 'Ser um exemplo de respeito',
      texto: 'Trate a todos com urbanidade e cortesia. A gentileza é a nossa marca!',
    },
    {
      titulo: 'Promover a inclusão',
      texto: 'Celebre as diferenças e garanta que todos se sintam bem-vindos e valorizados.',
    },
    {
      titulo: 'Defender nossa bandeira',
      texto: 'Seja um embaixador da instituição, agindo sempre com ética e integridade.',
    },
    {
      titulo: 'Construir um ambiente positivo',
      texto: 'Contribua para um clima de confiança, cooperação e alegria.',
    },
    {
      titulo: 'Respeito incondicional',
      texto: 'Combatemos qualquer forma de discriminação, preconceito ou assédio.',
    },
    {
      titulo: 'Comunicação positiva',
      texto: 'Palavras de incentivo são a nossa voz. Evitamos qualquer forma de hostilidade.',
    },
    {
      titulo: 'Imagem impecável',
      texto: 'Suas ações, inclusive nas redes sociais, devem elevar o nome do TCU.',
    },
    {
      titulo: 'Saúde e performance',
      texto: 'Priorize seu bem-estar e evite consumos prejudiciais em representações do TCU.',
    },
  ];

  cenarios = [
    {
      titulo: 'Integridade em campo',
      texto:
        'Se a bola foi fora, mas o árbitro não viu e marcou ponto para você, informe-o. A honestidade é a nossa maior vitória.',
    },
    {
      titulo: 'Apoio ao colega',
      texto:
        'Se um colega comete um erro, ofereça palavras de incentivo. A união do time é mais importante que qualquer falha individual.',
    },
    {
      titulo: 'Redes sociais com propósito',
      texto:
        'Use suas redes para inspirar. Evite compartilhar informações falsas ou que possam prejudicar a imagem da instituição.',
    },
  ];
}
