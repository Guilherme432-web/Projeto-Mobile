import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuperheroService } from '../services/superhero';
import { Powerful } from '../directives/powerful';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    Powerful, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, UpperCasePipe
  ]
})
export class HomePage implements OnInit {
  heroes: any[] = [];
  loading = true;

  constructor(private superheroService: SuperheroService, private router: Router) {}

  ngOnInit() {
    this.superheroService.getAllHeroes().subscribe({
      next: (data) => {
        this.heroes = data.slice(0, 10);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar heróis:', err);
        this.loading = false;
      }
    });
  }

  startGame() {
    this.router.navigate(['/game'], { queryParams: { heroId: this.heroes[0]?.id || 1 } });
  }
}