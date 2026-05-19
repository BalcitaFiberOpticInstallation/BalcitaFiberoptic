import { Component, AfterViewInit, ElementRef } from '@angular/core';

export interface CardDetail {
  title: string;
  icon: string;
  summary: string;
  items: { label: string; desc: string }[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit {
  activeCard: CardDetail | null = null;

  cards: CardDetail[] = [
    {
      title: 'Company Type',
      icon: 'building',
      summary: 'Project-based fiber optic and network infrastructure contractor supporting enterprise-grade environments.',
      items: [
        { label: 'Contractor & Subcontractor', desc: 'We operate as a direct contractor and subcontractor for large-scale fiber optic and network projects.' },
        { label: 'Project-Based Model', desc: 'Engaged per project — from scoping and quotation through installation, testing, and turnover.' },
        { label: 'Enterprise-Grade Standards', desc: 'All work adheres to industry standards including EIA/TIA, ISO/IEC 11801, and local regulatory requirements.' },
        { label: 'Nationwide Reach', desc: 'Active across major project sites throughout the Philippines — Metro Manila, Visayas, and Mindanao.' },
      ],
    },
    {
      title: 'Industries Served',
      icon: 'network',
      summary: 'Serving a broad range of industries that depend on reliable, high-performance fiber optic infrastructure.',
      items: [
        { label: 'Hospitals & Healthcare', desc: 'Structured cabling and fiber backbone for medical facilities requiring 24/7 uptime and compliance.' },
        { label: 'Data Centers', desc: 'High-density fiber runs, rack buildout, patch panel termination, and OTDR validation.' },
        { label: 'Telecom Facilities', desc: 'Splicing, testing, and integration work for telecommunications carriers and tower operators.' },
        { label: 'Commercial & Corporate', desc: 'End-to-end network infrastructure for office buildings, BPO campuses, and commercial properties.' },
      ],
    },
    {
      title: 'Documentation',
      icon: 'document',
      summary: 'We deliver complete project documentation from kickoff to turnover — ensuring transparency and compliance.',
      items: [
        { label: 'Quotations & BOQ', desc: 'Detailed cost estimates and bill of quantities prepared before work begins.' },
        { label: 'As-Built Plans', desc: 'Accurate drawings reflecting the final installed layout of all cable routes and terminations.' },
        { label: 'Test Results', desc: 'OTDR traces and Fluke reports for every fiber run and copper link — saved in digital and printed format.' },
        { label: 'Progress & Turnover Reports', desc: 'Milestone updates during construction and complete handover documentation upon project completion.' },
      ],
    },
    {
      title: 'Technical Expertise',
      icon: 'chip',
      summary: 'Hands-on field expertise across the full spectrum of fiber optic and structured cabling work.',
      items: [
        { label: 'Fusion Splicing', desc: 'Single-mode and multi-mode fiber splicing with splice loss verification using OTDR.' },
        { label: 'OTDR & Fluke Testing', desc: 'Bidirectional OTDR testing and Fluke DSX/OptiFiber certification for every link.' },
        { label: 'Rack Buildout & Cabling', desc: 'Structured cabling installation, patch panel termination, and clean rack assembly in data rooms.' },
        { label: 'Endpoint & Network Validation', desc: 'Switch deployment, endpoint configuration, and full network validation prior to turnover.' },
      ],
    },
  ];

  constructor(private el: ElementRef) {}

  openCard(card: CardDetail) {
    this.activeCard = card;
  }

  closeCard() {
    this.activeCard = null;
  }

  ngAfterViewInit() {
    const cards = this.el.nativeElement.querySelectorAll('.info-card') as NodeListOf<HTMLElement>;
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
