import { Injectable } from '@angular/core';
import { Ship } from './ship';

@Injectable()
export class ShipService {

  save(ship: Ship) {
    localStorage.ship = JSON.stringify(ship);
  }

  get() {
    return localStorage.ship ? JSON.parse(localStorage.ship) : new Ship();
  }
}
