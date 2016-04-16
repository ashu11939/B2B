using Integrated_B2B.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace Integrated_B2B.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Customer
        BusiCloudEntities database = new BusiCloudEntities();
        //Customer Profile View
        public ActionResult Customer_Profile()
        {
            return View();
        }
        //Customer Personal Details
        public JsonResult Customer_Personal_Details(int c1)
        {
            DB_Customer Customer = new DB_Customer();
            Customer =
                (from a in database.DB_Customer
                 where a.Customer_Id == c1
                 select a).FirstOrDefault();
            return Json(Customer, JsonRequestBehavior.AllowGet);
        }

        //Customer Billing Details to be viewed in table
        public JsonResult Customer_All_Billing_Details(int c1)
        {
            List<Customer_Billing_Details> lCustomer_Billing_Details = new List<Customer_Billing_Details>();
            lCustomer_Billing_Details =
                (from a in database.DB_Sales_Bill
                 where a.Customer_Id == c1
                 orderby a.DateTime descending
                 select new Customer_Billing_Details
                 {
                     Bill_No = a.Bill_No,
                     DateTime = a.DateTime,
                     Total_Amount = a.Total_Amount,
                     Deposit = a.Deposit
                 }).ToList();

            return Json(lCustomer_Billing_Details, JsonRequestBehavior.AllowGet);
        }

        //Customer per bill description to be viewed in MODAL same as Modify bill except for modify option
        public JsonResult Customer_Bill_Details(string Bill_No)
        {

            List<Modify_Sales_Bill_List> lModify_Sales_Bill_List = new List<Modify_Sales_Bill_List>();

            lModify_Sales_Bill_List =
                (from a in database.DB_Sales_Bill_Product
                 join b in database.DB_Product on a.Prod_Id equals b.Prod_Id
                 where a.Bill_No == Bill_No
                 select new Modify_Sales_Bill_List
                 {
                     Prod_Id = a.Prod_Id,
                     Product_Name = b.Product_Name,
                     Quantity = a.Qty,
                     Rate = a.Rate,
                     Amount = a.Amount
                     //Include Free and discount field in the table.                      
                 }).ToList();

            return Json(lModify_Sales_Bill_List, JsonRequestBehavior.AllowGet);
        }



    }
}