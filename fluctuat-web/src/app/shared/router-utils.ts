import { Router } from '@angular/router';

export class RouterUtils {

  static buildGoNext(router: Router, destination: string) {
    return () => router.navigateByUrl(destination)
  }
}

export const buildGoNext = RouterUtils.buildGoNext;
