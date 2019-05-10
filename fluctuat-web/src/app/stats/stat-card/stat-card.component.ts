import { Component, Input } from '@angular/core';
import { StatCard } from './stat-card.model';

@Component({
  selector: 'flu-stat-card',
  templateUrl: './stat-card.component.html'
})
export class StatCardComponent {

  @Input()
  info: StatCard;

}
