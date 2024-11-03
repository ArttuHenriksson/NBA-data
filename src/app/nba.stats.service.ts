import { HttpClient } from '@angular/common/http'; // HTTPClient moduulilla tehdään http pyyntöjä
import { Injectable } from '@angular/core';
import { PlayerStats } from './interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NbaStatsService {
  // url-osoitteet mistä tilastot haetaan
  private scoresUrl: string =
    'https://nba-stats-db.herokuapp.com/api/playerdata/topscorers/total/season/2023/ ';

  private scoresPlayoffsUrl: string =
    'https://nba-stats-db.herokuapp.com/api/playerdata/topscorers/playoffs/2023/';

  private assistsUrl: string =
    'https://nba-stats-db.herokuapp.com/api/top_assists/totals/2023/';

  private assistsPlayoffsUrl: string =
    'https://nba-stats-db.herokuapp.com/api/top_assists/playoffs/2023/';

  private reboundsUrl: string =
    'https://nba-stats-db.herokuapp.com/api/top_rebounds/totals/2023/';

  private playersUrl: string =
    'https://nba-stats-db.herokuapp.com/api/playerdata/name/';

  constructor(private http: HttpClient) {}

  // Haetaan pistemiesten runkosarjan statsit
  getScorersData(): Observable<{ results: PlayerStats[] }> {
    return this.http.get<{ results: PlayerStats[] }>(this.scoresUrl);
  }
  // Pistemiesten pudotuspelien statsit
  getPlayoffScorers(): Observable<{ results: PlayerStats[] }> {
    return this.http.get<{ results: PlayerStats[] }>(this.scoresPlayoffsUrl);
  }
  // Haetaan syöttäjien runkosarjan statsit
  getAssistsData(): Observable<{ results: PlayerStats[] }> {
    return this.http.get<{ results: PlayerStats[] }>(this.assistsUrl);
  }
  // Syöttäjien pudotuspelien statsit
  getPlayoffAssists(): Observable<{ results: PlayerStats[] }> {
    return this.http.get<{ results: PlayerStats[] }>(this.assistsPlayoffsUrl);
  }
  // Haetaan levypallo statsit
  getReboundsData(): Observable<{ results: PlayerStats[] }> {
    return this.http.get<{ results: PlayerStats[] }>(this.reboundsUrl);
  }
  // Kun pelaajaa haetana nimellä haetaan hänen kaikki pelatut
  // kautensa NBA:ssa
  getPlayersData(playername: string): Observable<{ results: PlayerStats[] }> {
    return this.http.get<{ results: PlayerStats[] }>(
      this.playersUrl + playername
    );
  }

  // Kaikki metodit palauttavat observablen mikä sisältää results taulukon
  // joka sisältää pelaajan tilastoja PlayerStats rajapintaluokan mukaan
}
