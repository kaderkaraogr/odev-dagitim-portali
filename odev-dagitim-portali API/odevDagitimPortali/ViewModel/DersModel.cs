using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace odevDagitimPortali.ViewModel
{
    public class DersModel
    {
        public int dersId { get; set; }
        public string dersAdi { get; set; }
        public string dersKredi { get; set; }
        public int dersKatId { get; set; }
        public int dersOdevSayisi { get; set; }
        public KategoriModel katBilgi { get; set; }
        public string katAdi { get; set; }

    }
}