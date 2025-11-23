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
  // UI message
  message = '';
  messageType: 'success' | 'error' | 'info' | '' = '';

  constructor(private router: Router) {}

  async login(event: Event) {
    event.preventDefault();
    if (!this.email || !this.password) {
      this.setMessage('error', 'Por favor ingresa email y contraseña');
      return;
    }

    try {
      const res = await fetch('http://localhost:8082/api/usuario-service/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, password: this.password })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        const serverMsg = err?.error || err?.mensaje || 'Credenciales inválidas';
        this.setMessage('error', serverMsg);
        return;
      }

      const data = await res.json();
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      this.setMessage('success', data.mensaje || 'Login exitoso');
      // wait a moment so the user sees the success message
      setTimeout(() => this.router.navigate(['/home-ova']), 1200);
    } catch (e) {
      console.error(e);
      this.setMessage('error', 'No se pudo conectar al servidor');
    }
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

  async register(event: Event) {
    event.preventDefault();
    if (!this.username || !this.email || !this.password) {
      this.setMessage('error', 'Por favor completa todos los campos');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.setMessage('error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch('http://localhost:8082/api/usuario-service/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: this.username, email: this.email, password: this.password })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        const serverMsg = err?.error || err?.mensaje || 'Error en el registro';
        this.setMessage('error', serverMsg);
        return;
      }

      const data = await res.json();
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      this.setMessage('success', data.mensaje || 'Usuario creado exitosamente');
      this.isRegisterMode = false;
      // give time to read the message before navigating
      setTimeout(() => this.router.navigate(['/home-ova']), 1200);
    } catch (e) {
      console.error(e);
      this.setMessage('error', 'No se pudo conectar al servidor');
    }
  }

  setMessage(type: 'success' | 'error' | 'info' | '', msg: string, timeout = 4000) {
    this.messageType = type;
    this.message = msg;
    if (timeout > 0) {
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, timeout);
    }
  }
}
