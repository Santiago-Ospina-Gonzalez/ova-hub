import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ovaanalisis',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ovaanalisis.html',
  styleUrl: './ovaanalisis.css',
})
export class Ovaanalisis {
  constructor(private router: Router) {}
  goBack() { this.router.navigate(['/home-ova']); }
}
