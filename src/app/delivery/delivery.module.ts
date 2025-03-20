import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDeliveryComponent } from './components/add-delivery/add-delivery.component';
import { LoginDeliveryComponent } from './components/login-delivery/login-delivery.component';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';
import { RouterModule } from '@angular/router';
import { UpdateDeliveryComponent } from './components/update-delivery/update-delivery.component';
import { OrderBasketComponent } from './components/order-basket/order-basket.component';

@NgModule({
  declarations: [
    AddDeliveryComponent,
    LoginDeliveryComponent,
    DeliveryListComponent,
    UpdateDeliveryComponent,
    OrderBasketComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class DeliveryModule { }
