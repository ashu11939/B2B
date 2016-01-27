using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Integrated_B2B.Models
{
    public class Product_List
    {
        public int Prod_Id { get; set; }
        public int cid { get; set; }
        public string Product_Name { get; set; }
        public string Category_Name { get; set; }
        public Nullable<double> MRP { get; set; }
        public string Remarks { get; set; }
        public Nullable<bool> Active { get; set; }
        public string Expiry_Date_Months { get; set; }

    }

    public class Invoice_List
    {
        public string Invoice_Id { get; set; }
        public Nullable<System.DateTime> DateOfPurchase { get; set; }
        public Nullable<double> Grand_Total { get; set; }

    }

    public class Modify_Purchase_List
    {
        public Nullable<int> Prod_Id { get; set; }
        public string Product_Name { get; set; }
        public Nullable<double> Free { get; set; }
        public Nullable<double> Discount { get; set; }
        public Nullable<double> Quantity { get; set; }
        public Nullable<double> Rate { get; set; }
        public Nullable<double> Amount { get; set; }

    

    }




}