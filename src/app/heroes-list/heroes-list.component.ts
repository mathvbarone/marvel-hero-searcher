import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Results } from '../shared/models/results';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit, OnDestroy {

  @Input() results: Results;
  private unsubscribe$ = new Subject();

  constructor() { }

  ngOnInit() { }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
