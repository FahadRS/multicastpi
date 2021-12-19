import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscriber } from 'rxjs';

@Injectable()
export class PlayerInteractionService implements OnDestroy {

    serviceInstance : any = null;

    constructor(private playerInteractionSvcGlobal : PlayerInteractionServiceGlobal){
    }

    // list of mashup id against which we need to notify the events
    subscriptionsList : number[] = [];

    currentTime = new BehaviorSubject(123);

    setCurrentTime(currentTime : number){
     this.getServiceInstance(this.subscriptionsList[0]).currentTime.next(currentTime);
    }

    getServiceInstance(mashupId : number)  : PlayerInteractionServiceInternal {

       if (!this.serviceInstance){
        this.serviceInstance =  this.playerInteractionSvcGlobal.getServiceInstance(mashupId);
       }

       return this.serviceInstance;
    }

    destroyServiceInstance(mashupId : number)  : PlayerInteractionServiceInternal {
        return this.playerInteractionSvcGlobal.getServiceInstance(mashupId)
 
     }

    /* subscribe to mashup events */  
    subcribeToMashupId(mashupId : number)  {
        
        this.subscriptionsList.push(mashupId);       

        // create the new service
        let playInteractionServiceInternal = this.getServiceInstance(mashupId);

        // when the value arrive notify the current subscribers
        playInteractionServiceInternal.currentTime.subscribe((result : number)=>{
            this.currentTime.next(result);
        });        
    }

    subscribeToNext(){
        this.currentTime.next
    }

    ngOnDestroy(){
        console.log("service going to destroy");
        for ( let mashupId of this.subscriptionsList ){
            this.playerInteractionSvcGlobal.releaseServiceInstance(mashupId);
        }
    }
}


export class PlayerInteractionServiceInternal {
    currentTime = new BehaviorSubject(123);
}

@Injectable({
    providedIn: 'root',
})
// service is used to keep the copies of the player interaction service
export class PlayerInteractionServiceGlobal {
  
    serviceInstances  : any = {};
    subscribersCount : any = {};

      public getServiceInstance(mashupId : number) : PlayerInteractionServiceInternal {
          if (!this.serviceInstances[mashupId.toString()]){
            let playInteractionServiceInternal = new PlayerInteractionServiceInternal();
            this.serviceInstances[mashupId.toString()] =  playInteractionServiceInternal;
          }

          if (!this.subscribersCount[mashupId.toString()]){
            this.subscribersCount[mashupId.toString()] = 0;
          }
          this.subscribersCount[mashupId.toString()]++;

          return this.serviceInstances[mashupId.toString()];
      }

      public releaseServiceInstance(mashupId : number) : void {
        this.subscribersCount[mashupId.toString()]--;

        if (!this.subscribersCount[mashupId.toString()] || this.subscribersCount[mashupId.toString()] == 0){
            this.serviceInstances[mashupId] =  undefined;
            console.log("releases service instance")
        }
    }
}

