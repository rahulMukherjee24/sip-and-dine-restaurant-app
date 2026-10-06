import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, Dish } from '../../services/cart'; // Ensure path matches your project structure

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class MenuComponent {
  categories = ['All', 'Chinese', 'Indian', 'Continental', 'Drinks', 'Desserts'];
  selectedCategory = signal<string>('All');

  dishes: Dish[] = [
    {
      id: 1,
      name: 'Hakka Noodles',
      category: 'Chinese',
      price: 240,
      image:
        'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60',
      description: 'Stir-fried noodles with crisp veggies and savory sauces.',
    },
    {
      id: 2,
      name: 'Veg Manchurian',
      category: 'Chinese',
      price: 220,
      image:
        'https://images.unsplash.com/photo-1625398407667-9ec78e4d249d?w=500&auto=format&fit=crop&q=60',
      description: 'Deep-fried veggie dumplings tossed in a tangy soy-garlic sauce.',
    },
    {
      id: 3,
      name: 'Butter Chicken',
      category: 'Indian',
      price: 380,
      image:
        'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60',
      description: 'Tender chicken in a rich, buttery, and creamy tomato gravy.',
    },
    {
      id: 4,
      name: 'Paneer Tikka Masala',
      category: 'Indian',
      price: 320,
      image:
        'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop&q=60',
      description: 'Grilled paneer cubes simmered in a spiced onion-tomato curry.',
    },
    {
      id: 5,
      name: 'Grilled White Sauce Pasta',
      category: 'Continental',
      price: 340,
      image:
        'https://images.unsplash.com/photo-1621996346565-e3d5d6281297?w=500&auto=format&fit=crop&q=60',
      description: 'Penne pasta in a velvety garlic and herb cream sauce.',
    },
    {
      id: 6,
      name: 'Margherita Pizza',
      category: 'Continental',
      price: 400,
      image:
        'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&auto=format&fit=crop&q=60',
      description: 'Classic thin-crust pizza with fresh mozzarella and basil.',
    },
    {
      id: 7,
      name: 'Virgin Mojito',
      category: 'Drinks',
      price: 150,
      image:
        'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60',
      description: 'Refreshing blend of mint, lime, and sparkling soda.',
    },
    {
      id: 8,
      name: 'Cold Coffee',
      category: 'Drinks',
      price: 180,
      image:
        'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60',
      description: 'Blended chilled coffee topped with creamy milk foam.',
    },
    {
      id: 9,
      name: 'Chocolate Brownie',
      category: 'Desserts',
      price: 200,
      image:
        'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60',
      description: 'Warm, fudgy chocolate brownie served with chocolate drizzle.',
    },
    {
      id: 10,
      name: 'Gulab Jamun (2 pcs)',
      category: 'Desserts',
      price: 120,
      image:
        'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=500&auto=format&fit=crop&q=60',
      description: 'Deep-fried milk solids soaked in rose-scented sugar syrup.',
    },
  ];

  filteredDishes = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.dishes;
    return this.dishes.filter((d) => d.category === cat);
  });

  // Total items count tied directly to CartService
  totalItemsCount = computed(() => {
    return this.cartService.basketItems().reduce((sum, item) => sum + item.quantity, 0);
  });

  // Total price tied directly to CartService
  totalPrice = computed(() => {
    return this.cartService.itemTotal();
  });

  constructor(
    public cartService: CartService,
    private router: Router,
  ) {}

  selectCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  addToCart(dishId: number) {
    this.cartService.updateQuantity(dishId, 1);
  }

  removeFromCart(dishId: number) {
    this.cartService.updateQuantity(dishId, -1);
  }

  getQty(dishId: number): number {
    const item = this.cartService.basketItems().find((i) => i.id === dishId);
    return item ? item.quantity : 0;
  }

  goToBasket() {
    if (!this.cartService.isLoggedIn()) {
      alert('Please complete quick WhatsApp login to view your basket and place your order!');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/basket']);
  }

  openLoginModal() {
    this.router.navigate(['/login']);
  }
}
