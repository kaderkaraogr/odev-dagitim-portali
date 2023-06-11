using odevDagitimPortali.Models;
using odevDagitimPortali.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace odevDagitimPortali.Controllers
{
    public class ServisController : ApiController
    {
        odevDagitimPortaliEntities db = new odevDagitimPortaliEntities();
        SonucModel sonuc = new SonucModel();
        

        #region Uye
        [HttpGet]
        [Route("api/uyelistele")]
        public List<UyeModel> UyeListele()
        {
            List<UyeModel> liste = db.Uye.Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                kullaniciAdi = x.kullaniciAdi,
                adSoyad = x.adSoyad,
                sifre = x.sifre,
                email = x.email,
                uyeYetki = x.uyeYetki

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyeModel UyeById(int uyeId)
        {
            UyeModel kayit = db.Uye.Where(s => s.uyeId == uyeId).Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                kullaniciAdi = x.kullaniciAdi,
                adSoyad = x.adSoyad,
                sifre = x.sifre,
                email = x.email,
                uyeYetki = x.uyeYetki

            }).FirstOrDefault();
            return kayit;
        }
        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.Uye.Count(s => s.kullaniciAdi == model.kullaniciAdi && s.email == model.email) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Uye Kayıtlıdır";
                return sonuc;
            }
            Uye yeni = new Uye();
            yeni.kullaniciAdi = model.kullaniciAdi;
            yeni.adSoyad = model.adSoyad;
            yeni.sifre = model.sifre;
            yeni.email = model.email;
            yeni.uyeYetki = model.uyeYetki;
            db.Uye.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yeni Uye Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == model.uyeId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Uye Bulunamadı";
                return sonuc;
            }
            kayit.kullaniciAdi = model.kullaniciAdi;
            kayit.adSoyad = model.adSoyad;
            kayit.sifre = model.sifre;
            kayit.email = model.email;
            kayit.uyeYetki = model.uyeYetki;
            sonuc.islem = true;
            sonuc.mesaj = "Uye Güncellendi";
            db.SaveChanges();

            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]

        public SonucModel UyeSil(int uyeId)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == uyeId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Uye Bulunamadı";
                return sonuc;
            }
            db.Uye.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Uye Silindi";
            return sonuc;
        }
        #endregion

        #region Ogrenci
        [HttpGet]
        [Route("api/ogrencilistele")]
        public List<OgrenciModel> OgrenciListele()
        {
            List<OgrenciModel> liste = db.Ogrenci.Select(x => new OgrenciModel()
            {
                ogrenciId = x.ogrenciId,
                ogrenciAdiSoyadi = x.ogrenciAdiSoyadi,
                ogrenciYas = x.ogrenciYas,
                ogrenciOdevSayisi = x.OdevKayit.Count()

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/ogrencibyid/{ogrenciId}")]
        public OgrenciModel OgrenciById(int ogrenciId)
        {
            OgrenciModel kayit = db.Ogrenci.Where(s => s.ogrenciId == ogrenciId).Select(x => new OgrenciModel()
            {
                ogrenciId = x.ogrenciId,
                ogrenciAdiSoyadi = x.ogrenciAdiSoyadi,
                ogrenciYas = x.ogrenciYas,
                ogrenciOdevSayisi = x.OdevKayit.Count()


            }).FirstOrDefault();
            return kayit;
        }
        [HttpPost]
        [Route("api/ogrenciekle")]
        public SonucModel OgrenciEkle(OgrenciModel model)
        {
            if (db.Ogrenci.Count(s => s.ogrenciAdiSoyadi == model.ogrenciAdiSoyadi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ogrenci Kayıtlıdır";
                return sonuc;
            }
            Ogrenci yeni = new Ogrenci();
            yeni.ogrenciAdiSoyadi = model.ogrenciAdiSoyadi;
            yeni.ogrenciYas = model.ogrenciYas;
            db.Ogrenci.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yeni Ogrenci Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/ogrenciduzenle")]
        public SonucModel OgrenciDuzenle(OgrenciModel model)
        {
            Ogrenci kayit = db.Ogrenci.Where(s => s.ogrenciId == model.ogrenciId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ogrenci Bulunamadı";
                return sonuc;
            }
            kayit.ogrenciAdiSoyadi = model.ogrenciAdiSoyadi;
            kayit.ogrenciYas = model.ogrenciYas;
            sonuc.islem = true;
            sonuc.mesaj = "Ogrenci Güncellendi";
            db.SaveChanges();

            return sonuc;
        }

        [HttpDelete]
        [Route("api/ogrencisil/{ogrenciId}")]

        public SonucModel OgrenciSil(int ogrenciId)
        {
            Ogrenci kayit = db.Ogrenci.Where(s => s.ogrenciId == ogrenciId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ogrenci Bulunamadı";
                return sonuc;
            }
            db.Ogrenci.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ogrenci Silindi";
            return sonuc;
        }
        #endregion

        #region Kategori
        [Authorize]

        [HttpGet]
        [Route("api/kategorilistele")]
        public List<KategoriModel> KategoriListele()
        {
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel()
            {
                kategoriId = x.kategoriId,
                kategoriAdi = x.kategoriAdi,
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/kategoribyid/{kategoriId}")]
        public KategoriModel KategoriById(int kategoriId)
        {
            KategoriModel kayit = db.Kategori.Where(s => s.kategoriId == kategoriId).Select(x => new KategoriModel()
            {
                kategoriId = x.kategoriId,
                kategoriAdi = x.kategoriAdi
            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.Kategori.Count(s => s.kategoriAdi == model.kategoriAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Kayıtlıdır";
                return sonuc;
            }
            Kategori yeni = new Kategori();
            yeni.kategoriAdi = model.kategoriAdi;
            db.Kategori.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yeni Kategori Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(s => s.kategoriId == model.kategoriId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori Bulunamadı";
                return sonuc;
            }
            kayit.kategoriAdi = model.kategoriAdi;
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Güncellendi";
            db.SaveChanges();
            return sonuc;
        }
        [HttpDelete]
        [Route("api/kategorisil/{kategoriId}")]

        public SonucModel KategoriSil(int kategoriId)
        {
            Kategori kayit = db.Kategori.Where(s => s.kategoriId == kategoriId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori Bulunamadı";
                return sonuc;
            }
            if (db.Ders.Count(s => s.dersKatId == kategoriId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu kategorie kayıtlı Ders olduğu için silinemez";
                return sonuc;
            }
            db.Kategori.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
            return sonuc;
        }
        #endregion

        #region Ders
        [HttpGet]
        [Route("api/derslistele")]
        public List<DersModel> DersListele()
        {
            List<DersModel> liste = db.Ders.Select(x => new DersModel()
            {
                dersId = x.dersId,
                dersAdi = x.dersAdi,
                dersKredi = x.dersKredi,
                dersKatId = x.dersKatId,
                katAdi = x.Kategori.kategoriAdi,
                dersOdevSayisi = x.Odev.Count()
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/dersbyid/{dersId}")]
        public DersModel DersById(int dersId)
        {
            DersModel kayit = db.Ders.Where(s => s.dersId == dersId).Select(x => new DersModel()
            {
                dersId = x.dersId,
                dersAdi = x.dersAdi,
                dersKredi = x.dersKredi,
                dersKatId = x.dersKatId,
                katAdi = x.Kategori.kategoriAdi,
                dersOdevSayisi = x.Odev.Count()


            }).FirstOrDefault();
            return kayit;
        }
        [HttpGet]
        [Route("api/dersbykategoriid/{kategoriId}")]
        public List<DersModel> DersByKategoriId(int kategoriId)
        {
            List<DersModel> liste = db.Ders.Where(s => s.dersKatId == kategoriId).Select(x => new DersModel()
            {
                dersId = x.dersId,
                dersAdi = x.dersAdi,
                dersKredi = x.dersKredi,
                dersKatId = x.dersKatId,
                katAdi = x.Kategori.kategoriAdi,

                dersOdevSayisi = x.Odev.Count()

            }).ToList();
            return liste;
        }

        [HttpPost]
        [Route("api/dersekle")]
        public SonucModel DersEkle(DersModel model)
        {
            if (db.Ders.Count(s => s.dersAdi == model.dersAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Ders Kayıtlıdır";
                return sonuc;
            }
            Ders yeni = new Ders();
            yeni.dersAdi = model.dersAdi;
            yeni.dersKredi = model.dersKredi;
            yeni.dersKatId = model.dersKatId;
            db.Ders.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yeni Ders Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/dersduzenle")]
        public SonucModel DersDuzenle(DersModel model)
        {
            Ders kayit = db.Ders.Where(s => s.dersId == model.dersId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ders Bulunamadı";
                return sonuc;
            }
            kayit.dersAdi = model.dersAdi;
            kayit.dersKredi = model.dersKredi;
            kayit.dersKatId = model.dersKatId;
            sonuc.islem = true;
            sonuc.mesaj = "Ders Güncellendi";
            db.SaveChanges();
            return sonuc;
        }
        [HttpDelete]
        [Route("api/derssil/{dersId}")]

        public SonucModel DersSil(int dersId)
        {
            Ders kayit = db.Ders.Where(s => s.dersId == dersId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ders Bulunamadı";
                return sonuc;
            }
            if (db.Odev.Count(s => s.odevDersId == dersId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu derse kayıtlı ödev olduğu için silinemez";
                return sonuc;
            }
            db.Ders.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Silindi";
            return sonuc;
        }
        #endregion

        #region Odev
        [HttpGet]
        [Route("api/odevlistele")]
        public List<OdevModel> OdevListele()
        {
            List<OdevModel> liste = db.Odev.Select(x => new OdevModel()
            {
                odevId = x.odevId,
                odevAdi = x.odevAdi,
                odevOzet = x.odevOzet,
                odevDersId = x.odevDersId,
                dersAdi = x.Ders.dersAdi,
                odevOgrenciSayisi = x.OdevKayit.Count()
            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.dersBilgi = DersById(kayit.odevDersId);
            }
            return liste;
        }

        [HttpGet]
        [Route("api/odevbyid/{odevId}")]
        public OdevModel OdevById(int odevId)
        {
            OdevModel kayit = db.Odev.Where(s => s.odevId == odevId).Select(x => new OdevModel()
            {
                odevId = x.odevId,
                odevAdi = x.odevAdi,
                odevOzet = x.odevOzet,
                odevDersId = x.odevDersId,
                dersAdi = x.Ders.dersAdi,
                odevOgrenciSayisi = x.OdevKayit.Count()

            }).FirstOrDefault();
            return kayit;
        }


        [HttpGet]
        [Route("api/odevbydersid/{dersId}")]
        public List<OdevModel> OdevByDersId(int dersId)
        {
            List<OdevModel> liste = db.Odev.Where(s => s.odevDersId == dersId).Select(x => new OdevModel()
            {
                odevId = x.odevId,
                odevAdi = x.odevAdi,
                odevOzet = x.odevOzet,
                odevDersId = x.odevDersId,
                dersAdi = x.Ders.dersAdi,
                odevOgrenciSayisi = x.OdevKayit.Count()

            }).ToList();
            foreach (var kayit in liste)
            {
                kayit.dersBilgi = DersById(kayit.odevDersId);
            }
            return liste;
        }


        [HttpPost]
        [Route("api/odevekle")]
        public SonucModel OdevEkle(OdevModel model)
        {
            if (db.Odev.Count(s => s.odevAdi == model.odevAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ödev Kayıtlıdır";
                return sonuc;
            }
            Odev yeni = new Odev();
            yeni.odevAdi = model.odevAdi;
            yeni.odevOzet = model.odevOzet;
            yeni.odevDersId = model.odevDersId;
            db.Odev.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yeni Ödev Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/odevduzenle")]
        public SonucModel OdevDuzenle(OdevModel model)
        {
            Odev kayit = db.Odev.Where(s => s.odevId == model.odevId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Odev Bulunamadı";
                return sonuc;
            }
            kayit.odevAdi = model.odevAdi;
            kayit.odevOzet = model.odevOzet;
            kayit.odevDersId = model.odevDersId;
            sonuc.islem = true;
            sonuc.mesaj = "Ödev Güncellendi";
            db.SaveChanges();

            return sonuc;
        }
        [HttpDelete]
        [Route("api/odevsil/{odevId}")]

        public SonucModel OdevSil(int odevId)
        {
            Odev kayit = db.Odev.Where(s => s.odevId == odevId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ödev Bulunamadı";
                return sonuc;
            }
            if (db.OdevKayit.Count(s => s.odevId == odevId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ödev üzerinde öğrenci kaydı olduğu için bu ödev silinemez";
                return sonuc;
            }
            db.Odev.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ödev Silindi";
            return sonuc;
        }

        #endregion

        #region OdevKayit

        [HttpGet]
        [Route("api/odevKayitlistele")]
        public List<OdevKayitModel> OdevKayitListele()
        {
            List<OdevKayitModel> liste = db.OdevKayit.Select(x => new OdevKayitModel()
            {
                kayitId = x.kayitId,
                odevId = x.odevId,
                ogrId = x.ogrId,
            }).ToList();
            foreach (var odevKayit in liste)
            {
                odevKayit.ogrBilgi = OgrenciById(odevKayit.ogrId);
                odevKayit.odevBilgi = OdevById(odevKayit.odevId);
            }
            return liste;
        }

        [HttpGet]
        [Route("api/odevkayitsoneklnenler")]
        public List<OdevKayitModel> OdevKayitSonEklenenler(int sayi)
        {
            List<OdevKayitModel> liste = db.OdevKayit.OrderByDescending(s => s.kayitId).Take(sayi).Select(x => new OdevKayitModel()
            {
                kayitId = x.kayitId,
                odevId = x.odevId,
                ogrId = x.ogrId,
            }).ToList();
            foreach (var odevKayit in liste)
            {
                odevKayit.ogrBilgi = OgrenciById(odevKayit.ogrId);
                odevKayit.odevBilgi = OdevById(odevKayit.odevId);
            }
            return liste;
        }


        [HttpGet]
        [Route("api/kayitbyogr/{ogrId}")]
        public List<OdevKayitModel> UyeOdevListele(int ogrId)
        {
            List<OdevKayitModel> liste = db.OdevKayit.Where(s => s.ogrId == ogrId).Select(x => new OdevKayitModel()
            {
                kayitId = x.kayitId,
                odevId = x.odevId,
                ogrId = x.ogrId,
            }).ToList();
            foreach (var odevKayit in liste)
            {
                odevKayit.ogrBilgi = OgrenciById(odevKayit.ogrId);
                odevKayit.odevBilgi = OdevById(odevKayit.odevId);
            }
            return liste;
        }
        [HttpGet]
        [Route("api/kayitbyodev/{odevId}")]
        public List<OdevKayitModel> OdevUyeListele(int odevId)
        {
            List<OdevKayitModel> liste = db.OdevKayit.Where(s => s.odevId == odevId).Select(x => new OdevKayitModel()
            {
                kayitId = x.kayitId,
                odevId = x.odevId,
                ogrId = x.ogrId,
            }).ToList();
            foreach (var odevKayit in liste)
            {
                odevKayit.ogrBilgi = OgrenciById(odevKayit.ogrId);
                odevKayit.odevBilgi = OdevById(odevKayit.odevId);
            }
            return liste;
        }

        [HttpPost]
        [Route("api/odevkayitekle")]
        public SonucModel OdevKayitEkle(OdevKayitModel model)
        {
            if (db.OdevKayit.Count(s => s.odevId == model.odevId && s.ogrId == model.ogrId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili öğrencinin ödevi kayıtlıdır";
                return sonuc;
            }
            OdevKayit yeni = new OdevKayit();
            yeni.ogrId = model.ogrId;
            yeni.odevId = model.odevId;
            db.OdevKayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ödev Gönderildi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/kayitduzenle")]
        public SonucModel KayitDuzenle(OdevKayitModel model)
        {
            OdevKayit kayit = db.OdevKayit.Where(s => s.kayitId == model.kayitId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            kayit.ogrId = model.ogrId;
            kayit.odevId = model.odevId;
            sonuc.islem = true;
            sonuc.mesaj = "Kayıt Güncellendi";
            db.SaveChanges();

            return sonuc;
        }

        [HttpDelete]
        [Route("api/odevkayitsil/{kayitId}")]
        public SonucModel OdevKayitSil(int kayitId)
        {
            OdevKayit odevKayit = db.OdevKayit.Where(s => s.kayitId == kayitId).SingleOrDefault();
            if (odevKayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            db.OdevKayit.Remove(odevKayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ödev Silindi";
            return sonuc;
        }

        #endregion



    }
}
