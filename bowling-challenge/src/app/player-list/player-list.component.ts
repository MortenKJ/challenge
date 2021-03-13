import { Component, OnInit } from '@angular/core';
import { BowlingService } from '../bowling.service';
import { PlayerListService, Player } from './player-list.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  public players: Player[];
  public newPlayerName: string = '';

  constructor(private playerListService: PlayerListService,
              private bowlingService: BowlingService) {
    this.players = this.playerListService.getPlayers();
  }

  ngOnInit(): void {
  }

  public isGameStarted(): boolean {
    return this.bowlingService.isGameStarted();
  }

  public isValid(): boolean {
    return this.newPlayerName.length > 0;
  }

  public addPlayer(): void {
    this.playerListService.addPlayer(this.newPlayerName);
    this.newPlayerName = '';
  }
}