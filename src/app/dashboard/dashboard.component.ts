import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    
    this.heroService.getHeroes().subscribe( (heroes) => {
      var size = heroes.length/2 - heroes.length%2;
      for(var i = 0; i < size; i++){
        
      var randomIndex = Math.floor(Math.random() * heroes.length);
      //console.log(randomIndex);
      //console.log(heroes.splice(randomIndex,1));
      this.heroes.push(heroes.splice(randomIndex,1)[0]);
      console.log(this.heroes[i]);
      }
    });
  }
}
