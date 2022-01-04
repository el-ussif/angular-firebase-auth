import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  ngOnInit() {
  }
  constructor(private modalService: BsModalService) {}
  modalRef: BsModalRef | any;
  modalRef2: BsModalRef | any;

  doHide() {
    this.modalRef.hide();
  }
  doHide2() {
    this.modalRef2.hide();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {id: 2, class: 'second' });
  }
  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
    this.modalRef = null;
  }
  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

}
