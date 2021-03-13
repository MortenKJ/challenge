import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class PerformBowlService {
  private nextBowl$: Subject<number> = new Subject()

  public getNextBowl$(): Observable<number> {
    return this.nextBowl$.asObservable();
  }

  public bowl(value: number): void {
    this.nextBowl$.next(value);
  }
}