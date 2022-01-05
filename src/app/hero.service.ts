import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Hero} from './hero';
//import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  private heroesUrl = 'http://localhost:4567/heroes/v1';
  geturl = 'http://localhost:4567/heroes/v1/heroes';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]>{
  return this.http.get<Hero[]>(this.geturl).pipe(
    tap(_ => this.log('fetched heroes')),
    catchError(this.handleError<Hero[]>('getHeroes',[])
    ));
} 
  private handleError<T>(operation = 'operation', result?: T){
    return ((error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    });
  
  }
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = this.heroesUrl + '/hero/?id=' + id;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  getHero(id: number): Observable<Hero>{
    const url = this.heroesUrl + '/hero/?id=' + id;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
  updateHero(hero:Hero): Observable<any> {
    return this.http.put(this.heroesUrl + "/existingHero", hero).pipe(
      tap(_ => this.log( `Updated Hero id=${hero.id}`)),
      catchError(this.handleError<any>('Updated Hero'))
    );
  }
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl + "/newHero", hero).pipe(
      tap((newHero: Hero) => this.log(`added hero with id=${newHero.id}`)),
      catchError(this.handleError<Hero>(`addHero`))
    );
  }
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/delete/?id=${id}`;
    return this.http.delete<Hero>(url).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(this.heroesUrl + "/heroByName/?name=" + term).pipe(
      tap(x => x.length ? 
      this.log(`found heroes matching ${term}`):
      this.log(`No heroes found matching ${term}`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
