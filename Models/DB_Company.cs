//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Integrated_B2B.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class DB_Company
    {
        public DB_Company()
        {
            this.DB_Invoice = new HashSet<DB_Invoice>();
            this.DB_Product = new HashSet<DB_Product>();
        }
    
        public int cid { get; set; }
        public string Company_Name { get; set; }
        public string Registration_No { get; set; }
        public Nullable<System.DateTime> DateOfJoining { get; set; }
        public string Address_Office { get; set; }
        public string Contact { get; set; }
        public string Address_Godown { get; set; }
    
        public virtual ICollection<DB_Invoice> DB_Invoice { get; set; }
        public virtual ICollection<DB_Product> DB_Product { get; set; }
    }
}
