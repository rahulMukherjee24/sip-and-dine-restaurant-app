import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { MenuComponent } from './components/menu/menu';
import { BasketComponent } from './components/basket/basket';
import { DeliveryAddressComponent } from './components/delivery-address/delivery-address';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'address', component: DeliveryAddressComponent },
  { path: 'payment', component: PaymentGatewayComponent },
  { path: '**', redirectTo: '' },
];
