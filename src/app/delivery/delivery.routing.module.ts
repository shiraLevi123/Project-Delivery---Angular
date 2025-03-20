import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AddDeliveryComponent } from './components/add-delivery/add-delivery.component';
import { LoginDeliveryComponent } from './components/login-delivery/login-delivery.component';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateDeliveryComponent } from './components/update-delivery/update-delivery.component';
import { OrderBasketComponent } from './components/order-basket/order-basket.component';

const routes: Route[] = [
  { path: 'add-delivery', component: AddDeliveryComponent },
  { path: 'login-delivery', component: LoginDeliveryComponent },
  { path: "delivery-list", component: DeliveryListComponent },
  { path: "profile", component: ProfileComponent },
  { path: 'update-delivery/:id', component: UpdateDeliveryComponent },
  { path: "order-basket", component: OrderBasketComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class DeliveryRoutingModule { }
