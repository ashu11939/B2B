using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Integrated_B2B.Models;
using System.Data.Entity.Core.Objects;

namespace Integrated_B2B.Controllers
{
    public class AnalyticsController : Controller
    {
        // GET: Analytics
        BusiCloudEntities database = new BusiCloudEntities();
        public ActionResult Sales_Analysis()
        {
            return View();
        }

        DateTime indianTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.UtcNow, "India Standard Time");
        public JsonResult Sales_Live_Data()
        {
            
            var db_data =
                (from a in database.DB_Sales_Bill
                 where EntityFunctions.TruncateTime(a.DateTime) == EntityFunctions.TruncateTime(indianTime)
                 select a
                ).ToList();

            Live_Data_Class Live_Data = new Live_Data_Class();
            Live_Data.Total_Amount = 0;
            Live_Data.Advance = 0;
            Live_Data.Dues = 0;
            for (int i = 0; i < db_data.Count(); i++)
            {
                Live_Data.Total_Amount = Live_Data.Total_Amount + db_data[i].Total_Amount;
                Live_Data.Advance = Live_Data.Advance + Convert.ToDouble(db_data[i].Advance);
                Live_Data.Dues = Live_Data.Dues + db_data[i].Dues;

            }



            return Json(Live_Data, JsonRequestBehavior.AllowGet);
        }



    }
}