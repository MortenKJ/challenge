import { Injectable } from "@angular/core";
import { isNumber, isUndefined } from "lodash";
import { Observable, Subject } from "rxjs";
import { PerformBowlService } from "./perform-bowl/perform-bowl.service";
import { Player, PlayerListService } from "./player-list/player-list.service";
import { ResultListService } from "./result-list/result-list.service";

@Injectable()
export class BowlingService {
  private gameStarted$: Subject<boolean> = new Subject();
  private extraRoundAdded$: Subject<number> = new Subject();

  private gameStarted: boolean = false;
  private gameEnded: boolean = false;
  private currentRoundIndex: number = 0;

  private currentActivePlayer: Player | undefined;

  constructor(private playerListService: PlayerListService,
              private performBowlService: PerformBowlService,
              private resultListService: ResultListService) {
    this.currentActivePlayer = undefined;
    this.performBowlService.getNextBowl$().subscribe((score) => this.updateScore(score))
  }

  public getGameStarted$(): Observable<boolean> {
    return this.gameStarted$.asObservable();
  }

  public getExtraRoundAdded$(): Observable<number> {
    return this.extraRoundAdded$.asObservable();
  }

  public startGame(): void {
    this.gameStarted$.next(true);
    this.gameStarted = true;
    this.playerListService.resetScore();
    this.currentRoundIndex = 0;
    this.currentActivePlayer = this.playerListService.getPlayers()[0];
  }

  public resetGame(): void {
    this.gameStarted = false;
    this.gameEnded = false;
  }

  public isGameStarted(): boolean {
    return this.gameStarted;
  }

  public currentActivePlayerName(): string | undefined {
    return this.currentActivePlayer?.name;
  }

  public hasGameEnded(): boolean {
    return this.gameEnded;
  }

  private updateScore(score: number): void {
    if (!this.currentActivePlayer) return;

    let round = this.currentActivePlayer.rounds[this.currentRoundIndex];

    if (!round.bowlOne && !isNumber(round.bowlOne)) {
      round.bowlOne = score;

      if (score === 10) {
        round.isStrike = true;

        if (this.currentRoundIndex >= 9 && this.currentRoundIndex < 11) {
          console.log(`Adding extra round for ${this.currentActivePlayerName()}`)
          this.currentActivePlayer.rounds.push({
            isStrike: false,
            isSpare: false,
            bowlOne: undefined,
            bowlTwo: undefined
          });
          
          this.extraRoundAdded$.next(this.currentRoundIndex + 2)
        }

        this.setNextCurrentPlayer();
      }

      return;
    }

    if (!round.bowlTwo && !isNumber(round.bowlTwo) && !round.isStrike) {
      round.bowlTwo = score;

      if (round.bowlOne + round.bowlTwo === 10) {
        round.isSpare = true;

        if (this.currentRoundIndex >= 9 && this.currentRoundIndex < 11) {
          console.log(`Adding extra round for ${this.currentActivePlayerName()}`)
          this.currentActivePlayer.rounds.push({
            isStrike: false,
            isSpare: false,
            bowlOne: undefined,
            bowlTwo: undefined
          });
          
          this.extraRoundAdded$.next(this.currentRoundIndex + 2)
        }
      }

      this.setNextCurrentPlayer();

      return;
    }
  }

  private setNextCurrentPlayer(): void {
    if (!this.currentActivePlayer) return;

    const players = this.playerListService.getPlayers();
    const playerIndex = players.indexOf(this.currentActivePlayer);

    if (playerIndex === players.length - 1) {
      if(this.currentRoundIndex !== this.resultListService.getRounds().length - 1) {
        const nextPlayer = this.getNextPlayerForRound(players, this.currentRoundIndex + 1);

        this.currentActivePlayer = isUndefined(nextPlayer) ? players[0] : nextPlayer;
        this.currentRoundIndex++;
      } else {
        this.gameEnded = true;
      }
    } else {
      this.currentActivePlayer = players[playerIndex + 1];
    }
  }

  private getNextPlayerForRound(players: Array<Player>, roundIndex: number): Player | undefined {
    return players.find(player => player.rounds.length - 1 === roundIndex);
  }
}