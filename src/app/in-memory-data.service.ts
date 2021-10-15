import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    const heroes = [
      { id: 1, name: 'Superman' },
      { id: 3, name: 'Iron Man' },
      { id: 5, name: 'Daredevil' },
      { id: 2, name: 'Spider-Man' },
      { id: 4, name: 'The Dark Knight' },
      { id: 6, name: 'Thor' },
      { id: 7, name: 'Hulk' },
      { id: 8, name: 'Groot' },
      { id: 9, name: 'Captain America' },
      { id: 10, name: 'Captain Marvel' }
    ];
    return {heroes};
  }
    genId(heroes: Hero[]): number {
      return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;
    }

  constructor() { }
}
