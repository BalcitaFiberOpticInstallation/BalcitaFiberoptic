import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FiberNode {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
}

interface Pulse {
  fromX: number; fromY: number;
  toX: number; toY: number;
  t: number; speed: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  private animId = 0;
  private pulseTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.initCanvas();
    this.initCardTilt('.card');
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animId);
    if (this.pulseTimer) clearTimeout(this.pulseTimer);
  }

  private initCanvas() {
    const canvas = this.el.nativeElement.querySelector('#fiber-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodes: FiberNode[] = Array.from({ length: 26 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.4 + 0.8,
    }));

    const pulses: Pulse[] = [];
    const maxDist = 170;

    const spawnPulse = () => {
      const i = Math.floor(Math.random() * nodes.length);
      const j = Math.floor(Math.random() * nodes.length);
      if (i !== j) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < maxDist) {
          pulses.push({
            fromX: nodes[i].x, fromY: nodes[i].y,
            toX: nodes[j].x, toY: nodes[j].y,
            t: 0, speed: 0.009 + Math.random() * 0.009,
          });
        }
      }
      this.pulseTimer = setTimeout(spawnPulse, 180 + Math.random() * 500);
    };
    this.pulseTimer = setTimeout(spawnPulse, 400);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(249,115,22,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Pulses (light traveling along fibers)
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        if (p.t >= 1) { pulses.splice(i, 1); continue; }

        const px = p.fromX + (p.toX - p.fromX) * p.t;
        const py = p.fromY + (p.toY - p.fromY) * p.t;

        const grd = ctx.createRadialGradient(px, py, 0, px, py, 7);
        grd.addColorStop(0, 'rgba(249,115,22,1)');
        grd.addColorStop(0.3, 'rgba(249,115,22,0.5)');
        grd.addColorStop(1, 'rgba(249,115,22,0)');
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Nodes
      nodes.forEach(n => {
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        grd.addColorStop(0, 'rgba(249,115,22,0.18)');
        grd.addColorStop(1, 'rgba(249,115,22,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(249,115,22,0.75)';
        ctx.fill();
      });

      this.animId = requestAnimationFrame(draw);
    };

    draw();
  }

  private initCardTilt(selector: string) {
    const cards = this.el.nativeElement.querySelectorAll(selector) as NodeListOf<HTMLElement>;
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
