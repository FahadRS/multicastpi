import { Component, OnInit } from '@angular/core';
import { PlayerInteractionService } from '../player-interaction.service';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css'],
  providers : [PlayerInteractionService]
})
export class Component1Component implements OnInit {


  constructor(private playerInteractionSvc : PlayerInteractionService){

  }
  ngOnInit(): void {
    this.playerInteractionSvc.currentTime.subscribe(resut=>{
      console.log("This is result from app component 1");
      console.log(resut);
    })
  }

  subcribeToService1(){
   this.playerInteractionSvc.subcribeToMashupId(1);
  }

 

  sendService1Time(){
    this.playerInteractionSvc.setCurrentTime(Math.random());
  }

}
