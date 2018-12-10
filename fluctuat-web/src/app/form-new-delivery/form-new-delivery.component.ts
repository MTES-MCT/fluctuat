import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Delivery } from './delivery';
import { DeliveryService } from './delivery.service';

@Component({
  selector: 'flu-form-new-path',
  templateUrl: './form-new-delivery.component.html'
})
export class FormNewDeliveryComponent implements OnInit {

  delivery: Delivery = new Delivery();

  readonly ports = [
    'Grand Port maritime du Havre',
    'Grand Port Maritime de Rouen',
    'GPMR - Honfleur',
    'GPMR - Radicatel',
    'GPMR - Wandrille',
    'Paris - Port de Bonneuil-sur-Marne',
    'Paris - Quai de Boulogne-Legrand',
    'Paris - Quai de la Bourdonnais',
    'Paris - Quai de Bray-sur-Seine',
    'Paris - Port de Bruyères-sur-Oise',
    'Paris - Quai de Charenton-le-Pont',
    'Paris - Quai de Clichy',
    'Paris - Quai de Conflans-Fin-d’Oise',
    'Paris - Quai de Corbeil-Essonnes',
    'Paris - Port d’Evry',
    'Paris - Port de Gennevilliers',
    'Paris - Port de Javel',
    'Paris - Quai de Lagny-sur-Marne',
    'Paris - Quai du Pecq',
    'Paris - Quai des Mureaux',
    'Paris - Port de Limay-Porcheville',
    'Paris - Quai de Meaux',
    'Paris - Quai de Montereau-Fault-Yonne',
    'Paris - Quai de Nanterre-Jules-Quentin',
    'Paris - Quai de Nanterre-Lavoisier',
    'Paris - Quai de Point-du-Jour',
    'Paris - Quai de Saint-Denis-l’Etoile',
    'Paris - Quai de Saint-Ouen-l’Aumône',
    'Paris - Quai de Tolbiac',
    'Port Angot (Elbeuf)',
    'Port de l’Aube',
    'Port de Châlons-en-Champagne',
    'Port de Gaillon',
    'Port de Gron Haute Bourgogne',
    'Port de Joigny',
    'Port de Longueil-Ste-Marie',
    'Port de Nogent-sur-Oise',
    'Port privé de Nogent-sur-Seine',
    'Port de Reims-Colbert',
  ];

  constructor(private deliveryService: DeliveryService, private router: Router) {
  }

  ngOnInit() {
    this.delivery = this.deliveryService.get();
  }

  save() {
    this.deliveryService.save(this.delivery);
    this.router.navigateByUrl('/resume')
  }
}
