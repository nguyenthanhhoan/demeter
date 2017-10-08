import { Component, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnDestroy {
  @Input() public delay: number = 300;

  currentTimeout: number;
  isDelayedRunning: boolean = false;

  @Input()
  public set isRunning(value: boolean) {
    this.isDelayedRunning = value;

    // TODO: Check later
    // if (!value) {
    //   this.cancelTimeout();
    //   this.isDelayedRunning = false;
    //   return;
    // }

    // if (this.currentTimeout) {
    //   return;
    // }

    // let timer = Observable.timer(this.delay);
    // timer.subscribe((t) => {
    //   console.log('cancelTimeout');
    //   this.isDelayedRunning = value;
    //   this.cancelTimeout();
    //   this.currentTimeout = t;
    // });
  }

  ngOnDestroy(): any {
    this.cancelTimeout();
  }

  private cancelTimeout(): void {
    clearTimeout(this.currentTimeout);
    this.currentTimeout = undefined;
  }
}
