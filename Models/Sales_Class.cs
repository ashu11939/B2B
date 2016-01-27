using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Integrated_B2B.Models
{
    public class Customer_Details
    {
        public int Customer_Id { get; set; }
        public string Customer_Name { get; set; }
        public Nullable<int> Customer_Type { get; set; }
        public Nullable<int> Channel_Type { get; set; }
        public Nullable<int> Loyalty_Program { get; set; }
        public string Billing_Address { get; set; }
        public string Route { get; set; }
        public string Salesman { get; set; }
        public Nullable<bool> Active { get; set; }

    }

    public class Sales_Bill
    {
        public string Bill_No { get; set; }
        public Nullable<System.DateTime> DateTime { get; set; }
        public Nullable<int> Customer_Id { get; set; }
        public Nullable<double> Total_Amount { get; set; }
        public Nullable<double> Deposit { get; set; }
        public Nullable<double> Dues { get; set; }
        public string Advance { get; set; }
        public Nullable<int> cid { get; set; }

    }


}