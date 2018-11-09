import { Component, OnInit } from '@angular/core';
import { Marvel } from '../models/marvel';
import { MarvelService } from '../marvel-service.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit {

  constructor(private marvelService: MarvelService) { }

  ngOnInit() {
    this.marvelService.getCharacters(10, 'Spider-Man')
      .subscribe((res: Marvel) => {
        console.log(res.data);
      });
  }

}
