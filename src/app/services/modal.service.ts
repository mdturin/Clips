import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public modals: IModal[] = [];

  constructor() { }

  isModalOpen(id: string): boolean {
    return !!this.modals.find(item => item.id === id)?.visible;
  }

  toggleModal(id: string): void {
    const modal = this.modals.find(item => item.id === id);
    if (modal)
      modal.visible = !modal.visible;
  }

  register(id: string): void {
    this.modals.push({
      id, visible: false
    });
  }

  unregister(id: string){
    this.modals = this.modals.filter(
      item => item.id !== id
    );
  }
}
