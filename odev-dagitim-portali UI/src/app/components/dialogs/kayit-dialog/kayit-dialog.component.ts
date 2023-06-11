import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Kayit } from 'src/app/models/Kayit';
import { Kategori } from 'src/app/models/Kategori';
import { Ders } from 'src/app/models/Ders';
import { Uye } from 'src/app/models/Uye';
import { Odev } from 'src/app/models/Odev';
import { Ogrenci } from 'src/app/models/Ogrenci';

@Component({
  selector: 'app-kayit-dialog',
  templateUrl: './kayit-dialog.component.html',
  styleUrls: ['./kayit-dialog.component.css']
})
export class KayitDialogComponent implements OnInit {

  dialogBaslik!: string;
  islem!: string;
  frm!: FormGroup;
  yeniKayit!: Kayit;
  ogrenciler!: Ogrenci[];
  odevler!: Odev[];
  odevIdVar: boolean = false;
  ogrIdVar: boolean = false;

  constructor(
    private apiServis: ApiService,
    public MatDialog: MatDialog,
    private frmBuilder: FormBuilder,
    public dialogRef: MatDialogRef<KayitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    data.odevIdVar ? this.odevIdVar = true : null;
    data.ogrIdVar ? this.ogrIdVar = true : null;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Kayit Ekle";
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Kayit Düzenle";
    }
    if (this.odevIdVar) {
      this.dialogBaslik = "Ödeve Öğrenci Ekle";
    }
    if (this.ogrIdVar) {
      this.dialogBaslik = "Öğrenciye Ödev Ekle";
    }

    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.OgrenciListele();
    this.OdevListele();

  }
  OgrenciListele() {
    this.apiServis.OgrenciListele().subscribe((d: Ogrenci[]) => {
      this.ogrenciler = d;
    })
  }
  OdevListele() {
    this.apiServis.OdevListele().subscribe((d: Odev[]) => {
      this.odevler = d;
    })
  }

  FormOlustur() {
    return this.frmBuilder.group({
      ogrId: [this.yeniKayit.ogrId],
      odevId: [this.yeniKayit.odevId],
    })
  }



}
