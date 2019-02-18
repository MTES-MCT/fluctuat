import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaybillService } from '../shared/waybill.service';
import { GENERIC_ERROR_MSG } from '../../core/generic-error';

@Component({
  selector: 'flu-waybill-access',
  templateUrl: './waybill-access.component.html'
})
export class WaybillAccessComponent implements OnInit {

  waybillId: string;
  errorMsg: string;

  constructor(private router: Router, private route: ActivatedRoute, private waybillService: WaybillService) {
  }

  ngOnInit() {
    this.waybillId = this.route.snapshot.queryParams['id'];
  }

  send() {
    this.waybillService.get(this.waybillId).subscribe(() => {
      this.router.navigate(['lettre-de-voiture', this.waybillId.toUpperCase(), 'detail'])
    }, error => {
      this.errorMsg = error.status === 404 ? error.error : GENERIC_ERROR_MSG
    })
  }

}
