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
    
    public partial class DB_Route
    {
        public int Route_Id { get; set; }
        public string Route_Name { get; set; }
    
        public virtual DB_Route DB_Route1 { get; set; }
        public virtual DB_Route DB_Route2 { get; set; }
    }
}
