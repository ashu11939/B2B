using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Integrated_B2B.Models;
using System.Data.Entity.Core.Objects;
using System.Net;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;

namespace Integrated_B2B.Controllers
{
    public class CollectionController : Controller
    {
        // GET: Collection
        BusiCloudEntities database = new BusiCloudEntities();
        public ActionResult Collection()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Collection_Submit()
        {
            var CustomerID = Request.Form["Customer"];
            var Amount = Request.Form["Amount"];
            var SalesmanID = Request.Form["Salesman"];
            var Latitude = Request.Form["Latitude"];
            var Longitude = Request.Form["Longitude"];
            DateTime indianTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.UtcNow, "India Standard Time");

            //To Store the details in DB_Collection.
            DB_Collection Collection_New = new DB_Collection();

            Collection_New.Customer_Id = Convert.ToInt32(CustomerID);
            Collection_New.Salesman_Id = Convert.ToInt32(SalesmanID);
            Collection_New.Amount = Convert.ToInt32(Amount);
            Collection_New.DateTime = indianTime;
            Collection_New.Latitude = Convert.ToDouble(Latitude);
            Collection_New.Longitude = Convert.ToDouble(Longitude);

            database.DB_Collection.Add(Collection_New);
            //database.SaveChanges(); save changes when all the changes are done.

            //TODO : Update the Customer Log i.e Update the customer table. -- Done in Sales Controller

            var Customer_ID = Convert.ToInt32(CustomerID);
            DB_Customer Customer = new DB_Customer();
            Customer =
                (from a in database.DB_Customer
                 where a.Customer_Id == Customer_ID
                 select a).FirstOrDefault();

            //Cash_log += Deposit - Total_Amount;
            if (Customer.Cash_Log == null) Customer.Cash_Log = 0; //For 1st entry corner case
            Customer.Cash_Log = Customer.Cash_Log + Convert.ToDouble(Amount);
            
            //TODO : Update the salesman record. Rethink the design

            try
            {
                database.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            TempData["DataUrl"] = "data-url=" + Url.Content("~") + "Collection/Collection";
            return RedirectToAction("Collection", "Collection");
        }


        // Collection Display at Office

        public ActionResult Collection_Status()
        {
            return View();
        }

        public JsonResult Collection_Status_Data(DateTime? d1)
        {

            List<DB_Collection> Collection = new List<DB_Collection>();
            if (d1 == null) { d1 = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.UtcNow, "India Standard Time"); }
            
            Collection =
                (from a in database.DB_Collection
                 where EntityFunctions.TruncateTime(a.DateTime) == EntityFunctions.TruncateTime(d1)
                 select a
                ).ToList();

            List<Salesman_Collection_Detail> lSalesman_Details = new List<Salesman_Collection_Detail>();
            lSalesman_Details =
                    (from a in database.DB_Collection
                     join b in database.DB_Sales_Man on a.Salesman_Id equals b.id
                     where EntityFunctions.TruncateTime(a.DateTime) == EntityFunctions.TruncateTime(d1) 
                     group a by new 
                     {
                         a.Salesman_Id,
                         b.Name
                        
                     } into grp
                    select new Salesman_Collection_Detail
                     {
                         Count = grp.Count(),
                         id = grp.Key.Salesman_Id,
                         Cash = grp.Sum(item => item.Amount),
                         Name = grp.Key.Name
                     }).ToList();

            return Json(lSalesman_Details, JsonRequestBehavior.AllowGet);

            //TODO : Send Lat Long of every salesman
        }

        //To Return Lat lng for a salesman to track his movement.
        public async Task<JsonResult> Collection_Status_LatLng(int l1, DateTime d1)
        {

            List<Salesman_Track> lSalesman_Track = new List<Salesman_Track>();
            lSalesman_Track =
                (from a in database.DB_Collection
                 where EntityFunctions.TruncateTime(a.DateTime) == EntityFunctions.TruncateTime(d1) && a.Salesman_Id == l1
                 orderby a.DateTime ascending
                 select new Salesman_Track
                 {
                     Latitude = a.Latitude,
                     Longitude = a.Longitude,
                 }).ToList();

            for (int i = 0; i < lSalesman_Track.Count(); i++)
            {                  
                WebClient wc = new WebClient();
                var address = await wc.DownloadStringTaskAsync("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lSalesman_Track[i].Latitude + "," + lSalesman_Track[i].Longitude + "&key=AIzaSyAUBcGVV27xWLqai6F0qZ4MnBjyePaXho0");
                GoogleGeoCodeResponse test = JsonConvert.DeserializeObject<GoogleGeoCodeResponse>(address);
                lSalesman_Track[i].Address = test.results[0].formatted_address;
                //Parent result = JsonConvert.DeserializeObject<Parent>(udanveh);
            }

            return Json(lSalesman_Track, JsonRequestBehavior.AllowGet);
        }

        //To Return Customer and amount for a particular Salesman

        public JsonResult Collection_Details(int l1, DateTime d1)
        {

            List<Salesman_Customer_Details> lSalesman_Customer_Details = new List<Salesman_Customer_Details>();
            lSalesman_Customer_Details =
                (from a in database.DB_Collection
                 join b in database.DB_Customer on a.Customer_Id equals b.Customer_Id
                 where EntityFunctions.TruncateTime(a.DateTime) == EntityFunctions.TruncateTime(d1) && a.Salesman_Id == l1
                 orderby a.DateTime ascending
                 select new Salesman_Customer_Details
                 {
                     Customer_name = b.Customer_Name,
                     Amount = a.Amount
                 }).ToList();

            return Json(lSalesman_Customer_Details, JsonRequestBehavior.AllowGet);
        }












    }
}