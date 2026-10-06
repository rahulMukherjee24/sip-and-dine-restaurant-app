import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket.html',
  styleUrls: ['./basket.css'],
})
export class BasketComponent {
  constructor(
    public cartService: CartService,
    private router: Router,
  ) {}

  increase(id: number) {
    this.cartService.updateQuantity(id, 1);
  }

  decrease(id: number) {
    this.cartService.updateQuantity(id, -1);
  }

  goBackToMenu() {
    this.router.navigate(['/menu']);
  }

  proceedToAddress() {
    this.router.navigate(['/address']);
  }
}
