import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  userType = '';

  constructor(private router: Router) {}

  goToHome(event: Event) {
    event.preventDefault();
    // Aquí podrías validar los datos si fuera necesario
    this.router.navigate(['/home-ova']);
  }
}
