import { Component, OnInit } from '@angular/core';
import { PlayerInteractionService } from './player-interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [PlayerInteractionService]
})
export class AppComponent implements OnInit {
 
  showComponent1 : boolean = false;
  showComponent2 : boolean = false;

  constructor(private playerInteractionSvc : PlayerInteractionService){

  }
  ngOnInit(): void {
    this.playerInteractionSvc.currentTime.subscribe(resut=>{
      console.log("This is result from app component");
      console.log(resut);
    })
  }

  subcribeToService1(){
   this.playerInteractionSvc.subcribeToMashupId(1);
  }

  subcribeToService2(){
    this.playerInteractionSvc.subcribeToMashupId(2);
  }

  sendService1Time(){
    this.playerInteractionSvc.setCurrentTime(Math.random());
  }

  sendService2Time(){
    this.playerInteractionSvc.setCurrentTime(Math.random());
  }

}
