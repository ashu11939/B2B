using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Integrated_B2B.Models;


namespace Integrated_B2B.Controllers
{
    public class PurchaseController : Controller
    {
        // GET: Purchase

        BusiCloudEntities database = new BusiCloudEntities();
        public ActionResult Index()
        {
            return View();
        }


        //PURCHASE_ADD
        public ActionResult Add_Purchase()
        {
            //ViewBag.CompanyList = new SelectList(database.DB_Company.ToList(), "cid", "Company_Name");

            return View();
        }

        //PURCHASE_ADD
        public JsonResult Product_List()
        {
            List<Product_List> lProduct_List = new List<Product_List>();

            lProduct_List =
                (from a in database.DB_Product
                 select new Product_List
                 {
                     Prod_Id = a.Prod_Id,
                     cid = a.cid,
                     Product_Name = a.Product_Name,
                     Category_Name = a.Category_Name,
                     MRP = a.MRP,
                     Remarks = a.Remarks,
                     Active = a.Active,
                     Expiry_Date_Months = a.Expiry_Date_Months
                 }).ToList();

            return Json(lProduct_List, JsonRequestBehavior.AllowGet);

        }

        //PURCHASE_ADD
        //Submit the Product Entries in ADD_PURCHASE
        public ActionResult Purchase_Submit()
        {
            //Get data from Purchase table directly via form submit.
   
            string[] Prod_Name = Request.Form["txtProd_Name"].Split(',');
            string[] Qty = Request.Form["txtQty"].Split(',');
            string[] Free = Request.Form["txtFree"].Split(',');
            string[] Discount = Request.Form["txtDiscount"].Split(',');
            string[] Rate = Request.Form["txtRate"].Split(',');
            string[] VAT = Request.Form["txtVAT"].Split(',');
            string[] Amount = Request.Form["txtAmount"].Split(',');
            string[] Total_Amount = Request.Form["txtTotal_Amount"].Split(',');
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

                query.Stock_Total_Incoming += Convert.ToInt32(Qty[i]);
                query.Stock_Live = query.Stock_Total_Incoming - query.Stock_Total_Outgoing;
                
                try{
                    database.SaveChanges();
                }

                catch(Exception e)
                {
                    Console.WriteLine(e);
                }

            }

            //Create a random No for Invoice ID.
            DateTime indianTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.UtcNow, "India Standard Time");
            string date = Convert.ToString(indianTime);

            Random rnd = new Random();
            int crn = rnd.Next(100000, 999999); // creates a number between 1 and 12
            string crn1 = Convert.ToString(crn);

            string crn_final = "INVOICE_" + crn1;
                
            //DB_Invoice.
            DB_Invoice Invoice = new DB_Invoice();

            Invoice.Invoice_Id = crn_final;
            Invoice.cid = Convert.ToInt32(cid[0]);
            Invoice.DateOfPurchase = DateTime.Now;
            Invoice.Grand_Total = Convert.ToDouble(Total_Amount[Total_Amount.Length - 1]);
            Invoice.Vat = Convert.ToDouble(VAT[0]);

            database.DB_Invoice.Add(Invoice);

