using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace odevDagitimPortali.ViewModel
{
    public class OdevModel
    {
        public int odevId { get; set; }
        public string odevAdi { get; set; }
        public string odevOzet { get; set; }
        public int odevDersId { get; set; }
        public int odevOgrenciSayisi { get; set; }
        public string dersAdi { get; set; }
        public DersModel dersBilgi { get; set; }
    }
}