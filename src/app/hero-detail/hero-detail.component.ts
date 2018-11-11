import { Component, OnInit, Input } from '@angular/core';
import { Results } from '../shared/models/results';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() result: Results;
  source: string;
  constructor() { }


  ngOnInit() {
    this.source = `${this.result.thumbnail.path}.${this.result.thumbnail.extension}`
  }

}
