import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formate'
})
export class FormatePipe implements PipeTransform {

  transform(value: number): unknown {
    return this.seconds2time(value);
  }


  seconds2time (seconds: number) {
    var hours   = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    var seconds = seconds - (hours * 3600) - (minutes * 60);
    var time = "";

    if (hours != 0) {
      time = hours+":";
    }
    if (minutes != 0 || time !== "") {
     let newMinutes = (minutes < 10 && time !== "") ? "0"+minutes : String(minutes);
      time += newMinutes+":";
    }
    if (time === "") {
      time = seconds+"";
    }
    else {
      time += (seconds < 10) ? "0"+seconds : String(seconds);
    }
    return time;
}

}
