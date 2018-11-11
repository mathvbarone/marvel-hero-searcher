import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MarvelService } from './shared/services/marvel-service.service';
import { Marvel } from './models/marvel';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, mergeMap, tap, distinctUntilChanged } from 'rxjs/operators';
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
  private unsubscribe$ = new Subject();

  constructor(private marvelService: MarvelService) {
    this.onSearch = this.onSearch.bind(this);
    this.results = new Results();
  }

  ngOnInit() {
  }

  public onSearch(search$: Observable<string>) {
    return search$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      mergeMap(term => (term.length > 2 ? this.marvelService.getCharacters(10, term) : [])),
      tap(() => (this.searching = false))
    )
      .subscribe(term => this.results = term);
  }

  private checkInputValue(event: any) {
    let target = event.target.value;
    if (!target || target.length < 2) {
      this.results = new Results();
    }
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
