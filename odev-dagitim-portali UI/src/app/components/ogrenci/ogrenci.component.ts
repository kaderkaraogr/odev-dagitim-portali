import { OgrenciDialogComponent } from './../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-ogrenci',
  templateUrl: './ogrenci.component.html',
  styleUrls: ['./ogrenci.component.css']
})
export class OgrenciComponent implements OnInit {
  ogrenciler!: Ogrenci[];
  displayedColumns = ["ogrenciId", "ogrenciAdiSoyadi", "ogrenciYas", "ogrenciOdevSayisi", "islemler"]
  dataSource: any;
  showSpinner: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef!: MatDialogRef<OgrenciDialogComponent>;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    private matDialog: MatDialog,
    private alertServis: MyAlertService
  ) { }

  ngOnInit() {
    this.OgrenciListele();
  }

  OgrenciListele() {
    this.apiServis.OgrenciListele().subscribe((d: Ogrenci[]) => {
      this.ogrenciler = d;
      this.dataSource = new MatTableDataSource(this.ogrenciler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }


  filtrele(e: any) {
    var val = e.target.value;
    this.dataSource.filter = val.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  OgrenciEkle() {
    var yeniOgrenci: Ogrenci = new Ogrenci();
    this.dialogRef = this.matDialog.open(OgrenciDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniOgrenci,
        islem: 'ekle'
      }
    })
    this.dialogRef.afterClosed().subscribe(d => {
      if (d != undefined) {
        this.apiServis.OgrenciEkle(d).subscribe((s: Sonuc) => {
          this.alertServis.AlertUygula(s)
          s.islem ? this.OgrenciListele() : null;
        })
      }
    })
  }
  OgrenciDuzenle(kayit: Ogrenci) {
    this.dialogRef = this.matDialog.open(OgrenciDialogComponent, {
      width: "400px",
      data: {
        kayit: kayit,
        islem: "duzenle"
      }
    })
    this.dialogRef.afterClosed().subscribe(d => {
      if (!d) {

      } else {
        kayit.ogrenciAdiSoyadi = d?.ogrenciAdiSoyadi
        kayit.ogrenciYas = d?.ogrenciYas

        this.apiServis.OgrenciDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alertServis.AlertUygula(s)
          s.islem ? this.OgrenciListele() : null;
        })

      }
    })
  }

  OgrenciSil(kayit: Ogrenci) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = '"' + kayit.ogrenciAdiSoyadi + '" ' + " Öğrenci Silinecektir Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.OgrenciSil(kayit.ogrenciId).subscribe((s: Sonuc) => {
          this.alertServis.AlertUygula(s)
          s.islem ? this.OgrenciListele() : null;
        })
      }
    })
  }

}
