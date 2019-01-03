import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UnloadInfoService } from '../../providers/unload-info.service';
import { AbstractForm } from '../abstract-form';
import { UnloadInfo } from '../../shared/model/unload-info.model';
import { buildGoNext } from '../../shared/router-utils';

@Component({
  selector: 'flu-form-unload',
  templateUrl: './form-unload.component.html'
})
export class FormUnloadComponent extends AbstractForm implements OnInit {

  @ViewChild('formUnload')
  form: NgForm;

  unloadInfo = new UnloadInfo();

  nextStep: () => any;

  constructor(private unloadInfoService: UnloadInfoService, private route: ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit() {
    this.unloadInfo = this.unloadInfoService.get();
    const contractId = this.route.snapshot.params[ 'id' ];

    const goNext = buildGoNext(this.router, `/contrat/${contractId}/lettre-voiture`);

    this.nextStep = () => {
      this.unloadInfoService.save(this.unloadInfo);
      return goNext();
    };
  }

}
