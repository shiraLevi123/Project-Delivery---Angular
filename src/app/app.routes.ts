import { Routes } from '@angular/router';
import { OrderListComponent } from './order/components/order-list/order-list.component';
import { AddDeliveryComponent } from './delivery/components/add-delivery/add-delivery.component';
import { LoginDeliveryComponent } from './delivery/components/login-delivery/login-delivery.component';
import { DeliveryListComponent } from './delivery/components/delivery-list/delivery-list.component';
import { ProfileComponent } from './delivery/components/profile/profile.component';
import { UpdateDeliveryComponent } from './delivery/components/update-delivery/update-delivery.component';
import { HomeComponent } from './home/home.component';
import { OrderBasketComponent } from './delivery/components/order-basket/order-basket.component';
import { checkUserGuard } from './guard/check-user-guard.guard';

export const routes: Routes = [
   
    { path: "", component: HomeComponent },
    { path: "order-basket", component: OrderBasketComponent ,canActivate:[checkUserGuard]},
    { path: "orders", component: OrderListComponent ,canActivate:[checkUserGuard]},
    { path: "delivery-list", component: DeliveryListComponent ,canActivate:[checkUserGuard]},
    { path: "add-delivery", component: AddDeliveryComponent ,canActivate:[checkUserGuard]},
    { path: "login-delivery", component: LoginDeliveryComponent },
    { path: 'update-delivery/:id', component: UpdateDeliveryComponent ,canActivate:[checkUserGuard]},
    { path: "profile", component: ProfileComponent ,canActivate:[checkUserGuard]},
    
    { path: "delivery", loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule) },
    { path: "order", loadChildren: () => import('./order/order.module').then(c => c.OrderModule) },

];
