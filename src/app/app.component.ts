import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { MarvelService } from './shared/services/marvel-service.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, mergeMap, distinctUntilChanged
} from 'rxjs/operators';
import { NgbModal, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Results } from './shared/models/results';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NgbAlertConfig]
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
  private randomHeroesList = [
    'Iron Man', 'Captain America', 'Thor', 'Black Widow',
    'Hulk', 'Hawkeye', 'Mockingbird', 'War Machine',
    'Ant-Man', 'Vision', 'Quicksilver', 'Scarlet Witch',
    'Hank Pym', 'Bucky Barnes', 'Falcon', 'Daredevil',
    'Star-Lord', 'Rocket Raccoon', 'Groot', 'Doctor Strange',
    'Deathlok', 'Sif', 'Gamora', 'Drax', 'Iron Fist',
    'Luke Cage', 'Jessica Jones', 'Nick Fury', 'Wasp',
    'Warriors Three', 'Odin', 'Spider-Man', 'Cyclops', 'Magneto',
    'Cyclops', 'Wolverine', 'Rogue', 'Storm', 'Beast',
    'Gambit', 'Jubilee', 'Jean Grey', 'Sabretooth',
    'Professor X', 'Cable', 'Deadpool', 'Juggernaut',
    'Nightcrawler', 'Psylocke', 'Angel', 'Archangel',
    'Colossus', 'Iceman', 'Mystique'
  ];

  constructor(
    private marvelService: MarvelService,
    alertConfig: NgbAlertConfig
  ) {
    this.onSearch = this.onSearch.bind(this);
    this.results = new Array<Results>();
    alertConfig.type = 'danger';
  }


  public randomArrayItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  public randomHero() {
    const randomHero = this.randomArrayItem(this.randomHeroesList);
    this.results = new Array<Results>();
    this.searching = true;
    this.searchValue = randomHero;
    this.marvelService.getCharacters(24, randomHero)
    .subscribe(res => {
      this.searching = false;
      this.results = res;
    }, error => this.serviceError = true);
   }

  public ngOnInit() {
    this.search.nativeElement.focus();
  }

  public emptyResults() {
    this.searchValue = '';
    this.serviceError = false;
    this.searching = false;
    this.noResults = false;
    this.results = new Array<Results>();
  }

  public onSearch(search$: Observable<string>) {
    return search$
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        mergeMap(term => {
          this.results = new Array<Results>();
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
      .subscribe(
        term => {
          this.searching = false;
          this.results = term;
          if (this.results.length === 0) {
            this.noResults = true;
          }
        },
        error => {
          this.searching = false;
          this.serviceError = true;
        }
      );
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
