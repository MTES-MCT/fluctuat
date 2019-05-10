import { Component, OnInit } from '@angular/core';
import { StatsService } from './stats.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'flu-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit {

  stats$: Observable<StatsInfo>;

  constructor(private statsService: StatsService) {
  }

  ngOnInit() {
    this.stats$ = this.statsService.getStats()
      .pipe(shareReplay(1));
  }

}
