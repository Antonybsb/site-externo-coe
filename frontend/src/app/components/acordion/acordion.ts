import { Component } from '@angular/core';

// Initialization for ES Users
import {
  Collapse,
  initTWE,
} from "tw-elements";

initTWE({ Collapse });

@Component({
  selector: 'app-acordion',
  imports: [],
  templateUrl: './acordion.html',
  styleUrl: './acordion.css',
})
export class Acordion {

  ngOnInit() {
    initTWE({ Collapse });
  }

}
