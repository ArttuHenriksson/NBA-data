import { Component, OnInit } from '@angular/core';
import { NbaStatsService } from '../nba.stats.service';
import { PlayerStats } from '../interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-top-scorers',
  templateUrl: './top-scorers.component.html',
  styleUrl: './top-scorers.component.css',
})
export class TopScorersComponent implements OnInit {
  // näytetäänkö regularSeasonin statsit vai playoffsien
  // sitä varten tämä muuttuja
  regularSeason = true;
  scorers: PlayerStats[] = []; // tähän taulukkoon tallennetaan parhaat pistemiehet
  displayedColumns: string[] = [
    // Angular Materialsin tablea varten käyttetävä muuttuja, Eli mitä tietoja näytetään
    'player_name',
    'team',
    'games',
    'PTS',
    'pointsPerGame',
  ];
  // injektoidaan service sekä spinneri käyttöön
  constructor(
    private scoresService: NbaStatsService,
    private spinner: NgxSpinnerService
  ) {}
  // Kun komponentti latautuu näytetään spinneri ja
  // kutsutaan getScorersData metodia että saadaan regular seasonin statsit
  ngOnInit() {
    this.spinner.show();
    this.getScoreStats(); // Defaulttina näytetään runkosarjan statsit
  }
  // Tätä metodia kutsutaan kun regularSeason muuttuja vaihtuu falseksi,
  // eli käyttäjä vaihtaa playoff näkymän painamalla buttonia
  // ja kutsutaan getScorersStats metodia siten että saadaan playoff statsit
  PlayoffsSelect() {
    this.regularSeason = !this.regularSeason;
    this.getScoreStats();
  }

  // Metodi hakee statseja joko runkosarjasta tai pudotuspeleistä
  getScoreStats() {
    // näytetään spinneri
    this.spinner.show();
    if (this.regularSeason) {
      this.scoresService.getScorersData().subscribe({
        // subataan data observablesta`
        next: (regularSeasonData) => {
          // sijoitetaan scorers taulukkoon
          // Runkosarjan data
          this.scorers = regularSeasonData.results;
          // piilotetaan spinneri myös
          this.spinner.hide();
        },
        // Error callback suoritetaan jos subaamis vaiheessa tapahtuisi virhe
        error: (err) => {
          console.log(err.message);
        },
      });
    } else {
      // Ja sama subaus mitä runkosarjan statsien osalta
      // kun playoffs näkymä valittuna
      this.scoresService.getPlayoffScorers().subscribe({
        next: (playoffData) => {
          this.scorers = playoffData.results;
          // piilotetaan spinneri
          this.spinner.hide();
          // console.log(this.scorers);
        },
        error: (err) => {
          console.error(err.message);
        },
      });
    }
  }
}
