import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'powerTotal',
  standalone: true 
})

export class PowerTotalPipe implements PipeTransform {
  transform(hero: any): number {
    if (!hero || !hero.powerstats) {
      return 0;
    }
    return hero.powerstats.intelligence +
           hero.powerstats.strength +
           hero.powerstats.speed +
           hero.powerstats.durability +
           hero.powerstats.power +
           hero.powerstats.combat;
  }
}