import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WaybillService } from './waybill.service';

@Component({
  selector: 'flu-waybill-new',
  templateUrl: './waybill-new.component.html'
})
export class WaybillNewComponent implements OnInit {

  waybillForm: FormGroup;

  constructor(private fromBuilder: FormBuilder, private waybillService: WaybillService) {
  }

  ngOnInit() {
    this.waybillForm = this.fromBuilder.group({
      customer: this.buildPersonFormGroup(),
      sender: this.buildPersonFormGroup(),
      receiver: this.buildPersonFormGroup(),
      transporter: this.buildPersonFormGroup(),
      ship: this.fromBuilder.group({
        name: [ '' ],
        regNumber: [ '' ]
      })
    })
  }

  buildPersonFormGroup() {
    return this.fromBuilder.group({
      name: [ '' ],
      email: [ '', Validators.email ]
    })
  }

  create() {
    this.waybillService.create(this.waybillForm.value).subscribe((result) => {
      console.log(result)
    })
  }

}
