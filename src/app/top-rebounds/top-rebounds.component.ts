import { Component, OnInit } from '@angular/core';
import { PlayerStats } from '../interface';
import { NbaStatsService } from '../nba.stats.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-top-rebounds',
  templateUrl: './top-rebounds.component.html',
  styleUrl: './top-rebounds.component.css',
})
export class TopReboundsComponent implements OnInit {
  rebounds: PlayerStats[] = []; // rebounds taulukkoon tallennetaan reboundsData
  displayedColumns: string[] | number[] = [
    // Angular Materialsin tablea varten käyttetävä muuttuja
    // Eli mitä tietoja näytetään
    'player_name',
    'team',
    'games',
    'ORB',
    'DRB',
    'TRB',
    'rbsPerGame',
  ];
  // Injektoidaan statsService sekä spinneri käyttöön
  constructor(
    private reboundsService: NbaStatsService,
    private spinner: NgxSpinnerService
  ) {}

  // haetaan heti reboundsData kun komponentti latautuu
  ngOnInit(): void {
    // latauspinneri aktivoituu
    this.spinner.show();
    this.reboundsService.getReboundsData().subscribe({
      // subataan observablesta tuleva data
      next: (data) => {
        // tallennetaan rebounds taulukkoon data.results mikä sisältää pelaajien tiedot
        this.rebounds = data.results;
        // piiloitetaan latausspinneri
        this.spinner.hide();
      },
      // error callback suoritetaan jos subaamis vaiheessa tapahtuu virhe
      error: (err) => {
        console.error(err.message);
      },
    });
  }
}
