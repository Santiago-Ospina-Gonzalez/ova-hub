import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ova-hub');

  // Modal state signals
  aboutOpen = signal(false);
  contactOpen = signal(false);

  // Contact data
  contactList = [
    { name: 'Cristian Daniel Cardona Correa', code: '230232024', email: 'cristian.cardona02@uceva.edu.co' },
    { name: 'Juan Esteban Castañeda Montaño', code: '230232003', email: 'juan.castaneda04@uceva.edu.co' },
    { name: 'Jhon Alexis González Cárdenas', code: '230232034', email: 'jhon.gonzalez01@uceva.edu.co' },
    { name: 'Brahian Andres Tenorio Reina', code: '230232017', email: 'brahian.tenorio01@uceva.edu.co' },
    { name: 'Santiago Ospina Gonzalez', code: '230231040', email: 'santiago.ospina03@uceva.edu.co' }
  ];

  constructor() {
    // Expose simple global functions so templates can open modals from plain onclick handlers
    (window as any).openAboutModal = () => this.aboutOpen.set(true);
    (window as any).closeAboutModal = () => this.aboutOpen.set(false);
    (window as any).openContactModal = () => this.contactOpen.set(true);
    (window as any).closeContactModal = () => this.contactOpen.set(false);
  }
}
