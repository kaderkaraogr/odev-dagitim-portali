import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { Kayit } from 'src/app/models/Kayit';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  kadi: any;

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    public apiServis: ApiService
  ) { }
  ngOnInit(): void {
    if (this.apiServis.OturumKontrol()) {
      this.kadi = localStorage.getItem("kadi");
    }
    this.OgrenciListele();
  }

  OturumKapat() {
    localStorage.clear();
    location.href = "/login"
  }



  ogrenciler!: Ogrenci[];
  OgrenciListele() {
    this.apiServis.OgrenciListele().subscribe((d: Ogrenci[]) => {
      this.ogrenciler = d;
    })
  }

  KayitListele(ogrId: any) {
    this.apiServis.OdevByOgr(ogrId).subscribe((d: Kayit[]) => {
    })
  }
}
