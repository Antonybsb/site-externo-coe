import { Component } from '@angular/core';
import {
  Collapse,
  Dropdown,
  Ripple,
  initTWE,
} from "tw-elements";


@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  ngOnInit() {
    initTWE({ Collapse, Dropdown, Ripple });

  }
}