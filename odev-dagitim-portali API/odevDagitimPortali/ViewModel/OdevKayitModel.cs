using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace odevDagitimPortali.ViewModel
{
    public class OdevKayitModel
    {
        public int kayitId { get; set; }
        public int ogrId { get; set; }
        public int odevId { get; set; }
        public OgrenciModel ogrBilgi { get; set; }
        public OdevModel odevBilgi { get; set; }
    }
}