import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private auth: AngularFireAuth) {}

  showAlert = false;
  alertMessage = '';
  alertColor = 'blue';
  inSubmission = false;

  credentials = {
    email: '',
    password: '',
  };

  async login() {
    this.showAlert = true;
    this.alertMessage = 'Please wait!';
    this.alertColor = 'blue';
    this.inSubmission = true;
    
    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email as string,
        this.credentials.password as string
      );
    } catch (error) {
      this.inSubmission = false;
      this.alertMessage = 'Error Occurred!';
      this.alertColor = 'red';
      return;
    }

    this.alertMessage = 'Success. You\'re logged in.';
    this.alertColor = 'green';
  }
}
