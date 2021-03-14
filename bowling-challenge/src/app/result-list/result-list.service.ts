import { Injectable } from "@angular/core";

@Injectable()
export class ResultListService {
  private rounds: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  public addRound(round: number): void {
    if (!this.rounds.find(existingRound => existingRound === round)) {
      this.rounds.push(round);
    }
  }

  public getRounds(): Array<number> {
    return this.rounds;
  }
}