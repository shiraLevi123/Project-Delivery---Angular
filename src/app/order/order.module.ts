import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './components/order-list/order-list.component';
import { RouterModule } from '@angular/router';
import { FoundAreaPipe } from '../foundArea.pipe';
import { FormsModule } from '@angular/forms';
import { ExpiredOrderDirective } from '../directives/expired-order.directive';

@NgModule({
  declarations: [OrderListComponent, ExpiredOrderDirective],
  imports: [
    CommonModule, RouterModule, FoundAreaPipe, FormsModule
  ]
})
export class OrderModule { }
