import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BowlingRoutingModule as BowlingRoutingModule } from './bowling-routing.module';
import { BowlingComponent as BowlingComponent } from './bowling.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table'
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { PlayerListComponent } from './player-list/player-list.component';
import { ResultListComponent } from './result-list/result-list.component';
import { PerformBowlComponent } from './perform-bowl/perform-bowl.component';

import { PlayerListService } from './player-list/player-list.service';
import { BowlingService } from './bowling.service';
import { PerformBowlService } from './perform-bowl/perform-bowl.service';
import { ResultListService } from './result-list/result-list.service';


@NgModule({
  declarations: [
    BowlingComponent,
    PlayerListComponent,
    ResultListComponent,
    PerformBowlComponent
  ],
  imports: [
    BrowserModule,
    BowlingRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTableModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    PlayerListService,
    BowlingService,
    PerformBowlService,
    ResultListService
  ],
  bootstrap: [BowlingComponent]
})
export class BowlingModule { }
