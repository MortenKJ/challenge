import { Injectable } from "@angular/core";
import { isNumber } from "lodash";
import { Observable, Subject } from "rxjs";
import { PerformBowlService } from "./perform-bowl/perform-bowl.service";
import { Player, PlayerListService } from "./player-list/player-list.service";

@Injectable()
export class BowlingService {
  private gameStarted$: Subject<boolean> = new Subject()

  private gameStarted: boolean = false;
  private gameEnded: boolean = false;
  private currentRound: number = 0;

  private currentActivePlayer: Player | undefined;

  constructor(private playerListService: PlayerListService,
    private performBowlService: PerformBowlService) {
    this.currentActivePlayer = undefined;
    this.performBowlService.getNextBowl$().subscribe((score) => this.updateScore(score))
  }

  public getGameStarted$(): Observable<boolean> {
    return this.gameStarted$.asObservable();
  }

  public startGame(): void {
    this.gameStarted$.next(true);
    this.gameStarted = true;
    this.playerListService.resetScore();
    this.currentRound = 0;
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

    let round = this.currentActivePlayer.rounds[this.currentRound];

    if (!round.bowlOne && !isNumber(round.bowlOne)) {
      round.bowlOne = score;

      if (score === 10) {
        round.isStrike = true;
        this.setNextCurrentPlayer();
      }

      return;
    }

    if (!round.bowlTwo && !isNumber(round.bowlTwo) && !round.isStrike) {
      round.bowlTwo = score;

      if (round.bowlOne + round.bowlTwo === 10) {
        round.isSpare = true;
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
      if(this.currentRound !== 9) {
        this.currentActivePlayer = players[0];
        this.currentRound++;
      } else {
        this.gameEnded = true;
      }
    } else {
      this.currentActivePlayer = players[playerIndex + 1];
    }
  }
}