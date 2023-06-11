import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MyAlertService } from './services/myAlert.service';
import { UyeComponent } from './components/uye/uye.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { OgrenciDialogComponent } from './components/dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { DersDialogComponent } from './components/dialogs/ders-dialog/ders-dialog.component';
import { DersComponent } from './components/ders/ders.component';
import { OdevDialogComponent } from './components/dialogs/odev-dialog/odev-dialog.component';
import { OdevComponent } from './components/odev/odev.component';
import { OgrenciOdevComponent } from './components/ogrenci-odev/ogrenci-odev.component';
import { OdevKayitComponent } from './components/odevKayit/odevKayit.component';
import { KayitDialogComponent } from './components/dialogs/kayit-dialog/kayit-dialog.component';
import { OdevOgrenciComponent } from './components/odev-ogrenci/odev-ogrenci.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AuthGuard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UyeComponent,
    OgrenciComponent,
    KategoriComponent,
    DersComponent,
    OdevComponent,
    OgrenciOdevComponent,
    OdevKayitComponent,
    OdevOgrenciComponent,
    LoginComponent,

    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    OgrenciDialogComponent,
    KategoriDialogComponent,
    DersDialogComponent,
    OdevDialogComponent,
    KayitDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MyAlertService,AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
