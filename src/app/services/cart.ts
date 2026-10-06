import { Injectable, signal, computed } from '@angular/core';

export interface Dish {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  pincode: string;
  landmark?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Cart items stored as a map of { dishId: quantity }
  private cartItems = signal<{ [key: number]: number }>({
    1: 2, // Sample pre-filled item: 2x Hakka Noodles
    3: 1, // Sample pre-filled item: 1x Butter Chicken
  });

  // Selected delivery address state
  deliveryAddress = signal<DeliveryAddress | null>(null);

  // Menu database dishes list
  private dishes: Dish[] = [
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

  // Computed signal to get detailed basket items with quantities
  basketItems = computed(() => {
    const currentCart = this.cartItems();
    return Object.entries(currentCart)
      .map(([idStr, qty]) => {
        const dish = this.dishes.find((d) => d.id === Number(idStr));
        return dish ? { ...dish, quantity: qty } : null;
      })
      .filter((item): item is Dish & { quantity: number } => item !== null);
  });

  // Financial calculations
  itemTotal = computed(() => {
    return this.basketItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
  });

  deliveryFee = computed(() => (this.itemTotal() > 0 ? 40 : 0));
  taxes = computed(() => Math.round(this.itemTotal() * 0.05)); // 5% GST
  grandTotal = computed(() => this.itemTotal() + this.deliveryFee() + this.taxes());

  // Method to update quantities from Menu or Basket components
  updateQuantity(dishId: number, delta: number) {
    this.cartItems.update((cart) => {
      const currentQty = cart[dishId] || 0;
      const newQty = currentQty + delta;

      const updated = { ...cart };
      if (newQty <= 0) {
        delete updated[dishId];
      } else {
        updated[dishId] = newQty;
      }
      return updated;
    });
  }

  // Method to set delivery address
  public setDeliveryAddress(address: DeliveryAddress) {
    this.deliveryAddress.set(address);
  }

  // Clear cart upon successful order placement
  clearCart() {
    this.cartItems.set({});
    this.deliveryAddress.set(null);
  }

  // User Authentication state
  isLoggedIn = signal<boolean>(false);
  loggedInPhone = signal<string | null>(null);

  setLoggedInUser(phone: string) {
    this.isLoggedIn.set(true);
    this.loggedInPhone.set(phone);
  }

  logoutUser() {
    this.isLoggedIn.set(false);
    this.loggedInPhone.set(null);
  }
}