            //DB_Invoice_Product Insertion            
            for (int i = 0; i < Prod_Name.Length; i++)
            {
                DB_Invoice_Product Invoice_Product = new DB_Invoice_Product();
                
                Invoice_Product.Invoice_Id = crn_final;
                Invoice_Product.Prod_Id = Convert.ToInt32(Prod_Name[i]);
                Invoice_Product.Quantity = Convert.ToInt32(Qty[i]);
                Invoice_Product.Rate = Convert.ToDouble(Rate[i]);
                Invoice_Product.Amount = Convert.ToDouble(Amount[i]);

                database.DB_Invoice_Product.Add(Invoice_Product);

                try
                {
                    database.SaveChanges();
                }

                catch (Exception e)
                {
                    Console.WriteLine(e);
                }


            }
            return RedirectToAction("Add_Purchase", "Purchase");

        }

        //After submit of Modified Purchased Data - Purchase/Modify_Purchase -> Submit.
        public ActionResult Purchase_Modify_Submit()
        {
            //Get data from Modify Table.
            string[] Prod_Id = Request.Form["txtProd_Id"].Split(',');
            string[] Invoice_Id = Request.Form["txtInvoice_Id"].Split(',');
            string[] Qty = Request.Form["txtQty"].Split(',');
            string[] Free = Request.Form["txtFree"].Split(',');
            string[] Discount = Request.Form["txtDiscount"].Split(',');
            string[] Rate = Request.Form["txtRate"].Split(',');
            string[] Amount = Request.Form["txtAmount"].Split(',');
            string[] Total_Amount = Request.Form["txtTotal_Amount"].Split(',');
            //string[] cid = Request.Form["txtcid"].Split(',');

            //Update the Invoice Table first.
            //DB_Invoice
            var Invoice = Invoice_Id[0];
            var query = (from a in database.DB_Invoice
                         where a.Invoice_Id == Invoice
                         select a).FirstOrDefault();
            var length = Total_Amount.Length;
            query.Grand_Total = Convert.ToDouble(Total_Amount[length - 1]);
            //TODO: Also Change here Date of Modification. - Last Modified.
            try
            {
                database.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            //DB_Invoice_Product
            //Now Update Invoice_Product.
            for (int i = 0; i < Prod_Id.Length; i++)
            {
                var Prod_ID = Convert.ToInt32(Prod_Id[i]);
                var query1 = (from a in database.DB_Invoice_Product
                              where a.Prod_Id == Prod_ID && a.Invoice_Id == Invoice
                              select a).FirstOrDefault();
                if (query1 == null)
                {
                    // ADD this product.
                    //DB_Product_Log
                    var query2 =
                    (from a in database.DB_Product_Log
                     where a.Prod_Id == Prod_ID
                     select a).FirstOrDefault();
                    //Add a condition if the product does not exist in DB_Product_log

                    //If MRP of product changes then the required changes to change product.

                    query2.Stock_Total_Incoming += Convert.ToInt32(Qty[i]);
                    query2.Stock_Live = query2.Stock_Total_Incoming - query2.Stock_Total_Outgoing;

                    //Add in DB_Invoice_Product
                    DB_Invoice_Product Invoice_Product = new DB_Invoice_Product();

                    Invoice_Product.Invoice_Id = Invoice_Id[0];
                    Invoice_Product.Prod_Id = Convert.ToInt32(Prod_Id[i]);
                    Invoice_Product.Quantity = Convert.ToInt32(Qty[i]);
                    Invoice_Product.Rate = Convert.ToDouble(Rate[i]);
                    Invoice_Product.Amount = Convert.ToDouble(Amount[i]);

                    database.DB_Invoice_Product.Add(Invoice_Product);

                    try
                    {
                        database.SaveChanges();
                    }

                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                    }


                }
                else
                {
                    
                    //Now change the corresponding entry in Product_Log Table.
                    //DB_Product_Log
                    var query2 = (from a in database.DB_Product_Log
                                  where a.Prod_Id == Prod_ID
                                  select a).First();
                    query2.Stock_Live += (query1.Quantity - Convert.ToInt32(Qty[i]));
                    query2.Stock_Total_Incoming += (query1.Quantity - Convert.ToInt32(Qty[i]));

                    //DB_Invoice_Product
                    //Update this product.
                    query1.Quantity = Convert.ToInt32(Qty[i]);
                    //TODO: Add Free
                    //TODO: Add Discount
                    query1.Rate = Convert.ToDouble(Rate[i]);
                    query1.Amount = Convert.ToDouble(Amount[i]);

                    try
                    {
                        database.SaveChanges();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                    }

                }



            }

            //Product_Log
            return RedirectToAction("Modify_Purchase", "Purchase");
        }

        //TODO: Delete Invoice Product From Database where Invoice ID and Product ID is POST. @reminder: 2 days
        

        //PURCHASE MODIFY

        public ActionResult Modify_Purchase()
        {

            return View();
        }

        public JsonResult Invoice_List()
        {

            List<Invoice_List> LInvoice_List = new List<Invoice_List>();

            LInvoice_List =
                (from a in database.DB_Invoice
                 orderby a.DateOfPurchase descending
                 select new Invoice_List
                 {
                     Invoice_Id = a.Invoice_Id,
                     DateOfPurchase = a.DateOfPurchase,
                     Grand_Total = a.Grand_Total
                 }).ToList();

            return Json(LInvoice_List, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Modify_Invoice(string Invoice_Id)
        {
            
            List<Modify_Purchase_List> LModify_Purchase_List = new List<Modify_Purchase_List>();

            LModify_Purchase_List = 
                (from a in database.DB_Invoice_Product
                 join b in database.DB_Product on a.Prod_Id equals b.Prod_Id
                 where a.Invoice_Id == Invoice_Id
                 select new Modify_Purchase_List{
                     Prod_Id = a.Prod_Id,
                     Product_Name = b.Product_Name,
                     Quantity = a.Quantity,
                     Rate = a.Rate,
                     Amount = a.Amount
                        //Include Free and discount field in the table.                      
                 }).ToList();


            return Json(LModify_Purchase_List, JsonRequestBehavior.AllowGet);
        }

        //TODO : On Submiting the Modify button after modifying.
        
        
        //PURCHASE RETURN 

        public ActionResult Purchase_Return()
        {

            return View();
        }

        //Purchase Return Submit.
        //Deduce the products from database.

        public ActionResult Purchase_Return_Submit()
        {
            //Get data from Purchase table directly via form submit.

            string[] Prod_Name = Request.Form["txtProd_Name"].Split(',');
            string[] Qty = Request.Form["txtQty"].Split(',');
            string[] Free = Request.Form["txtFree"].Split(',');
            string[] Discount = Request.Form["txtDiscount"].Split(',');
            string[] Rate = Request.Form["txtRate"].Split(',');
            string[] VAT = Request.Form["txtVAT"].Split(',');
            string[] Amount = Request.Form["txtAmount"].Split(',');
            string[] Total_Amount = Request.Form["txtTotal_Amount"].Split(',');
            string[] cid = Request.Form["txtcid"].Split(',');

            //Update the corresponding rows appending quatity in Product_Log.
            //DB_Product_Log
            for (int i = 0; i < Prod_Name.Length; i++)
            {

                int ID = Convert.ToInt32(Prod_Name[i]);

                var query =
                    (from a in database.DB_Product_Log
                     where a.Prod_Id == ID
                     select a).First();

                //If MRP of product changes then the required changes to change product.

                var stock = query.Stock_Total_Incoming - Convert.ToInt32(Qty[i]);//Total Product bought till date - return from customer
                if (stock >= 0)// TO CHECK THAT THE STOCK IS ALWAYS POSITIVE
                {

                    query.Stock_Total_Incoming -= Convert.ToInt32(Qty[i]);
                    query.Stock_Live = query.Stock_Total_Incoming - query.Stock_Total_Outgoing;

                    try
                    {
                        database.SaveChanges();
                    }

                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                    }
                }
                else
                {
                    TempData["Message"] = "The returning stock is more than your current stock status : " + Convert.ToString(query.Stock_Live);
                    return RedirectToAction("Purchase_Return", "Purchase");

                }
            }
            
            return RedirectToAction("Purchase_Return", "Purchase");

        }

    }
}
