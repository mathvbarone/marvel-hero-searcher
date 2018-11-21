import { Component, OnInit, ElementRef, ViewChild, Input, OnDestroy } from '@angular/core';
import { MarvelService } from './shared/services/marvel-service.service';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, mergeMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Results } from './shared/models/results';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NgbAlertConfig],
})

export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('search')
  public search: ElementRef;
  public searchValue = '';
  public searching = false;
  public noResults = false;
  public serviceError = false;
  public results: Results[];
  private unsubscribe$ = new Subject();

  constructor(private marvelService: MarvelService,
    private modalService: NgbModal,
    alertConfig: NgbAlertConfig) {
    this.onSearch = this.onSearch.bind(this);
    this.results = new Array<Results>();
    alertConfig.type = 'danger';
  }

  public ngOnInit() {
    this.search.nativeElement.focus();
  }


  public emptyResults() {
    this.serviceError = false;
    this.searching = false;
    this.noResults = false;
    this.results = new Array<Results>();
  }

  public onSearch(search$: Observable<string>) {
    return search$.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      mergeMap(term => {
        if (term.length < 2) {
          this.searching = false;
          return [];
        } else {
          this.noResults = false;
          this.searching = true;
          return this.marvelService.getCharacters(24, term);
        }
      })
    )
      .subscribe(term => {
        this.searching = false;
        this.results = term;
        if (this.results.length === 0) {
          this.noResults = true;
        }
      },
        error => {
          this.searching = false;
          this.serviceError = true;
        });
  }


  public checkInputValue() {
    if (!this.searchValue || this.searchValue.length < 2) {
      this.emptyResults();
    }
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public closeAlert() {
    this.serviceError = false;
    this.noResults = false;
  }



}
