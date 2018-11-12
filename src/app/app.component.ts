import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MarvelService } from './shared/services/marvel-service.service';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, mergeMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { Results } from './models/results';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from './shared/components/error-modal/error-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('search')
  public search: ElementRef;
  public searchValue = '';
  public searching = false;
  public results: Results
  private unsubscribe$ = new Subject();

  constructor(private marvelService: MarvelService,
    private modalService: NgbModal) {
    this.onSearch = this.onSearch.bind(this);
    this.results = new Results();
  }

  public ngOnInit() {
    this.search.nativeElement.focus();
  }


  public emptyResults() {
    this.searching = false;
    this.results = new Results();
  }

  public onSearch(search$: Observable<string>) {
    return search$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      mergeMap(term => {
        if (term.length < 2) {
          this.searching = false
          return [];
        } else {
          this.searching = true
          return this.marvelService.getCharacters(4, term);
        }
      })
    )
      .subscribe(term => {
        this.searching = false;
        this.results = term;
      },
        error => this.openErrorModal());
  }

  openErrorModal() {
    this.modalService.open(ErrorModalComponent).componentInstance;
  }

  private checkInputValue() {
    if (!this.searchValue || this.searchValue.length < 2) {
      this.emptyResults();
    }
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
