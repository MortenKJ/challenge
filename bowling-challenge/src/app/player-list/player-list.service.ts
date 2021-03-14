import { Injectable } from "@angular/core";

export interface Player {
  name: string,
  rounds: Array<Round>
}

export interface Round {
  isStrike: boolean,
  isSpare: boolean,
  bowlOne: number | undefined,
  bowlTwo: number | undefined,
}

@Injectable()
export class PlayerListService {
  private players: Array<Player> = []

  constructor() {
    this.addPlayer('Morten');
    this.addPlayer('Henrik');
  }

  public resetScore(): void {
    new Array<Round>().concat(...this.players.map(player => player.rounds)).forEach((round: Round) => {
      round.bowlOne = undefined;
      round.bowlTwo = undefined;
      round.isSpare = false;
      round.isStrike = false;
    });
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public addPlayer(playerName: string): void {
    const player = {
      name: playerName,
      rounds: new Array<Round>()
    };

    for (let index = 0; index < 10; index++) {
      player.rounds.push({
        isStrike: false,
        isSpare: false,
        bowlOne: undefined,
        bowlTwo: undefined,
      });
    }
    this.players.push(player);
  }
}