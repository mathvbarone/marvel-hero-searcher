import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../marvel-service.service';
import { Marvel } from '../models/marvel';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private marvelService: MarvelService) { }

  ngOnInit() {
    this.marvelService.getCharacters(10, 'Spider-Man')
    .subscribe((res: Marvel) => {
      console.log(res);
    });
  }

}
