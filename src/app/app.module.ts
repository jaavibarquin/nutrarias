import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

/*  Firebase */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';

import { NavibarComponent } from './shared/navibar/navibar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PostComponent } from './components/posts/post/post.component';
import { BlogModule } from './blog/blog.module';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth/services/auth.service';
import { CanEditGuard } from './auth/guards/can-edit.guard';
import { CanAdminGuard } from './auth/guards/can-admin.guard';
import { CanSuscribeGuard } from './auth/guards/can-suscribe.guard';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { MaterialModule } from './material.module';
import { ModalComponent } from './shared/modal/modal.component';
import { ModalPlanesComponent } from './shared/modalPlanes/modalPlanes.component';
@NgModule({
  declarations: [
    AppComponent,
    NavibarComponent,
    FooterComponent,
    NewPostComponent,
    EditPostComponent,
    PostComponent,
    ModalComponent,
    ModalPlanesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    BrowserAnimationsModule,
    MaterialModule,
    BlogModule,
  ],
  providers: [
    AuthService,
    CanEditGuard,
    CanAdminGuard,
    CanSuscribeGuard,
    { provide: BUCKET, useValue: 'gs://nutrariashealth.appspot.com' },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
