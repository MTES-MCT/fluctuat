import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { buildGoNext } from '../../shared/router-utils';
import { LoadInfo } from '../load-info';
import { LoadInfoService } from './load-info.service';

@Component({
  selector: 'flu-form-loading',
  templateUrl: './form-loading.component.html'
})
export class FormLoadingComponent implements OnInit {

  loadInfo = new LoadInfo();

  nextStep: () => any;

  constructor(private loadInfoService: LoadInfoService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.loadInfo = this.loadInfoService.get();
    const contractId = this.route.snapshot.params[ 'id' ];

    const goNext = buildGoNext(this.router, `/contrat/${contractId}/lettre-voiture-chargement`);

    this.nextStep = () => {
      this.loadInfoService.save(this.loadInfo);
      return goNext();
    };
  }

}
