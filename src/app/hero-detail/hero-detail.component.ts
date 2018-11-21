import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Results } from '../shared/models/results';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {

  @Input() result: Results;
  thumb: string;
  private unsubscribe$ = new Subject();

  constructor(private modalService: NgbModal) { }


  public ngOnInit() {
    this.thumb = `${this.result.thumbnail.path}.${this.result.thumbnail.extension}`;
  }

  private checkElementReturn(element: string) {
    if (!element) {
      return element = `We can't describe this character.`;
    } else {
      return element;
    }
  }

  public open() {

    const modalRef = this.modalService.open(ModalComponent, { centered: true }).componentInstance;

    modalRef.name = this.checkElementReturn(this.result.name);
    modalRef.description = this.checkElementReturn(this.result.description);
    modalRef.thumb = this.checkElementReturn(this.thumb);
  }


  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
