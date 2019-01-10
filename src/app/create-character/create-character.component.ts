import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss']
})
export class CreateCharacterComponent implements OnInit {
  availableSides = [
    { display: 'None', value: '' },
    { display: 'Light', value: 'light' },
    { display: 'Dark', value: 'dark' }
  ];
  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  onSubmit(submittedForm) {
    /* Get an object of key-value pairs
     * based on the input 'name' attributes
     * that have ngModel on them */
    if (submittedForm.valid) {
      const { name, side } = submittedForm.value;
      this.swService.addCharacter(name, side);
    }
  }

  ngOnInit() {}
}
