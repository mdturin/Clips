import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmailTaken } from '../validators/email-taken';
import { RegisterValidators } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private auth: AuthService, public emailTaken: EmailTaken) {}

  inSubmission = false;

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);

  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailTaken.validate]
  );

  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(80),
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);

  confirm_password = new FormControl('', [Validators.required]);

  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(17),
    Validators.maxLength(17),
  ]);

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirm_password: this.confirm_password,
      phoneNumber: this.phoneNumber,
    },
    [RegisterValidators.match('password', 'confirm_password')]
  );

  showAlert = false;
  alertMessage = 'Please wait! Your account is being created.';
  alertColor = 'blue';

  async register() {
    this.showAlert = true;
    this.alertMessage = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.auth.createUser(this.registerForm.value as IUser);
    } catch (error) {
      console.error(error);
      this.alertMessage = 'Please try again later!';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertColor = 'green';
    this.alertMessage = 'Success!';
    this.inSubmission = false;
    this.registerForm.reset();
  }
}
