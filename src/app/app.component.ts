import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { MarvelService } from './shared/services/marvel-service.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, mergeMap, distinctUntilChanged, tap
} from 'rxjs/operators';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
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
  public dchHeroEasterEgg = false;
  public results: Results[];
  private unsubscribe$ = new Subject();
  private randomHeroesList = [
    'Iron Man', 'Captain America', 'Thor', 'Black Widow',
    'Hulk', 'Hawkeye', 'Mockingbird', 'War Machine',
    'Ant-Man', 'Vision', 'Quicksilver', 'Scarlet Witch',
    'Hank Pym', 'Bucky', 'Falcon', 'Daredevil',
    'Star-Lord', 'Rocket Raccoon', 'Groot', 'Doctor Strange',
    'Deathlok', 'Sif', 'Gamora', 'Drax', 'Iron Fist',
    'Luke Cage', 'Jessica Jones', 'Nick Fury', 'Wasp',
    'Odin', 'Spider-Man', 'Cyclops', 'Magneto',
    'Cyclops', 'Wolverine', 'Rogue', 'Storm', 'Beast',
    'Gambit', 'Jubilee', 'Jean Grey', 'Sabretooth',
    'Professor X', 'Cable', 'Deadpool', 'Juggernaut',
    'Nightcrawler', 'Psylocke', 'Angel', 'Archangel',
    'Colossus', 'Iceman', 'Mystique'
  ];
private dcHeroes = [
  'Batman', 'Flash'
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
    this.noResults = false;
    const randomHero = this.randomArrayItem(this.randomHeroesList);
    this.results = new Array<Results>();
    this.searching = true;
    this.searchValue = randomHero;
    this.marvelService.getCharacters(randomHero)
    .subscribe(res => {
      this.searching = false;
      this.returnResults(res);
    }, error => {
      this.searching = false;
      this.serviceError = true;
    });
   }

  public ngOnInit() {
    this.search.nativeElement.focus();
  }

  public emptyResults() {
    this.searchValue = '';
    this.serviceError = false;
    this.searching = false;
    this.noResults = false;
    this.serviceError = false;
    this.results = new Array<Results>();
  }



  public searchHero() {
    this.noResults = false;
    if (this.searchValue.length > 2) {
      this.searching = true;
      this.marvelService.getCharacters(this.searchValue)
      .subscribe(res => {
        this.searching = false;
        this.returnResults(res);
      },
      error => {
        this.searching = false;
        this.serviceError = true;
      });
    }
  }

  private returnResults(res) {
    // this.dcHeroes.forEach( hero => {
    //   if (hero.toLowerCase === this.searchValue.toLowerCase) {
    //     this.searching = false;
    //     this.dchHeroEasterEgg = true;
    //     return;
    //   }
    // });
    this.results = res;
    if (this.results.length === 0) {
      this.noResults = true;
    }
  }

  public onSearch(search$: Observable<string>) {
    return search$
      .pipe(
        debounceTime(1500),
        distinctUntilChanged(),
        tap(() => (this.searching = true)),
        mergeMap(term => {
          this.results = new Array<Results>();
          if (term.length < 2) {
            this.searching = false;
            return [];
          } else {
            this.noResults = false;
            return this.marvelService.getCharacters(term);
          }
        }),
        tap(() => (this.searching = false))
      ).subscribe(
          term => {
            this.returnResults(term);
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
