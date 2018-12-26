import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadInfo } from '../shared/model/load-info.model';
import { LoadInfoService } from '../providers/load-info.service';
import { buildGoNext } from '../shared/router-utils';

@Component({
  selector: 'flu-form-load',
  templateUrl: './form-load.component.html'
})
export class FormLoadComponent implements OnInit {

  loadInfo = new LoadInfo();

  nextStep: () => any;

  constructor(private loadInfoService: LoadInfoService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.loadInfo = this.loadInfoService.get();
    const contractId = this.route.snapshot.params[ 'id' ];

    const goNext = buildGoNext(this.router, `/contrat/${contractId}/lettre-voiture`);

    this.nextStep = () => {
      this.loadInfoService.save(this.loadInfo);
      return goNext();
    };
  }

}
