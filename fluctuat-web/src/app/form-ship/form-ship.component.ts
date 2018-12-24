import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ship } from '../shared/model/ship.model';
import { ShipService } from '../providers/ship.service';
import { buildGoNext } from '../shared/router-utils';

@Component({
  selector: 'flu-form-ship',
  templateUrl: './form-ship.component.html'
})
export class FormShipComponent implements OnInit {

  ship: Ship;

  nextStep: () => any;

  constructor(private shipService: ShipService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.ship = this.shipService.get();
    const contractId = this.route.snapshot.params[ 'id' ];

    const goNext = buildGoNext(this.router, `/contrat/${contractId}/chargement`);

    this.nextStep = () => {
      this.shipService.save(this.ship);
      return goNext();
    };
  }

}
