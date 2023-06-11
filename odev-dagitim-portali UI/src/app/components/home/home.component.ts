import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { Kayit } from 'src/app/models/Kayit';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  kayitlar!: Kayit[];
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  dataSource: any;
  displayedColumns = ["odev","ders","ogr"]
  constructor(
    public alert: MyAlertService,
    public MatDialog: MatDialog,
    private apiServis: ApiService
  ) { }

  ngOnInit() {
    this.KayitListele();
  }
  AlertAc(p: boolean) {
    var s: Sonuc = new Sonuc();
    s.islem = p;
    s.mesaj = "bu bir alert test mesajıdır"
    this.alert.AlertUygula(s)
  }
  ConfirmAc() {
    this.confirmDialogRef = this.MatDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Kayıt Silinecektir Onaylıyor musunuz?"
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        //silme işlemi
      }
    })
  }
  KayitListele() {
    this.apiServis.KayitSonEklenenler(5).subscribe(d => {
      this.kayitlar = d
      this.dataSource = new MatTableDataSource(this.kayitlar);

    })
  }
}
