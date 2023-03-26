import { Component, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() modalId = '';

  constructor(public modal: ModalService, public elementRef: ElementRef) {
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.elementRef.nativeElement);
  }

  ngOnInit(): void {
    document.body.appendChild(this.elementRef.nativeElement);
  }

  toggleModal(id: string) {
    this.modal.toggleModal(id);
  }
}
