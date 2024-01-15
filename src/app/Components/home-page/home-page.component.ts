//home-page.component.ts Inhalt:

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'ns-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  constructor(private router: Router) {}

  showSensors() {
    this.router.navigate(['/sensors']);
  }
}
//---------------------------------------------------