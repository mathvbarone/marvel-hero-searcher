import { Component, OnInit, Input } from '@angular/core';
import { Results } from '../shared/models/results';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit {

  @Input() results: Results;

  constructor() { }

  ngOnInit() { }

}
