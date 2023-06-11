import { Kategori } from "./Kategori";

export class Ders {
    dersId!: number;
    dersAdi!: string;
    dersKredi!: string;
    dersKatId!: number;
    katBilgi!: Kategori;
    katAdi!: string;
    dersOdevSayisi!: number;
}