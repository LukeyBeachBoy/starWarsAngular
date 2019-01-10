import { LogService } from './log.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StarWarsService {
  private characters = [
    { name: 'Luke Skywalker', side: '' },
    { name: 'Darth Vader', side: '' }
  ];

  charactersChanged = new Subject<void>();
  constructor(private logService: LogService, private http: HttpClient) {}

  fetchCharacters() {
    this.http
      .get('https://swapi.co/api/people/')
      .map((res: Response) => {
        const data: any = res;
        const extractedChars = data.results;
        const chars = extractedChars.map(character => {
          return { name: character.name, side: '' };
        });
        return chars;
      })
      .subscribe(data => {
        this.characters = data;
        this.charactersChanged.next();
      });
  }

  getCharacters(chosenSide) {
    if (chosenSide === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter(character => {
      return character.side === chosenSide;
    });
  }

  addCharacter(name, side) {
    const pos = this.characters.findIndex(char => {
      return char.name === name;
    });
    if (pos !== -1) {
      return;
    }
    const newChar = { name, side };
    this.characters.push(newChar);
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex(char => {
      return char.name === charInfo.name;
    });
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog(
      `Changed side of ${charInfo.name}, new side: ${charInfo.side}`
    );
  }
}
