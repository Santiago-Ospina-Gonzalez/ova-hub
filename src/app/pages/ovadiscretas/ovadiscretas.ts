import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ovadiscretas',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ovadiscretas.html',
  styleUrl: './ovadiscretas.css',
})
export class Ovadiscretas {
  constructor(private router: Router) {}
  goBack() { this.router.navigate(['/home-ova']); }
}
