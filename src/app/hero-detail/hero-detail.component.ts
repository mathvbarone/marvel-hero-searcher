import { Component, OnInit, Input } from '@angular/core';
import { Results } from '../shared/models/results';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() result: Results;
  thumb: string;
  private unsubscribe$ = new Subject();

  constructor(private modalService: NgbModal) { }


  ngOnInit() {
    this.thumb = `${this.result.thumbnail.path}.${this.result.thumbnail.extension}`
  }

  notFound(element: string, elementName: string) {
    if (!element) {
      return element = `${elementName} not found`;
    } else {
      return element;
    }
  }

  open() {

    console.log(this.result.name);
    console.log(this.result.description);
    console.log(this.thumb);

    const modalRef = this.modalService.open(ModalComponent).componentInstance;

    modalRef.name = this.notFound(this.result.name, 'Name');
    modalRef.description = this.notFound(this.result.description, 'Description');
    modalRef.thumb = this.notFound(this.thumb, 'Thumb');
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
