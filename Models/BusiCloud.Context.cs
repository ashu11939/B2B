﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class BusiCloudEntities : DbContext
    {
        public BusiCloudEntities()
            : base("name=BusiCloudEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<DB_Channel_Type> DB_Channel_Type { get; set; }
        public virtual DbSet<DB_Company> DB_Company { get; set; }
        public virtual DbSet<DB_Customer> DB_Customer { get; set; }
        public virtual DbSet<DB_Customer_Type> DB_Customer_Type { get; set; }
        public virtual DbSet<DB_Invoice> DB_Invoice { get; set; }
        public virtual DbSet<DB_Invoice_Product> DB_Invoice_Product { get; set; }
        public virtual DbSet<DB_Loyalty_Program> DB_Loyalty_Program { get; set; }
        public virtual DbSet<DB_Product> DB_Product { get; set; }
        public virtual DbSet<DB_Product_Log> DB_Product_Log { get; set; }
        public virtual DbSet<DB_Route> DB_Route { get; set; }
        public virtual DbSet<DB_Sales_Bill> DB_Sales_Bill { get; set; }
        public virtual DbSet<DB_Sales_Bill_Product> DB_Sales_Bill_Product { get; set; }
    }
}
