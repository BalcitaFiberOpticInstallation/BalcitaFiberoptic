import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const cards = this.el.nativeElement.querySelectorAll('.client-card') as NodeListOf<HTMLElement>;
    cards.forEach((card: HTMLElement) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -7;
        const ry = ((x - cx) / cx) * 7;
        const gx = (x / rect.width) * 100;
        const gy = (y / rect.height) * 100;
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.01)`;
        card.style.transition = 'transform 0.08s linear';
        card.style.background = `radial-gradient(circle at ${gx}% ${gy}%, #212538 0%, #1c1f27 65%)`;
        card.style.borderColor = 'rgba(249,115,22,0.4)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.45s cubic-bezier(0.23,1,0.32,1), border-color 0.25s, background 0.3s';
        card.style.background = '';
        card.style.borderColor = '';
      });
    });
  }
}
