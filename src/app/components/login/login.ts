import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  // WhatsApp Click-to-Chat State
  phoneNumber = '';
  generatedOtp = '';
  enteredOtp = '';
  otpSentStep = signal(false);

  // Sip & Dine's Business WhatsApp Number (with country code, no + or spaces)
  restaurantWhatsAppNumber = '919831477917';

  constructor(
    private router: Router,
    private cartService: CartService,
  ) {}

  // Step 1: Generate code and open WhatsApp with pre-filled text
  sendViaWhatsApp() {
    if (!this.phoneNumber || this.phoneNumber.length < 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    // Generate a secure 4-digit code
    this.generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    this.otpSentStep.set(true);

    // Construct the pre-filled WhatsApp message
    const message = encodeURIComponent(
      `Hi Sip & Dine! 🍕 My verification login code is *${this.generatedOtp}*. Please log me in.`,
    );
    const whatsappUrl = `https://wa.me/${this.restaurantWhatsAppNumber}?text=${message}`;

    // Open WhatsApp app/web in a new tab
    window.open(whatsappUrl, '_blank');
  }

  // Step 2: Verify the code entered back into the website
  verifyWhatsAppLogin() {
    if (this.enteredOtp.trim() === this.generatedOtp) {
      // Save login state in service
      this.cartService.setLoggedInUser(this.phoneNumber);
      alert('WhatsApp Authentication Successful! Welcome to Sip & Dine 🎉');
      this.router.navigate(['/']); // Go back to the main menu page
    } else {
      alert(
        'Incorrect code. Please make sure you entered the same code shown in your WhatsApp message.',
      );
    }
  }

  resetWhatsAppFlow() {
    this.otpSentStep.set(false);
    this.enteredOtp = '';
    this.generatedOtp = '';
  }
}
