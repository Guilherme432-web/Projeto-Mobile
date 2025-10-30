import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuperheroService } from '../services/superhero';
import { Powerful } from '../directives/powerful';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar } from '@ionic/angular/standalone';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    Powerful, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar, UpperCasePipe, FormsModule
  ]
})
export class HomePage {
  heroes: any[] = [];
  allHeroes: any[] = [];  
  filteredHeroes: any[] = []; 
  loading = false;
  gameStarted = false;
  searchTerm = '';  
  currentPage = 0;  
  itemsPerPage = 10;  

  constructor(private superheroService: SuperheroService, private router: Router) {}

  startGame() {
    this.gameStarted = true;
    this.loading = true;
    this.superheroService.getAllHeroes().subscribe({
      next: (data) => {
        this.allHeroes = data;  
        this.loadPage();  
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar heróis:', err);
        this.loading = false;
      }
    });
  }

  loadPage() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.heroes = this.allHeroes.slice(start, end);  
    this.filterHeroes();  
  }

  filterHeroes() {
    if (this.searchTerm.trim() === '') {
      this.filteredHeroes = this.heroes; 
    } else {
      this.filteredHeroes = this.heroes.filter(hero =>
        hero.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  nextPage() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.allHeroes.length) {
      this.currentPage++;
      this.loadPage();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPage();
    }
  }

  selectHero(hero: any) {
    this.router.navigate(['/game', hero.id]);
  }
}