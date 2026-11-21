import { Component, signal, computed, effect } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.html',
  styleUrl: './boutique.css',
})
export class Boutique {
  products = signal<Product[]>([
    { id: 1, name: 'Clavier', price: 30, stock: 3 },
    { id: 2, name: 'Souris', price: 15, stock: 0 },
    { id: 3, name: 'Écran', price: 120, stock: 2 },
  ]);

  cart = signal<Product[]>([]);

  // signal pour le champ de saisie (comme "new" dans ton cours)
  newName = signal('');

  availableProducts = computed(() =>
    this.products().filter(p => p.stock > 0)
  );

  isStockEmpty = computed(() => this.availableProducts().length === 0);

  cartCount = computed(() => this.cart().length);

  cartTotal = computed(() =>
    this.cart().reduce((sum, p) => sum + p.price, 0)
  );

  // effect : se relance automatiquement quand availableProducts change
  constructor() {
    effect(() => {
      console.log('Available products:', this.availableProducts());
    });
  }

  addProduct() {
    const name = this.newName().trim();
    if (!name) return;

    this.products.update(list => [
      ...list,
      { id: Date.now(), name, price: 10, stock: 5 },
    ]);
    this.newName.set('');
  }

  addToCart(product: Product) {
    if (product.stock === 0) return;

    this.products.update(list =>
      list.map(p => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p))
    );

    this.cart.update(items => [...items, product]);
  }

  clearCart() {
    this.cart.set([]);
  }
}