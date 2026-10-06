import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-payment-gateway',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-gateway.html',
  styleUrls: ['./payment-gateway.css'],
})
export class PaymentGatewayComponent {
  selectedMethod = signal<'upi' | 'netbanking' | 'cash'>('upi');

  // UPI Form state
  upiId = '';

  // Net Banking Form state
  selectedBank = 'HDFC';
  banks = [
    { id: 'HDFC', name: 'HDFC Bank' },
    { id: 'ICICI', name: 'ICICI Bank' },
    { id: 'SBI', name: 'State Bank of India' },
    { id: 'AXIS', name: 'Axis Bank' },
  ];

  // Order Success State
  isOrderPlaced = signal(false);

  constructor(
    public cartService: CartService,
    private router: Router,
  ) {}

  selectPaymentMethod(method: 'upi' | 'netbanking' | 'cash') {
    this.selectedMethod.set(method);
  }

  goBackToAddress() {
    this.router.navigate(['/address']);
  }

  payNow() {
    if (this.selectedMethod() === 'upi' && !this.upiId.trim()) {
      alert('Please enter a valid UPI ID (e.g. username@okhdfcbank)');
      return;
    }

    // Mark the order as placed successfully (Keep cart data intact so the success summary displays correctly!)
    this.isOrderPlaced.set(true);
  }

  returnToHome() {
    // Clear the cart only now when the user finishes viewing the success summary and goes back to order more
    this.cartService.clearCart();
    this.router.navigate(['/menu']);
  }
}
