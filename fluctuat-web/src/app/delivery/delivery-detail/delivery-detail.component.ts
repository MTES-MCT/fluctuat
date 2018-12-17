import { Component, Input, OnInit } from '@angular/core';
import { Delivery } from '../delivery';

@Component({
  selector: 'flu-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: [ './delivery-detail.component.sass' ]
})
export class DeliveryDetailComponent implements OnInit {

  @Input()
  delivery: Delivery;

  ngOnInit() {
  }

}
