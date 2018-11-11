import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MarvelService } from './shared/services/marvel-service.service';
import { Marvel } from './models/marvel';
import { Observable, of } from 'rxjs';
import { debounceTime, mergeMap, tap } from 'rxjs/operators';
import { Results } from './models/results';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('search')
  public search: ElementRef;
  public searching = false;
  public results: Results

  constructor(private marvelService: MarvelService) {
    this.onSearch = this.onSearch.bind(this);
  }


  ngOnInit() {
  }



  public onSearch(search$: Observable<string>) {
    return search$.pipe(
      debounceTime(400),
      tap(() => (this.searching = true)),
      mergeMap(term => (term.length > 2 ? this.marvelService.getCharacters(10, term) : [])),
      tap(() => (this.searching = false))
    )
      .subscribe(term => {
        this.results = term
        console.log(this.results)
      });
  }

  public onSelect(event: any) {
    event.preventDefault();
    console.log('event');
  }

}
