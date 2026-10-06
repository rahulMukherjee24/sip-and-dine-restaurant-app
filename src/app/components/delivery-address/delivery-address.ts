import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, DeliveryAddress } from '../../services/cart';

@Component({
  selector: 'app-delivery-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delivery-address.html',
  styleUrls: ['./delivery-address.css'],
})
export class DeliveryAddressComponent {
  // Pre-saved mock addresses for quick selection
  savedAddresses: DeliveryAddress[] = [
    {
      fullName: 'Rahul Sharma',
      phone: '9876543210',
      street: 'Flat 402, Sunshine Apartments, MG Road',
      city: 'Bangalore',
      pincode: '560001',
      landmark: 'Near Central Mall',
    },
    {
      fullName: 'Rahul Sharma',
      phone: '9876543210',
      street: 'Office 3B, Tech Park, Outer Ring Road',
      city: 'Bangalore',
      pincode: '560103',
      landmark: 'Opposite Metro Station',
    },
  ];

  selectedAddressIndex = signal<number | null>(0); // Default to first saved address
  showNewAddressForm = signal<boolean>(false);

  // New address form model
  newAddress: DeliveryAddress = {
    fullName: '',
    phone: '',
    street: '',
    city: '',
    pincode: '',
    landmark: '',
  };

  constructor(
    public cartService: CartService,
    private router: Router,
  ) {}

  selectSavedAddress(index: number) {
    this.selectedAddressIndex.set(index);
    this.showNewAddressForm.set(false);
  }

  toggleNewAddressForm() {
    this.showNewAddressForm.set(true);
    this.selectedAddressIndex.set(null);
  }

  goBackToBasket() {
    this.router.navigate(['/basket']);
  }

  confirmAddress(event: Event) {
    event.preventDefault();

    let chosenAddress: DeliveryAddress;

    if (this.showNewAddressForm() || this.selectedAddressIndex() === null) {
      if (!this.newAddress.fullName || !this.newAddress.street || !this.newAddress.pincode) {
        alert('Please fill in all mandatory address fields.');
        return;
      }
      chosenAddress = this.newAddress;
    } else {
      chosenAddress = this.savedAddresses[this.selectedAddressIndex()!];
    }

    // Save to cart service
    this.cartService.setDeliveryAddress(chosenAddress);

    // Proceed to payment gateway
    this.router.navigate(['/payment']);
  }
}
