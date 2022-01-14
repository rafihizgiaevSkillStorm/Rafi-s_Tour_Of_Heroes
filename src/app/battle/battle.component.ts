import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
 fighting:boolean = false;
 multiPlayer = false;
 singlePlayer = true;
 heroes : Hero[] = [];
 player1?:Hero;
 player2?:Hero;
 hp1?:number;
 hp2?:number;
 numberOfMoves!:number;
 turnToAttack!:number;
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.messageService.clearFights();
  }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  isNaN: Function = Number.isNaN;
  setPlayer1(hero:Hero){
    this.player1 = hero;
    this.singlePlayer = !this.singlePlayer;
  }
  unsetPlayer1(){
    this.player1 = undefined;
    this.singlePlayer = !this.singlePlayer;
  }
  unsetPlayer2(){
    this.player2 = undefined;
  }
  computerHero():void{
    this.player2 = this.heroes[Math.floor(Math.random() * this.heroes.length)];
    console.log(this.player1);
    console.log(this.player2);
  }
  numberOfPlayers():void{
    this.multiPlayer=!this.multiPlayer; 
    console.log(this.player1);
    console.log(this.player2);
    this.player2 = undefined;
  }
   playTurn():void{
     setTimeout(() => {
    if((this.hp1! > 0) && (this.hp2! > 0)){
    this.messageService.addFight({text : "Player" + this.turnToAttack + "'s turn to attack", turnToAttack : this.turnToAttack});
    var wildCard:number;//wildcard factor - intesity of attack
    var accuracy;//0||1 - hit or no
    var sign;
      if(this.turnToAttack == 1){
        sign = document.getElementById("player1Turn");
        sign!.style.visibility = "visible";
        sign = document.getElementById("player2Turn");
        sign!.style.visibility = "hidden"; 
        setTimeout(() => {
        accuracy = (Math.random() < ((this.player1!.stamina / 100) * 0.90)) ? 1 : 0;
        // this.messageService.add("accuracy1 : " + accuracy);
        if(accuracy == 1){
          var action = document.getElementById("action");
          action!.innerHTML = "Player1 attacks with " + this.player1?.superpower;
          this.messageService.addFight({text : "Player1 attacks with " + this.player1?.superpower, turnToAttack : this.turnToAttack});
          wildCard = Math.random() + 1;
          // this.messageService.add("Player1 attack force is : " + wildCard);
          if(this.hp2! > Math.floor(((this.player1!.damage * 2) + (this.player1!.stamina * 2)) / Math.floor(Math.sqrt(2 * this.player2!.shield)) * wildCard)){
          this.numberOfMoves++;
          this.hp2 = this.hp2! - Math.floor(((this.player1!.damage * 2) + (this.player1!.stamina * 2)) / Math.floor(Math.sqrt(2 * this.player2!.shield)) * wildCard);
          
        }else{
          // this.hp2 = this.hp2! - Math.floor((((this.player1!.damage * 2)+ (this.player2!.shield * 2)) / Math.floor(Math.sqrt(2 * this.player2!.stamina))) * wildCard);
          this.numberOfMoves++;
          this.hp2 = 0;
          var action = document.getElementById("action");
          action!.innerHTML = "FATALATY!\n Player1 has won with : " + this.player1!.name;
          var icon = document.getElementById("icon1");
          icon!.innerText = "emoji_events";
          this.messageService.addFight({text : "FATALATY", turnToAttack : this.turnToAttack});
          this.messageService.addFight({text : "Player1 has won with : " + this.player1!.name, turnToAttack : this.turnToAttack});  
          
        }
          this.messageService.addFight({text : "damage1 = " + Math.floor(((this.player1!.damage * 2) + (this.player1!.stamina * 2)) / Math.floor(Math.sqrt(2 * this.player2!.shield)) * wildCard), turnToAttack : this.turnToAttack}); 
          this.messageService.addFight({text : "hp2 = " + this.hp2, turnToAttack : this.turnToAttack});
          this.turnToAttack = 2;
         
        
      }else{    
        var action = document.getElementById("action");
        action!.innerHTML = "Player1's attack misses!";   
        this.messageService.addFight({text : "Player1's attack misses!", turnToAttack : this.turnToAttack});
        this.turnToAttack = 2;
      }
        }, 2000);
        
       
    }else{
        sign = document.getElementById("player2Turn");
        sign!.style.visibility = "visible";
        sign = document.getElementById("player1Turn");
        sign!.style.visibility = "hidden";
        setTimeout(() => {
        accuracy = (Math.random() < ((this.player2!.stamina / 100) * 0.90)) ? 1 : 0;
        // this.messageService.add("accuracy2 : " + accuracy);
        if(accuracy == 1){
          var action = document.getElementById("action");
          action!.innerHTML = "Player2 attacks with " + this.player2?.superpower;
          this.messageService.addFight({text : "Player2 attacks with " + this.player2?.superpower, turnToAttack : this.turnToAttack});
          wildCard = Math.random() + 1;
          // this.messageService.add("Player2 attack force is : " + wildCard);
          if(this.hp1! > Math.floor(((this.player2!.damage * 2) + (this.player2!.stamina * 2)) / Math.floor(Math.sqrt(2 * this.player1!.shield)) * wildCard)){
          this.numberOfMoves++;
          this.hp1 = this.hp1! - Math.floor(((this.player2!.damage * 2) + (this.player2!.stamina * 2)) / Math.floor(Math.sqrt(2 * this.player1!.shield)) * wildCard); 
          
          }else{
            this.numberOfMoves++;
            this.hp1 = 0;
            var action = document.getElementById("action");
            action!.innerHTML = "FATALATY!\n Player2 has won with : " + this.player2!.name;
            var icon = document.getElementById("icon2");
            icon!.innerText = "emoji_events";
            this.messageService.addFight({text : "FATALATY", turnToAttack : this.turnToAttack});
            this.messageService.addFight({text : "Player2 has won with : " + this.player2!.name, turnToAttack : this.turnToAttack});
          }
          this.messageService.addFight({text : "damage2 = " +  Math.floor(((this.player2!.damage * 2) + (this.player2!.stamina * 2)) / Math.floor(Math.sqrt(2 * this.player1!.shield)) * wildCard), turnToAttack : this.turnToAttack}); 
          this.messageService.addFight({text : "hp1 = " + this.hp1, turnToAttack : this.turnToAttack});
          this.turnToAttack = 1;
         
      } else{
          var action = document.getElementById("action");
          action!.innerHTML = "Player2's attack misses!";  
          this.messageService.addFight({text : "Player2's attack misses!", turnToAttack : this.turnToAttack});
          this.turnToAttack = 1;
      }
        }, 2000);
        
    }
    
      this.playTurn();
   }  
   }, 2000);
  }
 
  async battle():Promise<void>{
    

    this.fighting = true;
    this.numberOfMoves = 0;
    this.hp1 = 100;//100 life points
    this.hp2 = 100;//100 life points
    this.turnToAttack = Math.floor(Math.random() * 2) + 1;//coin flip 
    this.messageService.clear();
    this.messageService.clearFights();
    setTimeout(() => {
      var action = document.getElementById("action");
    action!.innerHTML = "Battle Has Begun!";  
    }, 500);
    
    await this.playTurn();

    if(document.getElementById("icon1") && document.getElementById("player1Turn")){
    var icon1 = document.getElementById("icon1");
    icon1!.innerText = "sports";
    
    var icon2 = document.getElementById("icon2");
    icon2!.innerText = "sports";

    icon1 = document.getElementById("player1Turn");
    icon1!.style.visibility = "hidden";

    icon2 = document.getElementById("player2Turn");
    icon2!.style.visibility = "hidden";
    }
  }

  cancelFight(){
    this.fighting = false;
    this.multiPlayer = false;
    this.player1 = undefined;
    this.player2 = undefined;
    this.numberOfMoves = NaN;
    this.hp1 = NaN;
    this.hp2 = NaN;
    this.messageService.clear();
    this.messageService.clearFights();
  }
}
