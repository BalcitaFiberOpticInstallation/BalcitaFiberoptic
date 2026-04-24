import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const cards = this.el.nativeElement.querySelectorAll('.scard') as NodeListOf<HTMLElement>;
    cards.forEach((card: HTMLElement) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -6;
        const ry = ((x - cx) / cx) * 6;
        const gx = (x / rect.width) * 100;
        const gy = (y / rect.height) * 100;

        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.01)`;
        card.style.transition = 'transform 0.08s linear';
        card.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(17,19,24,0.95) 0%, rgba(17,19,24,0.8) 60%)`;
        card.style.borderColor = 'rgba(249,115,22,0.45)';
        card.style.setProperty('--gx', `${gx}%`);
        card.style.setProperty('--gy', `${gy}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.45s cubic-bezier(0.23,1,0.32,1), border-color 0.3s, background 0.3s';
        card.style.background = '';
        card.style.borderColor = '';
      });
    });
  }
}
