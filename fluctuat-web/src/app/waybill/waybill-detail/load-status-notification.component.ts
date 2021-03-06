import { Component, Input } from '@angular/core';
import { LoadInfo } from '../shared/models/load-info.model';

@Component({
  selector: 'flu-load-status-notification',
  templateUrl: 'load-status-notification.component.html'
})
export class LoadStatusNotificationComponent {

  @Input()
  loadInfo: LoadInfo;

  @Input()
  step: 'LOAD' | 'UNLOAD';

  stepName() {
    return this.step === 'LOAD' ? 'chargement' : 'déchargement';
  }

  isNotLoadFinished() {
    return this.loadInfo.sentAt && !this.loadInfo.validatedAt;
  }
}
