import { Component, OnInit } from '@angular/core';
import { PlayerInteractionService } from '../player-interaction.service';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css'],
  providers : [PlayerInteractionService]

})
export class Component2Component implements OnInit {

  constructor(private playerInteractionSvc : PlayerInteractionService){

  }
  ngOnInit(): void {
    this.playerInteractionSvc.currentTime.subscribe(resut=>{
      console.log("This is result from app component 2");
      console.log(resut);
    })
  }

  subcribeToService2(){
   this.playerInteractionSvc.subcribeToMashupId(2);
  }

 

  sendService2Time(){
    //this.playerInteractionSvc.currentTime.next(Math.random());
    this.playerInteractionSvc.setCurrentTime(Math.random());
  }

}
