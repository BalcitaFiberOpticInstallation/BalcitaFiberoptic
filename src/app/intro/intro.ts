import { Component, output, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.html',
  styleUrl: './intro.css'
})
export class Intro implements OnInit {
  done = output<void>();
  fading = false;

  ngOnInit() {
    setTimeout(() => {
      this.fading = true;
      setTimeout(() => this.done.emit(), 700);
    }, 8000);
  }
}
