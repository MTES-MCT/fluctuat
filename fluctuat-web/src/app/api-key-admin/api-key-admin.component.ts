import { Component, OnInit } from '@angular/core';
import { Observable, of, pipe, throwError } from 'rxjs';
import { ApiKey } from './api-key.model';
import { ApiKeyService } from './api-key.service';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FluValidators } from '../core/form-validators/flu-validators';
import { ResultHelper } from '../core/result-helper';

@Component({
  selector: 'flu-api-key-admin',
  templateUrl: './api-key-admin.component.html'
})
export class ApiKeyAdminComponent implements OnInit {

  apiKeys$: Observable<ApiKey[]>;
  result: ResultHelper = new ResultHelper();
  deleteResult: ResultHelper = new ResultHelper();

  active = false;

  createKeyForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiKeyService: ApiKeyService) {
  }

  ngOnInit() {
    this.createKeyForm = this.formBuilder.group({
      owner: ['', [Validators.email, FluValidators.withDomain, Validators.required]]
    });
    this.apiKeys$ = this.apiKeyService.getAll()
      .pipe(shareReplay(1));
  }

  deleteKey(id) {
    this.deleteResult.waiting();

    this.apiKeyService.deleteApiKey(id)
      .pipe(catchError((errorResponse) => throwError(errorResponse.error)))
      .pipe(switchMap(() => this.apiKeys$))
      .subscribe((apiKeys) => {
        this.result.success();
        apiKeys = apiKeys.filter(key => key._id !== id);
        this.apiKeys$ = of(apiKeys);
      }, error => this.deleteResult.error(error));
  }

  createKey() {
    this.result.waiting();

    this.apiKeyService.create(this.createKeyForm.value)
      .pipe(catchError((errorResponse) => throwError(errorResponse.error)))
      .subscribe((createdKey) => {
        this.addKey(createdKey);
        this.createKeyForm.reset();
        this.result.success();
        this.closeModal();
      }, error => this.result.error(error));
  }

  private addKey(apiKey) {
    this.apiKeys$.subscribe(apiKeys => {
      apiKeys.push(apiKey);
      this.apiKeys$ = of(apiKeys);
    });
  }

  openModal() {
    this.active = true;
  }

  closeModal() {
    this.createKeyForm.reset();
    this.active = false;
  }

  showError(control: AbstractControl) {
    return control && control.invalid && (control.dirty || control.touched);
  }

}
