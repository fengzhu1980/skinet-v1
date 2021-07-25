import { OrdersService } from '../orders.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order?: IOrder

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService, private ordersService: OrdersService) {
    this.breadcrumbService.set('@OrderDetailed', '');
  }

  ngOnInit(): void {
    var tempIdString = this.route.snapshot.paramMap.get('id');
    var tempId = 0;
    if (tempIdString) {
      tempId = +tempIdString;
    }
    this.ordersService.getOrderDetailed(tempId).subscribe((order: any) => {
      this.order = order;
      this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
    }, error => {
      console.log(error);
    });
  }

}
