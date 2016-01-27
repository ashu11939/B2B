using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Integrated_B2B.Models;

namespace Integrated_B2B.Controllers
{
    public class SalesController : Controller
    {
        // GET: Sales
        BusiCloudEntities database = new BusiCloudEntities();

        public ActionResult Add_Bill()
        {
            return View();
        }

        //GET Customer Details 
        public JsonResult Customer_Details(int? ID)
        {
            List<Customer_Details> lCustomer_Details = new List<Customer_Details>();
                
            if (ID != null)
            {
                lCustomer_Details = 
                    (from a in database.DB_Customer
                     where a.Customer_Id == ID
                     select new Customer_Details
                     {
                         Customer_Id = a.Customer_Id,
                         Customer_Name = a.Customer_Name,
                         Customer_Type = a.Customer_Type,
                         Channel_Type = a.Channel_Type,
                         Loyalty_Program = a.Loyalty_Program,
                         Billing_Address = a.Billing_Address,
                         Route = a.Route,
                         Salesman = a.Salesman,
                         Active = a.Active
                     
                     }).ToList();
                     
            }
            else 
            {
                lCustomer_Details =
                    (from a in database.DB_Customer
                     select new Customer_Details
                     {
                         Customer_Id = a.Customer_Id,
                         Customer_Name = a.Customer_Name,
                         Customer_Type = a.Customer_Type,
                         Channel_Type = a.Channel_Type,
                         Loyalty_Program = a.Loyalty_Program,
                         Billing_Address = a.Billing_Address,
                         Route = a.Route,
                         Salesman = a.Salesman,
                         Active = a.Active
                     }).ToList();
            }
            return Json(lCustomer_Details , JsonRequestBehavior.AllowGet);

        }

        //Sales Bill Submit

        public ActionResult Sales_Submit()
        {
        
            //Get data from Sales-ADD BILL table directly via form submit.
            //Customer + End Details.
            
            string[] Customer_Id = Request.Form["txtCustomer_Name"].Split(',');
            string[] DateOfSale = Request.Form["txtDateOfSale"].Split(',');
            string[] Salesman = Request.Form["txtSalesman"].Split(',');
            string[] Dues = Request.Form["txtDues"].Split(',');
            string[] Advance = Request.Form["txtAdvance"].Split(',');
            string[] Cash_Payment = Request.Form["txtCash_Payment"].Split(',');
            string[] Total_Amount = Request.Form["txtTotal_Amount"].Split(',');
            
            //Product Details
            string[] Prod_Name = Request.Form["txtProd_Name"].Split(',');
            string[] Qty = Request.Form["txtQty"].Split(',');
            string[] Free = Request.Form["txtFree"].Split(',');
            string[] Discount = Request.Form["txtDiscount"].Split(',');
            string[] Rate = Request.Form["txtRate"].Split(',');
            string[] VAT = Request.Form["txtVAT"].Split(',');
            string[] Amount = Request.Form["txtAmount"].Split(',');
            string[] cid = Request.Form["txtcid"].Split(',');
            
            //Update the corresponding rows appending quatity in Product_Log.
            //DB_Product_Log
            for(int i = 0; i < Prod_Name.Length; i++){

                int ID = Convert.ToInt32(Prod_Name[i]);

                var query =
                    (from a in database.DB_Product_Log
                    where a.Prod_Id == ID
                    select a).First();

                //If MRP of product changes then the required changes to change product.

                query.Stock_Total_Outgoing += Convert.ToInt32(Qty[i]);
                query.Stock_Live = query.Stock_Total_Incoming - query.Stock_Total_Outgoing;
                
                try{
                    database.SaveChanges();
                }

                catch(Exception e)
                {
                    Console.WriteLine(e);
                }

            }

            //Create a random No for Sales Bill ID.
            DateTime indianTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.UtcNow, "India Standard Time");
            string date = Convert.ToString(indianTime);

            var rows = 
                (from a in database.DB_Sales_Bill
                 select a.Bill_No).Count() + 1;

            string crn_final = "BILL_" + "Company_" + Convert.ToString(rows);
            
            //DB_Sales_Bill.
    
            DB_Sales_Bill Sales_Bill = new DB_Sales_Bill();

            Sales_Bill.Bill_No = crn_final;
            Sales_Bill.cid = Convert.ToInt32(cid[0]);
            Sales_Bill.DateTime = DateTime.Now;
            Sales_Bill.Total_Amount = Convert.ToDouble(Total_Amount[Total_Amount.Length - 1]);
            Sales_Bill.Deposit = Convert.ToDouble(Cash_Payment[0]);
            Sales_Bill.Dues = Convert.ToDouble(Dues[0]);
            Sales_Bill.Advance = Convert.ToString(Advance[0]); //Change in database string to double.
            Sales_Bill.Customer_Id = Convert.ToInt32(Customer_Id[0]);
            //TODO : Add Sales Man in database @deadline : before sunday @reminder: 1 day

            database.DB_Sales_Bill.Add(Sales_Bill);

            //DB_Sales_Bill_Product Insertion            
            for (int i = 0; i < Prod_Name.Length; i++)
            {
                DB_Sales_Bill_Product Sales_Bill_Product = new DB_Sales_Bill_Product();
                
                Sales_Bill_Product.Bill_No = crn_final;
                Sales_Bill_Product.Prod_Id = Convert.ToInt32(Prod_Name[i]);
                Sales_Bill_Product.Qty = Convert.ToInt32(Qty[i]);
                Sales_Bill_Product.Rate = Convert.ToDouble(Rate[i]);
                Sales_Bill_Product.Amount = Convert.ToDouble(Amount[i]);
                Sales_Bill_Product.Scheme = Convert.ToDouble(Free[i]);
                Sales_Bill_Product.Discount = Convert.ToDouble(Discount[i]);

                database.DB_Sales_Bill_Product.Add(Sales_Bill_Product);

                try
                {
                    database.SaveChanges();
                }

                catch (Exception e)
                {
                    Console.WriteLine(e);
                }


            }
            return RedirectToAction("Add_Bill", "Sales");

        }









    }
}