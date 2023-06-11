import { Component, OnInit, ViewChild } from '@angular/core';
import { Kayit } from 'src/app/models/Kayit';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { KayitDialogComponent } from '../dialogs/kayit-dialog/kayit-dialog.component';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ogrenci-odev',
  templateUrl: './ogrenci-odev.component.html',
  styleUrls: ['./ogrenci-odev.component.css']
})
export class OgrenciOdevComponent implements OnInit {
  kayitlar!: Kayit[];
  displayedColumns = ["kayitId","odevBilgi", "odevOzet", "islemler"]
  dataSource: any;
  secOgr!: Ogrenci;
  ogrId!: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef!: MatDialogRef<KayitDialogComponent>;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    private matDialog: MatDialog,
    private alertServis: MyAlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {  
    this.route.params.subscribe((p: any) => {
      this.ogrId = p.ogrId
    })

    this.KayitListele();
    this.OgrenciById();
  }
   KayitListele() {
     this.apiServis.OdevByOgr(this.ogrId).subscribe((d: Kayit[]) => {
       this.kayitlar = d;
       this.dataSource = new MatTableDataSource(this.kayitlar);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
     })
   }

   OgrenciById(){
    this.apiServis.OgrenciById(this.ogrId).subscribe((d: Ogrenci) => {
      this.secOgr = d
    })
   }

   filtrele(e: any) {
     var val = e.target.value;
     this.dataSource.filter = val.trim().toLowerCase();
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
   }
   KayitEkle() {
     var yeniKayit: Kayit = new Kayit();
     yeniKayit.ogrId = this.ogrId;
     this.dialogRef = this.matDialog.open(KayitDialogComponent, {
       width: '400px',
       data: {
         kayit: yeniKayit,
         islem: 'ekle',
         ogrIdVar: true
       }
     })
     this.dialogRef.afterClosed().subscribe(d => {
       if (d != undefined) {
        this.apiServis.KayitEkle(d).subscribe((s: Sonuc) => {
          this.alertServis.AlertUygula(s)
          s.islem ? this.KayitListele() : null;
        })
       }
     })
   }
   KayitDuzenle(kayit: Kayit) {
     this.dialogRef = this.matDialog.open(KayitDialogComponent, {
       width: "400px",
       data: {
         kayit: kayit,
         islem: "duzenle",
         ogrIdVar: true
       }
     })
     this.dialogRef.afterClosed().subscribe(d => {
      
       if(!d){

       }else{
        kayit.ogrId = d.ogrId;
        kayit.odevId = d.odevId;
  
         this.apiServis.KayitDuzenle(kayit).subscribe((s: Sonuc) => {
           this.alertServis.AlertUygula(s)
           s.islem ? this.KayitListele() : null;
         })

       }
     })
   }

   KayitSil(kayit: Kayit){
     this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
       width: "400px"
     });
     this.confirmDialogRef.componentInstance.dialogMesaj =kayit.ogrBilgi.ogrenciAdiSoyadi + " Öğrencinin " + kayit.odevBilgi.odevAdi + " Ödevi Silinecektir Onaylıyor musunuz?";
     this.confirmDialogRef.afterClosed().subscribe(d => {
       if(d){
         this.apiServis.KayitSil(kayit.kayitId).subscribe((s: Sonuc) => {
           this.alertServis.AlertUygula(s)
           s.islem ? this.KayitListele() : null;
         })
       }
     })
   }

}
