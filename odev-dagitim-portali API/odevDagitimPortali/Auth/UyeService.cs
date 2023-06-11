using System;
using System.Collections.Generic;
using System.Linq;
using odevDagitimPortali.ViewModel;
using System.Web;
using odevDagitimPortali.Models;

namespace odevDagitimPortali.Auth
{
    public class UyeService
    {
        odevDagitimPortaliEntities db = new odevDagitimPortaliEntities();

        public UyeModel UyeOturumAc(string kadi, string parola)
        {
            UyeModel uye = db.Uye.Where(s => s.kullaniciAdi == kadi && s.sifre == parola).Select(x => new UyeModel()
            {

                uyeId = x.uyeId,
                adSoyad = x.adSoyad,
                kullaniciAdi = x.kullaniciAdi,
                email = x.email,
                sifre = x.sifre,
                uyeYetki = x.uyeYetki
            }).SingleOrDefault();
            return uye;
        }

    }
}