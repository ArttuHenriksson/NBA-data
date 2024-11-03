import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopScorersComponent } from './top-scorers/top-scorers.component';
import { TopAssistsComponent } from './top-assists/top-assists.component';
import { TopReboundsComponent } from './top-rebounds/top-rebounds.component';
import { HomeComponent } from './home/home.component';
import { PlayersearchComponent } from './playersearch/playersearch.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'top-scorers',
    component: TopScorersComponent,
  },
  {
    path: 'top-assists',
    component: TopAssistsComponent,
  },
  {
    path: 'top-rebounds',
    component: TopReboundsComponent,
  },
  { path: 'search-players', component: PlayersearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
