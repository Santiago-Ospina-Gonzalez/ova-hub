import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
		{ path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent) },
		{ path: 'home-ova', loadComponent: () => import('./pages/home-ova/home-ova').then(m => m.HomeOva) },
		{ path: 'ovacostos', loadComponent: () => import('./pages/ovacostos/ovacostos').then(m => m.Ovacostos) },
		{ path: 'ovadiscretas', loadComponent: () => import('./pages/ovadiscretas/ovadiscretas').then(m => m.Ovadiscretas) },
		{ path: 'ovaanalisis', loadComponent: () => import('./pages/ovaanalisis/ovaanalisis').then(m => m.Ovaanalisis) },
	{ path: '**', redirectTo: 'login' }
];
