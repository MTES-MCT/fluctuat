import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShipService } from '../providers/ship.service';
import { AbstractForm } from '../shared/abstract-form';
import { Ship } from '../shared/model/ship.model';
import { buildGoNext } from '../shared/router-utils';

@Component({
  selector: 'flu-form-ship',
  templateUrl: './form-ship.component.html'
})
export class FormShipComponent extends AbstractForm implements OnInit {

  @ViewChild('formShip')
  form: NgForm;

  ship: Ship;

  nextStep: () => any;

  constructor(private shipService: ShipService, private router: Router, private route: ActivatedRoute) {
    super();
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
