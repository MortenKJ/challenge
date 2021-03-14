import { Component } from '@angular/core';

import { BowlingService } from '../bowling.service';
import { PerformBowlService } from './perform-bowl.service';

@Component({
  selector: 'app-perform-bowl',
  templateUrl: './perform-bowl.component.html',
  styleUrls: ['./perform-bowl.component.scss']
})
export class PerformBowlComponent {
  public value: number = 0;

  constructor(private performBowlService: PerformBowlService,
              private bowlingService: BowlingService) { }

  public currentActivePlayerName(): string {
    return this.bowlingService.currentActivePlayerName() || '';
  }

  public isGameStarted(): boolean {
    return this.bowlingService.isGameStarted();
  }

  public hasGameEnded(): boolean {
    return this.bowlingService.hasGameEnded();
  }

  public bowl(): void {
    this.performBowlService.bowl(this.value);
    this.value = 0;
  }

  public inputIsValid(): boolean {
    if (this.value === null) return false;
    return this.value >= 0 && this.value <= 10;
  }
}
