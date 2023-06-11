import { Ders } from "./Ders";
import { Kategori } from "./Kategori";

export class Odev {
    odevId!: number;
    odevAdi!: string;
    odevOzet!: string;
    odevDersId!: number;
    odevOgrenciSayisi!: number;
    dersAdi!: string;
    dersBilgi!: Ders;
}