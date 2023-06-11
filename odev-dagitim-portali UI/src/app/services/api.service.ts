import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Uye } from '../models/Uye';
import { Kategori } from '../models/Kategori';
import { Sonuc } from '../models/Sonuc';
import { Ders } from '../models/Ders';
import { Odev } from '../models/Odev';
import { Kayit } from '../models/Kayit';
import { Ogrenci } from '../models/Ogrenci';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:51744/api/";
  constructor(
    private http: HttpClient
  ) { }

  tokenAl(kAdi: string, sifre: string) {
    var data = `username=${kAdi}&password=${sifre}&grant_type=password`;
    var reqHeader = new HttpHeaders({ "Content-type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "token", data, { headers: reqHeader });
  }

  OturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  yetkiKontrol(yetkiler: any[]) {
    var sonuc: boolean = false;
    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri") || "[]");
    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
      })
    }
    return sonuc;
  }

  UyeListele() {
    return this.http.get<Uye[]>(this.apiUrl + "uyelistele");
  }
  UyeById(uyeId: number) {
    return this.http.get(this.apiUrl + "uyebyid/" + uyeId);
  }
  UyeEkle(uye: Uye) {
    return this.http.post<Sonuc>(this.apiUrl + "uyeekle", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put<Sonuc>(this.apiUrl + "uyeduzenle", uye);
  }
  UyeSil(uyeId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "uyesil/" + uyeId);
  }
  OgrenciListele() {
    return this.http.get<Ogrenci[]>(this.apiUrl + "ogrencilistele");
  }
  OgrenciById(ogrenciId: number) {
    return this.http.get<Ogrenci>(this.apiUrl + "ogrencibyid/" + ogrenciId);
  }
  OgrenciEkle(ogrenci: Ogrenci) {
    return this.http.post<Sonuc>(this.apiUrl + "ogrenciekle", ogrenci);
  }
  OgrenciDuzenle(ogrenci: Ogrenci) {
    return this.http.put<Sonuc>(this.apiUrl + "ogrenciduzenle", ogrenci);
  }
  OgrenciSil(ogrenciId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "ogrencisil/" + ogrenciId);
  }

  KategoriListele() {
    return this.http.get<Kategori[]>(this.apiUrl + "kategorilistele");
  }
  KategoriById(kategoriId: number) {
    return this.http.get<Kategori>(this.apiUrl + "kategoribyid/" + kategoriId);
  }
  KategoriEkle(kategori: Kategori) {
    return this.http.post<Sonuc>(this.apiUrl + "kategoriekle", kategori);
  }
  KategoriDuzenle(kategori: Kategori) {
    return this.http.put<Sonuc>(this.apiUrl + "kategoriduzenle", kategori);
  }
  KategoriSil(kategoriId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "kategorisil/" + kategoriId);
  }



  DersListele() {
    return this.http.get<Ders[]>(this.apiUrl + "derslistele");
  }
  DersById(dersId: number) {
    return this.http.get<Ders>(this.apiUrl + "dersbyid/" + dersId);
  }
  DersByKat(katId: number) {
    return this.http.get<Ders[]>(this.apiUrl + "dersbykategoriid/" + katId);
  }
  DersEkle(ders: Ders) {
    return this.http.post<Sonuc>(this.apiUrl + "dersekle", ders);
  }
  DersDuzenle(ders: Ders) {
    return this.http.put<Sonuc>(this.apiUrl + "dersduzenle", ders);
  }
  DersSil(dersId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "derssil/" + dersId);
  }

  OdevListele() {
    return this.http.get<Odev[]>(this.apiUrl + "odevlistele");
  }
  OdevById(odevId: number) {
    return this.http.get<Odev>(this.apiUrl + "odevbyid/" + odevId);
  }
  OdevByDers(dersId: number) {
    return this.http.get<Odev[]>(this.apiUrl + "odevbydersid/" + dersId);
  }
  OdevEkle(odev: Odev) {
    return this.http.post<Sonuc>(this.apiUrl + "odevekle", odev);
  }
  OdevDuzenle(odev: Odev) {
    return this.http.put<Sonuc>(this.apiUrl + "odevduzenle", odev);
  }
  OdevSil(odevId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "odevsil/" + odevId);
  }

  KayitListele() {
    return this.http.get<Kayit[]>(this.apiUrl + "odevkayitlistele");
  }
  KayitSonEklenenler(sayi: number) {
    return this.http.get<Kayit[]>(this.apiUrl + "odevkayitsoneklnenler?sayi=" + sayi );
  }
  OdevByOgr(ogrId: number) {
    return this.http.get<Kayit[]>(this.apiUrl + "kayitbyogr/" + ogrId);
  }
  OgrByOdev(odevId: number) {
    return this.http.get<Kayit[]>(this.apiUrl + "kayitbyodev/" + odevId);
  }
  KayitEkle(kayit: Kayit) {
    return this.http.post<Sonuc>(this.apiUrl + "odevkayitekle", kayit);
  }
  KayitDuzenle(kayit: Kayit) {
    return this.http.put<Sonuc>(this.apiUrl + "kayitduzenle", kayit);
  }
  KayitSil(kayitId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "odevkayitsil/" + kayitId);
  }
}
