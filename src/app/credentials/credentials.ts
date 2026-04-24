import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.html',
  styleUrl: './credentials.css'
})
export class Credentials implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const cards = this.el.nativeElement.querySelectorAll('.cred-card') as NodeListOf<HTMLElement>;
    cards.forEach((card: HTMLElement) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -8;
        const ry = ((x - cx) / cx) * 8;
        const gx = (x / rect.width) * 100;
        const gy = (y / rect.height) * 100;
        card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.02)`;
        card.style.transition = 'transform 0.08s linear';
        card.style.setProperty('--mx', `${gx}%`);
        card.style.setProperty('--my', `${gy}%`);
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.45s cubic-bezier(0.23,1,0.32,1)';
      });
    });
  }
}
