import { Kategori } from "./Kategori";
import { Odev } from "./Odev";
import { Ogrenci } from "./Ogrenci";

export class Kayit {

    kayitId!: number;
    ogrId!: number;
    odevId!: number;

    
    ogrBilgi!: Ogrenci;
    odevBilgi!: Odev;
}