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
    
    public partial class DB_Product
    {
        public DB_Product()
        {
            this.DB_Invoice_Product = new HashSet<DB_Invoice_Product>();
            this.DB_Product_Log = new HashSet<DB_Product_Log>();
            this.DB_Sales_Bill_Product = new HashSet<DB_Sales_Bill_Product>();
        }
    
        public int Prod_Id { get; set; }
        public int cid { get; set; }
        public string Product_Name { get; set; }
        public string Category_Name { get; set; }
        public Nullable<double> MRP { get; set; }
        public string Remarks { get; set; }
        public Nullable<bool> Active { get; set; }
        public string Expiry_Date_Months { get; set; }
    
        public virtual DB_Company DB_Company { get; set; }
        public virtual ICollection<DB_Invoice_Product> DB_Invoice_Product { get; set; }
        public virtual ICollection<DB_Product_Log> DB_Product_Log { get; set; }
        public virtual ICollection<DB_Sales_Bill_Product> DB_Sales_Bill_Product { get; set; }
    }
}