import { Component, OnInit } from '@angular/core';
import { Hero }  from '../hero';
import { HeroService } from '../hero.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
 
  
   heroes : Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    this.messageService.clearFights();
  }
  add(name:string, damage:number, shield:number, stamina:number, superpower:string): void{
    name = name.trim();
    console.log(name);
    console.log(damage);
    console.log(shield);
    console.log(stamina);
    console.log(superpower);
    if(!name || !superpower || damage == 0 || shield == 0 || stamina == 0){
      return;
    }
    var hero:Hero = {name, damage, shield, stamina, superpower} as Hero;
    console.log(hero);
    this.heroService.addHero(hero).subscribe(hero => {
      this.heroes.push(hero);
    });
  }
  delete(hero:Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
