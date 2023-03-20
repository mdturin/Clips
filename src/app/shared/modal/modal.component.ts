import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() modalId = '';

  constructor(public modal: ModalService) { }

  toggleModal(id: string){
    this.modal.toggleModal(id);
  }
}
