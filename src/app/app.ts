import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Intro } from './intro/intro';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, Intro],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showIntro = signal(true);
  entering = signal(false);

  private router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      this.entering.set(true);
      setTimeout(() => this.entering.set(false), 600);
    });
  }

  onIntroDone() {
    this.showIntro.set(false);
  }
}
