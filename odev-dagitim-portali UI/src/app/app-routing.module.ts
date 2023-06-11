import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UyeComponent } from './components/uye/uye.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { DersComponent } from './components/ders/ders.component';
import { OdevComponent } from './components/odev/odev.component';
import { OgrenciOdevComponent } from './components/ogrenci-odev/ogrenci-odev.component';
import { OdevKayitComponent } from './components/odevKayit/odevKayit.component';
import { OdevOgrenciComponent } from './components/odev-ogrenci/odev-ogrenci.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/AuthGuard';

const routes: Routes = [
  {
    path: "", component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin', 'Ogretmen'],
      gerigit: '/login'
    }
  },
  {
    path: "admin/uye", component: UyeComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  { path: "login", component: LoginComponent },
  { path: "ogrenci", component: OgrenciComponent },
  {
    path: "admin/kategori", component: KategoriComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: "ders", component: DersComponent, canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin', 'Ogretmen'],
      gerigit: '/login'
    }
  },
  {
    path: "kat-ders/:katId", component: DersComponent, canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin', 'Ogretmen'],
      gerigit: '/login'
    }
  },
  {
    path: "odev", component: OdevComponent, canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin', 'Ogretmen'],
      gerigit: '/login'
    }
  },
  {
    path: "ders-odev/:dersId", component: OdevComponent, canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin', 'Ogretmen'],
      gerigit: '/login'
    }
  },
  {
    path: "ogr-kayit/:ogrId", component: OgrenciOdevComponent, canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin', 'Ogretmen'],
      gerigit: '/login'
    }
  },
  {
    path: "odev-kayit", component: OdevKayitComponent, canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin', 'Ogretmen'],
      gerigit: '/login'
    }
  },
  {
    path: "odev-kayit/:odevId", component: OdevOgrenciComponent, canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin', 'Ogretmen'],
      gerigit: '/login'
    }
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
