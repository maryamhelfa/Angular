import { Component } from '@angular/core';
import { Boutique } from './boutique/boutique';

@Component({
  selector: 'app-root',
  imports: [Boutique],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}