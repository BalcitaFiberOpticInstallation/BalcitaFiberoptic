import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements AfterViewInit {
  form = { name: '', company: '', email: '', phone: '', projectType: '', message: '' };
  submitted = false;

  constructor(private el: ElementRef) {}

  onSubmit() { this.submitted = true; }

  reset() {
    this.form = { name: '', company: '', email: '', phone: '', projectType: '', message: '' };
    this.submitted = false;
  }

  ngAfterViewInit() {
    const blocks = this.el.nativeElement.querySelectorAll('.info-block') as NodeListOf<HTMLElement>;
    blocks.forEach((block: HTMLElement) => {
      block.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = block.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((y - rect.height / 2) / (rect.height / 2)) * -6;
        const ry = ((x - rect.width  / 2) / (rect.width  / 2)) * 6;
        block.style.transform = `perspective(500px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        block.style.transition = 'transform 0.08s linear';
        block.style.borderColor = 'rgba(249,115,22,0.35)';
      });
      block.addEventListener('mouseleave', () => {
        block.style.transform = '';
        block.style.transition = 'transform 0.4s cubic-bezier(0.23,1,0.32,1)';
        block.style.borderColor = '';
      });
    });

    const formWrap = this.el.nativeElement.querySelector('.contact-form-wrap') as HTMLElement;
    if (formWrap) {
      formWrap.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = formWrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((y - rect.height / 2) / (rect.height / 2)) * -3;
        const ry = ((x - rect.width  / 2) / (rect.width  / 2)) * 3;
        formWrap.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        formWrap.style.transition = 'transform 0.1s linear';
      });
      formWrap.addEventListener('mouseleave', () => {
        formWrap.style.transform = '';
        formWrap.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
      });
    }
  }
}
