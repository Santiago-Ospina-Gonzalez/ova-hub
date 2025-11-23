import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ovaanalisis',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ovaanalisis.html',
  styleUrl: './ovaanalisis.css',
})
export class Ovaanalisis implements OnInit, OnDestroy {
  private lastScroll = 0;
  private onScroll = () => {
    const header = document.getElementById('header');
    if (!header) return;
    const current = window.scrollY || window.pageYOffset;
    if (current > this.lastScroll && current > 60) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    this.lastScroll = current;
  };

  constructor(private router: Router) {}
  goBack() { this.router.navigate(['/home-ova']); }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll as EventListener);
  }
}
