import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  userType = '';
  email = '';
  confirmPassword = '';
  isRegisterMode = false;
  isAnimating = false;

  constructor(private router: Router) {}

  goToHome(event: Event) {
    event.preventDefault();
    // Aquí podrías validar los datos si fuera necesario
    this.router.navigate(['/home-ova']);
  }

  toggleMode() {
    this.isAnimating = true;
    setTimeout(() => {
      this.isRegisterMode = !this.isRegisterMode;
    }, 250);
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  register(event: Event) {
    event.preventDefault();
    // Aquí iría la lógica de registro
    console.log('Registrando usuario...');
    this.router.navigate(['/home-ova']);
  }
}
