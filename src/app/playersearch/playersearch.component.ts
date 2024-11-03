import { Component } from '@angular/core';
import { NbaStatsService } from '../nba.stats.service'; // stats service
import { PlayerStats } from '../interface'; // interface /rajapintaluokka
import { NgxSpinnerService } from 'ngx-spinner'; // latausruutua varten
import { animate, style, transition, trigger } from '@angular/animations'; // animaatiota varten

// FadeIn
// aluksi opacity 0 eli läpinäkyvyys
const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  // animate-funktio käynnistää animaation,
  // animaatio kestää 1 sekunnin käyttäen ease-in ja
  // vaihtaa opacityn arvon 1 eli errormsg näkyy kokonaan
  animate('1s ease-in', style({ opacity: 1 })),
]);

// tekee saman kuin FadeIn animaatio, mutta vaan
// se kadottaa errormsg näkyvistä
const exitTransition = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate('1s ease-out', style({ opacity: 0 })),
]);

// triggerit
const fadeIn = trigger('fadeIn', [enterTransition]); // fadeIn animaatio
const fadeOut = trigger('fadeOut', [exitTransition]); // fadeOut animaatio

@Component({
  selector: 'app-playersearch',
  templateUrl: './playersearch.component.html',
  styleUrl: './playersearch.component.css',
  animations: [fadeIn, fadeOut],
})
export class PlayersearchComponent {
  player: PlayerStats[] = []; // pelaajan tiedot tänne
  playername: string = ''; // haettava pelaaja
  errorMessage: string = ''; // virheviesti

  // Injektoidaan statsService käyttöön sekä spinneri
  constructor(
    private playerService: NbaStatsService,
    private spinner: NgxSpinnerService
  ) {}

  // metodi pelaajien hakemista varten
  searchPlayer(): void {
    this.errorMessage = '';

    const trimmedName = this.playername.trim(); // poistetaan välilyönnit alusta sekä lopusta.
    const searchedName = trimmedName.split(/\s+/); // "jakaa" nimen kahteen osaan (etunimi ja sukunimi).
    const numbers = /\d/.test(trimmedName); // testataan sisältääkö nimi numeroita.

    // iffitys, mikä tarkistaa ettei hakukenttä ole tyhjä, haetaan etu sekä sukunimellä
    // eikä haku sisällä numeroita.
    if (trimmedName && searchedName.length >= 2 && !numbers) {
      this.spinner.show();
      // Jos ehto täyttyy, näytetään latausSpinneri
      // Kutsutaan getPlayersData metodia servicestä,
      // millä haetaan haettavan pelaajan tiedot.
      this.playerService.getPlayersData(this.playername).subscribe({
        next: (res) => {
          // asetetaan 1.5 sekuntia pitkä setTimeOutti jotta nähdään
          // hetki spinneriä
          setTimeout(() => {
            this.spinner.hide();
            if (res.results.length === 0) {
              // Jos taulukon pituus on 0, eli pelaajasta ei löydy
              //tietoja tämä error viesti tulee
              this.errorMessage = `Ei tuloksia haulla: ${trimmedName}`;
            } else {
              this.player = res.results;
            }
          }, 1500);
        },
      });
      // jos haettavassa nimessä ei ole kahta sanaa tämä error viesi tulee
    } else {
      this.errorMessage =
        'Anna pelaajan koko nimi (Etunimi + Sukunimi), Kiitos';
    }
    if (numbers) {
      // jos taas haku sisältää numberoita tämä tulee
      this.errorMessage = 'Numeroilla ei voi hakea!';
    }
  }
}
