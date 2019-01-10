import { Component, OnInit } from '@angular/core';
import { StarWarsService } from './star-wars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'starWarsApp';
  constructor(private swService: StarWarsService) {}
  ngOnInit() {
    this.swService.fetchCharacters();
  }
}
