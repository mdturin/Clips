import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  isDragOver = false;
  file: File | null = null;
  nextStep = false;
  showAlert = false;
  alertColor = 'blue';
  alertMessage = 'Please wait!';
  inSubmission = false;

  percentage = 0;
  showPercentage = false;

  constructor(private storage: AngularFireStorage){}

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  uploadForm = new FormGroup({
    title: this.title
  })

  storeFile(event: Event) {
    this.isDragOver = false;

    this.file = (event as DragEvent).dataTransfer?.files.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    )
    this.nextStep = true;
    console.log(this.file);
  }

  uploadFile(){
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMessage = 'Please Wait!';
    this.inSubmission = true;
    this.showPercentage = true;
    
    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;
    
    const task = this.storage.upload(clipPath, this.file);
    task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100;
    });

    task.snapshotChanges()
      .pipe(last())
      .subscribe({
        next: (snapshot) => {
          this.alertColor = 'green';
          this.alertMessage = 'success';
          this.showPercentage = false;
        },
        error: (error) => {
          this.alertColor = 'red';
          this.alertMessage = 'failed!';
          this.inSubmission = false;
          this.showPercentage = false;
          console.error(error);
        }
      });
  }
}
