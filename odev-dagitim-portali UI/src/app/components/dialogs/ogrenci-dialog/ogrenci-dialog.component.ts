import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ogrenci } from 'src/app/models/Ogrenci';

@Component({
  selector: 'app-ogrenci-dialog',
  templateUrl: './ogrenci-dialog.component.html',
  styleUrls: ['./ogrenci-dialog.component.css']
})
export class OgrenciDialogComponent implements OnInit {

  dialogBaslik!: string;
  islem!: string;
  frm!: FormGroup;
  yeniOgrenci!: Ogrenci;
  constructor(
    private apiServis: ApiService,
    public MatDialog: MatDialog,
    private frmBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OgrenciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    this.yeniOgrenci = data.kayit;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Öğrenci Ekle";
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Öğrenci Düzenle";
    }
    this.frm= this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur() {
    return this.frmBuilder.group({
      ogrenciAdiSoyadi: [this.yeniOgrenci.ogrenciAdiSoyadi],
      ogrenciYas: [this.yeniOgrenci.ogrenciYas],
    })
  }



}
