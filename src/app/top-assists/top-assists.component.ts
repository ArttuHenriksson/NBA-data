import { Component, OnInit } from '@angular/core';
import { PlayerStats } from '../interface';
import { NbaStatsService } from '../nba.stats.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-top-assists',
  templateUrl: './top-assists.component.html',
  styleUrl: './top-assists.component.css',
})
export class TopAssistsComponent implements OnInit {
  regularSeason = true; // näytetäänkö regularSeasonin statsit vai playoffsien

  assists: PlayerStats[] = []; // tähän taulukkoon tallennetaan parhaat syöttäjät

  // Angular Materialsin tablea varten käyttetävä muuttuja
  // Eli mitä tietoja näytetään
  displayedColumns: string[] = [
    'player_name',
    'team',
    'games',
    'AST',
    'astPerGame',
  ];

  // injektoidaan service sekä spinneri käyttöön
  constructor(
    private assistsService: NbaStatsService,
    private spinner: NgxSpinnerService
  ) {}

  // Kun komponentti latautuu näytetään spinneri
  // sekä kutsutaan getAssistsStats metodia
  // jotta saadaan runkosarjan statsit näkyviin kun komopnentti latautuu
  ngOnInit() {
    this.spinner.show();
    this.getAssistStats();
  }

  // Tätä metodia kutsutaan kun regularSeason muuttuja vaihtuu falseksi,
  // eli käyttäjä vaihtaa playoff näkymän painamalla buttonia
  // ja kutsutaan getAssistsStats metodia siten että saadaan playoff statsit
  PlayoffsSelect() {
    this.regularSeason = !this.regularSeason;
    this.getAssistStats();
  }

  // Metodi millä haetaan parhaimpien syöttäjien tilastoja runkosarjasta sekä pudotuspeleistä
  getAssistStats() {
    // näytetään spinneri
    this.spinner.show();
    if (this.regularSeason) {
      // jos regularSeason muuttuja on true eli runkosarja näkymä
      // kutsutaan getAssistsData metodia mistä subataan data observablesta
      this.assistsService.getAssistsData().subscribe({
        next: (regularSeasonData) => {
          // sijoitetaan assists taulukkoon
          // Runkosarjan data
          this.assists = regularSeasonData.results;
          // piilotetaan spinneri
          this.spinner.hide();
          // console.log(this.assists);
        },
        // Error callback suoritetaan jos subaamis vaiheessa tapahtuisi virhe
        error: (err) => {
          console.error(err.message);
        },
      });
    } else {
      // Ja sama subaus mitä runkosarjan statsien osalta
      // kun playoffs näkymä valittuna
      this.assistsService.getPlayoffAssists().subscribe({
        next: (playoffData) => {
          this.assists = playoffData.results;
          // piilotetaan spinneri
          this.spinner.hide();
          // console.log(this.assists);
        },
        error: (err) => {
          console.error(err.message);
        },
      });
    }
  }
}
