import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    public modal: ModalService, 
    public afAuth: AngularFireAuth,
    public auth: AuthService
  ){}

  openModal($event: Event){
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }

  async logout($event: Event){
    $event.preventDefault();
    await this.afAuth.signOut();
  }
}
