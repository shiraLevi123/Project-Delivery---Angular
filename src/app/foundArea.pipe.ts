import { Pipe, PipeTransform } from '@angular/core';
import { Order } from './models/order.model';

@Pipe({
  name: 'areaFilter',
  standalone: true
})
export class FoundAreaPipe implements PipeTransform {
  transform(orders: Order[], selectedArea: string): Order[] {
    if (!selectedArea) return orders;
    return orders.filter(order => order.city === selectedArea);
  }
}