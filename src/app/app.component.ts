import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DataService } from './services/data.service';
import { Joke } from './models/joke.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = `JDAC's App`;
  joke: Joke;

  constructor(
    private updatesPWA: SwUpdate,
    private dataService: DataService
  ) {
    updatesPWA.available.subscribe(() => {
      updatesPWA.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit(): void {
    this.getJokes();
  }

  getJokes(): void {
    this.dataService.getJokes().subscribe(
      (res) => {
        this.joke = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
