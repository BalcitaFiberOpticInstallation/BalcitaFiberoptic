import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class Gallery implements AfterViewInit {
  active = 'all';

  items = [
    { cat: 'fiber',   label: 'Fiber Backbone',        desc: 'Multi-mode fiber backbone termination at enterprise server room.',      icon: 'fiber'   },
    { cat: 'fiber',   label: 'Fusion Splicing',        desc: 'Precision fusion splicing on single-mode fiber optic cable.',           icon: 'splice'  },
    { cat: 'testing', label: 'OTDR Testing',            desc: 'OTDR trace analysis for backbone link verification and fault locate.',   icon: 'otdr'    },
    { cat: 'testing', label: 'Fluke Certification',    desc: 'Fluke DSX certification test on Cat6A structured cabling.',             icon: 'fluke'   },
    { cat: 'rack',    label: 'Rack Buildout',           desc: 'Full rack assembly and cable management for data center deployment.',    icon: 'rack'    },
    { cat: 'rack',    label: 'Patch Panel Wiring',     desc: 'Cat6A patch panel termination and labeling for structured cabling.',     icon: 'patch'   },
    { cat: 'fiber',   label: 'Cable Pulling',           desc: 'Underground fiber conduit pull for inter-building backbone link.',       icon: 'pull'    },
    { cat: 'docs',    label: 'As-Built Documentation', desc: 'Completed as-built drawing and test report package for client sign-off.', icon: 'docs'  },
    { cat: 'testing', label: 'Network Validation',     desc: 'End-to-end network connectivity and performance validation.',            icon: 'network' },
  ];

  get filtered() {
    return this.active === 'all' ? this.items : this.items.filter(i => i.cat === this.active);
  }

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    // Event delegation — works even when @for rebuilds DOM on filter change
    const host = this.el.nativeElement as HTMLElement;
    let lastCard: HTMLElement | null = null;

    host.addEventListener('mousemove', (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest('.gallery-card') as HTMLElement | null;

      if (lastCard && lastCard !== card) {
        this.resetCard(lastCard);
        lastCard = null;
      }
      if (!card) return;
      lastCard = card;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y - rect.height / 2) / (rect.height / 2)) * -8;
      const ry = ((x - rect.width / 2)  / (rect.width  / 2)) * 8;

      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.03)`;
      card.style.transition = 'transform 0.08s linear';
      card.style.borderColor = 'rgba(249,115,22,0.45)';
      card.style.boxShadow  = '0 16px 40px rgba(249,115,22,0.1)';
    });

    host.addEventListener('mouseleave', () => {
      if (lastCard) { this.resetCard(lastCard); lastCard = null; }
    });
  }

  private resetCard(card: HTMLElement) {
    card.style.transform   = '';
    card.style.transition  = 'transform 0.4s cubic-bezier(0.23,1,0.32,1)';
    card.style.borderColor = '';
    card.style.boxShadow   = '';
  }
}
