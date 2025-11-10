import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperheroService } from '../services/superhero';
import { PowerTotalPipe } from '../pipes/power-total-pipe';  // Verifique se o caminho está correto (pode ser '../pipes/power-total.pipe')
import { Powerful } from '../directives/powerful'; 
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: 'game.page.html',
  styleUrls: ['game.page.scss'],
  standalone: true,
  imports: [
    PowerTotalPipe, Powerful, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonSpinner, UpperCasePipe
  ]
})
export class GamePage implements OnInit {
  selectedHero: any;
  opponent: any;
  winner: any;
  loading = true;
  battleDone = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private superheroService: SuperheroService
  ) {}

  ngOnInit() {
    // Mantém a linha original, mas adiciona verificação logo após
    const heroId = + (this.route.snapshot.paramMap.get('id')?? '0');
    
    // Verificação para salvar a linha: se inválido, redireciona
    if (!heroId || isNaN(heroId) || heroId <= 0) {
      console.error('Erro: ID de herói inválido ou ausente!');
      this.router.navigate(['/home']);
      return;
    }

    // Continua normalmente se válido
    this.superheroService.getHero(heroId).subscribe({
      next: (hero) => {
        this.selectedHero = hero;
        this.loadOpponent(); 
      },
      error: (err) => {
        console.error('Erro ao carregar herói:', err);
        this.loading = false;
      }
    });
  }

  loadOpponent() {
    this.superheroService.getAllHeroes().subscribe({
      next: (heroes) => {
        let randomHero;
        do {
          randomHero = heroes[Math.floor(Math.random() * heroes.length)];
        } while (randomHero.id === this.selectedHero.id);
        this.opponent = randomHero;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar oponente:', err);
        this.loading = false;
      }
    });
  }

  battle() {
    const selectedPower = this.selectedHero.powerstats.strength;
    const opponentPower = this.opponent.powerstats.strength;
    this.winner = selectedPower > opponentPower ? this.selectedHero : this.opponent;
    this.battleDone = true;
  }

  newBattle() {
    this.battleDone = false;
    this.winner = null;
    this.loadOpponent();
  }
}
