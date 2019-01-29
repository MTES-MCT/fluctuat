import { Component, Input } from '@angular/core';
import { UnloadInfo } from '../models/unload-info.model';

@Component({
  selector: 'flu-waybill-unload-info',
  templateUrl: './waybill-unload-info.component.html'
})
export class WaybillUnloadInfoComponent {

  @Input()
  unloadInfo: UnloadInfo

}
