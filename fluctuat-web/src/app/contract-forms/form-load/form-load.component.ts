import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadInfoService } from '../../providers/load-info.service';
import { LoadInfo } from '../../shared/model/load-info.model';
import { buildGoNext } from '../../shared/router-utils';
import { AbstractForm } from '../abstract-form';


@Component({
  selector: 'flu-form-load',
  templateUrl: './form-load.component.html'
})
export class FormLoadComponent extends AbstractForm implements OnInit {

  @ViewChild('formLoad')
  form: NgForm;

  loadInfo: LoadInfo;

  nextStep: () => any;

  constructor(private loadInfoService: LoadInfoService, private route: ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit() {
    const contractId = this.route.snapshot.params[ 'id' ];
    this.loadInfo = this.loadInfoService.get(contractId);

    const goNext = buildGoNext(this.router, `/contrat/${contractId}/lettre-voiture`);

    this.nextStep = () => {
      this.loadInfoService.save(contractId, this.loadInfo);
      return goNext();
    };
  }

}
