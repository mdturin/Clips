import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { enviroment } from 'src/enviroments/enviroment';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VideoModule } from './video/video.module';

@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent, AboutComponent],
  imports: [
    BrowserModule,
    UserModule,
    AppRoutingModule,
    VideoModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(enviroment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
