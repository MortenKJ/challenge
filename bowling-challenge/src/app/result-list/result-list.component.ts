import { Component, OnInit } from '@angular/core';
import { isNumber } from 'lodash';
import { BowlingService } from '../bowling.service';
import { PlayerListService, Player, Round } from '../player-list/player-list.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent {
  public currentPlayers: Array<Player> = [];
  public columns: Array<string> = [];
  public rounds: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private playerListService: PlayerListService,
    private bowlingService: BowlingService) {
    this.currentPlayers = this.playerListService.getPlayers();
    this.columns.push('round');
    this.columns = this.columns.concat(this.currentPlayers.map(player => player.name))
  }

  public resetGame(): void {
    this.bowlingService.resetGame();
    this.playerListService.resetScore();
  }

  public startGame(): void {
    this.bowlingService.startGame();
  }

  public isGameStarted(): boolean {
    return this.bowlingService.isGameStarted();
  }

  public enoughPlayers(): boolean {
    return this.currentPlayers.length >= 2;
  }

  public calculateTotalScore(player: Player): string {
    const scores = new Array<number | undefined>()

    player.rounds.forEach((round: Round) => {
      scores.push(round.bowlOne);
      scores.push(round.bowlTwo);
    });//.reduce((prev: number, curr: number) => prev + curr);

    let score = 0;
    for (let index = 0; index < scores.length; index++) {
      const temp = scores[index];
      if (temp === undefined) {
        continue;
      }

      if(temp !== 10)

      score += temp;
    }

    // const score = scores.reduce((previous: number | undefined, current: number | undefined) => {
    //   if (previous === undefined) return current;

    //   if(current === undefined) return previous;

    //   return previous + current;
    // });

    // if (score === 0) return 'Gutter Game :(';

    return `${score}`;
  }

  public getRoundScoreDisplayValue(round: Round): string {
    if (round.isStrike) {
      return 'X';
    } else if (round.isSpare) {
      return '/';
    } else {
      return `${isNumber(round.bowlOne) ? round.bowlOne : '?'}/${isNumber(round.bowlTwo) ? round.bowlTwo : '?'}`;
    }
  }
}
