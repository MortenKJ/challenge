import { Component } from '@angular/core';
import { isNumber, isUndefined } from 'lodash';
import { BowlingService } from '../bowling.service';
import { PlayerListService, Player, Round } from '../player-list/player-list.service';
import { ResultListService } from './result-list.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent {
  public currentPlayers: Array<Player> = [];
  public columns: Array<string> = [];
  public rounds: Array<number> = [];

  constructor(private playerListService: PlayerListService,
              private resultListService: ResultListService,
              private bowlingService: BowlingService) {
    this.currentPlayers = this.playerListService.getPlayers();
    this.columns.push('round');
    this.columns = this.columns.concat(this.currentPlayers.map(player => player.name));

    this.rounds = this.resultListService.getRounds();

    this.bowlingService.getExtraRoundAdded$().subscribe(round => {
      this.resultListService.addRound(round);
      this.rounds = this.resultListService.getRounds();
    })
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

  private getStrikeBonus(index: number, rounds: Round[]): number {
    let strikeBonus = 0;
    if (rounds.length - 1 > index + 1) {
      const nextRound = rounds[index + 1];

      strikeBonus += this.addBowls(nextRound);

      if (nextRound.isStrike && (rounds.length - 1 >= index + 2)) {
        const nextNextRound = rounds[index + 2];
        strikeBonus += !isUndefined(nextNextRound.bowlOne) ? nextNextRound.bowlOne : 0;
      }
    }

    return strikeBonus;
  }

  private getSpareBonus(index: number, rounds: Round[]): number {
    let spareBonus = 0;
    if (!(rounds.length - 1 > index + 1)) return spareBonus;

    const nextRound = rounds[index + 1];
    spareBonus += !isUndefined(nextRound.bowlOne) ? nextRound.bowlOne : 0

    return spareBonus;
  }

  private calculateBonus(round: Round, index: number, rounds: Array<Round>, player: Player): number {
    let bonus = 0;
    if (round.isStrike) {
      bonus = this.getStrikeBonus(index, rounds);
    }

    if (round.isSpare) {
      bonus = this.getSpareBonus(index, rounds);
    }

    return bonus;
  }

  private addBowls(round: Round): number {
    return (!isUndefined(round.bowlOne) ? round.bowlOne : 0) +
      (!isUndefined(round.bowlTwo) ? round.bowlTwo : 0);
  }

  public calculateTotalScore(player: Player): string {
    let score = 0;
    player.rounds.forEach((round: Round, index: number, rounds: Array<Round>) => {
      if(index > 9) return;
      const roundScore = this.addBowls(round) + this.calculateBonus(round, index, rounds, player);;
      score += roundScore;
    });

    return `${score}`;
  }

  public getRoundScoreDisplayValue(round: Round): string {
    if (!round) return '-'

    if (round.isStrike) {
      return 'X';
    } else if (round.isSpare) {
      return '/';
    } else {
      return `${isNumber(round.bowlOne) ? round.bowlOne : '?'}/${isNumber(round.bowlTwo) ? round.bowlTwo : '?'}`;
    }
  }
}
