$(document).ready(function () {

    var Customer_Id = 185;
    $.ajax({
        url: '/Customer/Customer_Personal_Details',
        data: '{"c1":"' + Customer_Id + '"}',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (list) {

            $('#Customer_Name').html(list.CustomerName);
            $('#Customer_Type').append("<td>" + list.EmailId + "</td>");
            $('#Address').append("<td>" + list.Billing_Address + "</td>");
            $('#Contact').append("<td>" + list.Customer_Details[0].Number + "</td>");

            var d1 = list.Customer_Details[0].CreatedOnString.split(' ');
            var date1 = d1[0].split('/');
            var date2 = date1[1] + "/" + date1[0] + "/" + date1[2];


            $('#Family').append("<td>" + date2 + "</td>");

            if (list.CRN_Complete_OrderProof == null) {

                $('#Track').empty();
                debugger;

                $('#POD_table_body').empty();
                for (var i = 0; i < list.Complete_OrderProof.length; i++) {
                    var date2 = null;
                    if (list.Complete_OrderProof[i].OrderAssignedDatetime != null) {

                        var d = list.Complete_OrderProof[i].OrderAssignedDatetimeString.split(' ');
                        var date = d[0].split('/');
                        date2 = date[1] + "/" + date[0] + "/" + date[2];
                    }
                    var str = "<tr class=" + "trigger" + "><td>" + date2 + "</td>";
                    str += "<td" + " style=" + "font-size:smaller;" + " >" + list.Complete_OrderProof[i].FromPlace + "</td>";
                    str += "<td" + " style=" + "font-size:smaller;" + " >" + list.Complete_OrderProof[i].ToPlace + "</td>";
                    str += "<td>" + list.Complete_OrderProof[i].VanType + "</td>";
                    str += "<td>" + list.Complete_OrderProof[i].OrderAmount + "</td></tr>"; //Display basic details.

                    var src_pick_UP = "http://spotmobapi.logisureindia.com/Upload/";
                    var src_destination = "http://spotmobapi.logisureindia.com/Upload/";
                    var distance = 0.0;
                    var quantity = 0;
                    var ActualPickUp = "";
                    var ActualDelivery = "";
                    var ActualPickUpTime, ActualDeliveryTime;

                    var TimeTookForOrderCompletion = list.Complete_OrderProof[i].TimeTookForOrderCompletion;
                    if (TimeTookForOrderCompletion == null) TimeTookForOrderCompletion = "In Process";

                    for (var j = 0; j < list.Complete_OrderProofDetails[i].length; j++) {

                        distance += parseFloat(list.Complete_OrderProofDetails[i][j].DistanceTravelled);
                        //if (list.Complete_OrderProofDetails[i][j].EventType == "P")
                        //{
                        //    src_pick_UP += list.Complete_OrderProofDetails[i][j].PhotoUrl;
                        //    quantity = list.Complete_OrderProofDetails[i][j].Quantity;
                        //    ActualPickUp = list.Complete_OrderProofDetails[i][j].GPSAddress;

                        //    var d1 = list.Complete_OrderProofDetails[i][j].GPSDatetimeString.split(' ');
                        //    ActualPickUpTime = d1[1] + " " + d1[2];

                        //}
                        //if (list.Complete_OrderProofDetails[i][j].EventType == "D")
                        //{
                        //    src_destination += list.Complete_OrderProofDetails[i][j].PhotoUrl;
                        //    ActualDelivery = list.Complete_OrderProofDetails[i][j].GPSAddress;

                        //    var d1 = list.Complete_OrderProofDetails[i][j].GPSDatetimeString.split(' ');
                        //    ActualDeliveryTime = d1[1] + " " + d1[2];

                        //}
                    }

                    distance = distance.toPrecision(4);
                    //var ActualPickUp_New = ActualPickUp.split(',');
                    //ActualPickUp = ActualPickUp_New[0] + ActualPickUp_New[1] + ActualPickUp_New[2]
                    //var ActualDelivery_New = ActualDelivery.split(',');
                    //ActualDelivery = ActualDelivery_New[0] + ActualDelivery_New[1] + ActualDelivery_New[2];

                    //Display on slide down
                    //str += '<tr class="details_row"> <td colspan="5"> <div> <div class="row"> <div class="col-lg-5"> <p><strong> CRN No : ' + list.Complete_OrderProof[i].CRNNo + '</strong></p></div><div class="col-lg-4"> <p><strong> Vehicle No : ' + list.Complete_OrderProof[i].Vehicle + ' </strong></p></div><div class="col-lg-2"> <p><strong> No Of Champs : ' + list.Complete_OrderProof[i].NoOfChamps + ' </strong></p></div></div> <div class="row"> <div class="col-lg-5"> <p><strong> Actual PickUp : ' + ActualPickUpTime + ' <br> ' +  ActualPickUp + '</strong></p></div><div class="col-lg-5"> <p><strong> Actual Delivery : ' + ActualDeliveryTime + ' <br> ' +  ActualDelivery + '</strong></p></div></div> <div class="row"> <div class="col-lg-3" > <img src="' + src_pick_UP + '" style="width:220px;height:250px;box-shadow:2px 2px 10px;background-color:rgb(228, 222, 222);padding:5px;"/> </div><div class="col-lg-3"> <img src="' + src_destination + '" style="width:220px;height:250px;box-shadow:2px 2px 10px;background-color:rgb(228, 222, 222);padding:5px;"/> </div><div class="col-lg-3"> <img src="' + list.Complete_OrderProof[i].RouteImage + '" style="width:220px;height:250px;box-shadow:2px 2px 10px;background-color:rgb(228, 222, 222);padding:5px;"/> </div><div class="col-lg-3"> <p><strong> Time Taken : ' + TimeTookForOrderCompletion + ' </strong></p></div><div class="col-lg-2"> <p><strong> Quantity : ' + quantity + ' </strong></p></div><div class="col-lg-2"> <p><strong> Distance : ' + distance + ' </strong></p></div> </div></div></tr>';

                    //$('#POD_table_body').append(str);


                    str += ' <tr class="details_row"> <td colspan="5"> <div> <div class="row" id="row1"> <div class="col-lg-3"> <p><strong> CRN No :' + list.Complete_OrderProof[i].CRNNo + '</strong></p></div><div class="col-lg-3"> <p><strong> Vehicle No : ' + list.Complete_OrderProof[i].Vehicle + ' </strong></p></div><div class="col-lg-2"> <p><strong> No Of Champs : ' + list.Complete_OrderProof[i].NoOfChamps + ' </strong></p></div> <div class="col-lg-2"> <p><strong> Approx Weight : ' + list.Complete_OrderProof[i].ApproxWeight + ' </strong></p></div> <div class="col-lg-2"> <p><strong> Distance : ' + distance + ' </strong></p></div> </div> </div> </div></tr><br>';

                    //str += '<tr class="details_row"> <td colspan="5"> <div> <div class="row"> <div class="col-lg-5"> <p><strong> CRN No : ' + list.CRN_Complete_OrderProof[0].CRNNo + '</strong></p></div><div class="col-lg-4"> <p><strong> Vehicle No : ' + list.CRN_Complete_OrderProof[0].Vehicle + ' </strong></p></div><div class="col-lg-2"> <p><strong> No Of Champs : ' + list.CRN_Complete_OrderProof[0].NoOfChamps + ' </strong></p></div></div><div class="row"> <div class="col-lg-5"> <p><strong> Actual PickUp : ' + ActualPickUpTime + ' <br> ' + ActualPickUp + '</strong></p></div><div class="col-lg-5"> <p><strong> Actual Delivery : ' + ActualDeliveryTime + ' <br> ' + ActualDelivery + '</strong></p></div></div><div class="row"> <div class="col-lg-3"> <img src="' + src_pick_UP + '" style="width:220px;height:250px;box-shadow:2px 2px 10px;background-color:rgb(228, 222, 222);padding:5px;"/> </div><div class="col-lg-3"> <img src="' + src_destination + '" style="width:220px;height:250px;box-shadow:2px 2px 10px;background-color:rgb(228, 222, 222);padding:5px;"/> </div><div class="col-lg-3"> <img src="' + list.CRN_Complete_OrderProof[0].RouteImage + '" style="width:220px;height:250px;box-shadow:2px 2px 10px;background-color:rgb(228, 222, 222);padding:5px;"/> </div><div class="col-lg-3"> <p><strong> Time Taken : ' + TimeTookForOrderCompletion + ' </strong></p></div><div class="col-lg-2"> <p><strong> Quantity : ' + quantity + ' </strong></p></div><div class="col-lg-2"> <p><strong> Distance : ' + distance + ' </strong></p></div></div></tr>';

                    $('#POD_table_body').append(str);

                    for (var j = 0; j < list.Complete_OrderProofDetails[i].length; j++) {
                        str = "";
                        if (list.Complete_OrderProofDetails[i][j].EventType == "P") {

                            src_pick_UP += list.Complete_OrderProofDetails[i][j].PhotoUrl;
                            quantity = list.Complete_OrderProofDetails[i][j].Quantity;
                            //Time 
                            var d1 = list.Complete_OrderProofDetails[i][j].GPSDatetimeString.split(' ');
                            ActualPickUpTime = d1[1] + " " + d1[2];
                            //Location
                            ActualPickUp = list.Complete_OrderProofDetails[i][j].GPSAddress;
                            var ActualPickUp_New = ActualPickUp.split(',');
                            ActualPickUp = ActualPickUp_New[0] + ActualPickUp_New[1] + ActualPickUp_New[2];


                            str += '<br /><div class="row"> <div class="col-lg-8"> <div class="col-lg-6"> <img src="' + src_pick_UP + '" style="width:220px;height:250px;box-shadow:2px 2px 10px;background-color:rgb(228, 222, 222);padding:5px;"> </div><div class="col-lg-6" style=" padding-top: 25px;"> <p><strong>Event Type : Pick Up <br><br>Time : ' + ActualPickUpTime + ' <br><br>Quantity : ' + quantity + '<br><br>Location : ' + ActualPickUp + '</strong></p></div></div><div class="col-lg-5"></div></div> ';

                            $('#row1').append(str);



                        }
                        if (list.Complete_OrderProofDetails[i][j].EventType == "D") {


                            src_destination += list.Complete_OrderProofDetails[i][j].PhotoUrl;
                            quantity = list.Complete_OrderProofDetails[i][j].Quantity;
                            //Time
                            var d1 = list.Complete_OrderProofDetails[i][j].GPSDatetimeString.split(' ');
                            ActualDeliveryTime = d1[1] + " " + d1[2];
                            //Location
                            ActualDelivery = list.Complete_OrderProofDetails[i][j].GPSAddress;
                            var ActualDelivery_New = ActualDelivery.split(',');
                            ActualDelivery = ActualDelivery_New[0] + ActualDelivery_New[1] + ActualDelivery_New[2];


                            str += ' <br /><div class="row"> <div class="col-lg-8"> <div class="col-lg-6"> <img src="' + src_destination + '" style="width:220px;height:250px;box-shadow:2px 2px 10px;background-color:rgb(228, 222, 222);padding:5px;"> </div><div class="col-lg-6" style=" padding-top: 25px;"> <p><strong>Event Type : Delivery <br><br>Time : ' + ActualDeliveryTime + ' <br><br>Quantity : ' + quantity + '<br><br>Location : ' + ActualDelivery + '</strong></p></div></div><div class="col-lg-5"></div></div>';

                            $('#row1').append(str);

                        }
                    }







                }
            }
            else {
                debugger;
                $('#POD_table_body').empty();
                $('#logout').empty();

                var last = list.CRN_Complete_OrderProofDetails.length - 1;

                var progress = "0%";
                var progress_truck = "0%";
                var status = list.CRN_Complete_OrderProofDetails[last].EventType;

                if (status == "A") { progress = "15%"; progress_truck = "15%"; }
                else if (status == "RAtP") { progress = "30%"; progress_truck = "27%"; }
                else if (status == "P") { progress = "45%"; progress_truck = "40%"; }
                else if (status == "RAtD") { progress = "65%"; progress_truck = "58%"; }
                else if (status == "D") { progress = "80%"; progress_truck = "66%"; }
                else if (status == "C") { progress = "100%"; progress_truck = "83%"; }

                $(document).ready(function () {

                    $('#truck').animate({ left: progress_truck }, 4500, "swing");
                    $('#progress_bar').animate({ width: progress }, 1000, "swing");
                    $('#' + status).css("color", "rgb(255, 237, 79)");
                    $('#' + status).css("text-transform", "Uppercase");
                    $('#' + status).css("text-shadow", "rgb(176, 167, 167)");

                });


                var date2 = null;
                if (list.CRN_Complete_OrderProof[0].OrderAssignedDatetime != null) {

                    var d = list.CRN_Complete_OrderProof[0].OrderAssignedDatetimeString.split(' ');
                    var date1 = d[0].split('/');
                    date2 = date1[1] + "/" + date1[0] + "/" + date1[2];

                }
                var str = "<tr class=" + "trigger" + "><td>" + date2 + "</td>";
                str += "<td" + " style=" + "font-size:smaller;" + " >" + list.CRN_Complete_OrderProof[0].FromPlace + "</td>";
                str += "<td" + " style=" + "font-size:smaller;" + " >" + list.CRN_Complete_OrderProof[0].ToPlace + "</td>";
                str += "<td>" + list.CRN_Complete_OrderProof[0].VanType + "</td>";
                str += "<td>" + list.CRN_Complete_OrderProof[0].OrderAmount + "</td></tr>"; //Display basic details.

                var src_pick_UP = "http://spotmobapi.logisureindia.com/Upload/";
                var src_destination = "http://spotmobapi.logisureindia.com/Upload/";
                var distance = 0.0;
                var quantity = 0;
                var TimeTookForOrderCompletion = list.CRN_Complete_OrderProof[0].TimeTookForOrderCompletion;
                if (TimeTookForOrderCompletion == null) TimeTookForOrderCompletion = "In Process";
                var ActualPickUp = "";
                var ActualDelivery = "";
                var ActualPickUpTime, ActualDeliveryTime;


                for (var j = 0; j < list.CRN_Complete_OrderProofDetails.length; j++) {

                    distance += parseFloat(list.CRN_Complete_OrderProofDetails[j].DistanceTravelled);
                    //if (list.CRN_Complete_OrderProofDetails[j].EventType == "P")
                    //{
                    //    //src_pick_UP += list.CRN_Complete_OrderProofDetails[j].PhotoUrl;
                    //    quantity = list.CRN_Complete_OrderProofDetails[j].Quantity;
                    //    ActualPickUp = list.CRN_Complete_OrderProofDetails[j].GPSAddress;


                    //    var d1 = list.CRN_Complete_OrderProofDetails[j].GPSDatetimeString.split(' ');
                    //    ActualPickUpTime = d1[1] + " " + d1[2];
                    //}
                    //if (list.CRN_Complete_OrderProofDetails[j].EventType == "D")
                    //{
                    //    //src_destination += list.CRN_Complete_OrderProofDetails[j].PhotoUrl;
                    //    ActualDelivery = list.CRN_Complete_OrderProofDetails[j].GPSAddress;


                    //    var d1 = list.CRN_Complete_OrderProofDetails[j].GPSDatetimeString.split(' ');
                    //    ActualDeliveryTime = d1[1] + " " + d1[2];

                    //}
                }

                var ActualPickUp_New = ActualPickUp.split(',');
                //ActualPickUp = ActualPickUp_New[0] + ActualPickUp_New[1] + ActualPickUp_New[2];
                //var ActualDelivery_New = ActualDelivery.split(',');
                //ActualDelivery = ActualDelivery_New[0] + ActualDelivery_New[1] + ActualDelivery_New[2];

                //Display on slide down

                distance = distance.toPrecision(4);
                str += ' <tr class="details_row"> <td colspan="5"> <div> <div class="row" id="row1"> <div class="col-lg-3"> <p><strong> CRN No :' + list.CRN_Complete_OrderProof[0].CRNNo + '</strong></p></div><div class="col-lg-3"> <p><strong> Vehicle No : ' + list.CRN_Complete_OrderProof[0].Vehicle + ' </strong></p></div><div class="col-lg-2"> <p><strong> No Of Champs : ' + list.CRN_Complete_OrderProof[0].NoOfChamps + ' </strong></p></div> <div class="col-lg-2"> <p><strong> Approx Weight : ' + list.CRN_Complete_OrderProof[0].ApproxWeight + ' </strong></p></div> <div class="col-lg-2"> <p><strong> Distance : ' + distance + ' </strong></p></div> </div> </div> </div></tr><br>';

                //str += '<tr class="details_row"> <td colspan="5"> <div> <div class="row"> <div class="col-lg-5"> <p><strong> CRN No : ' + list.CRN_Complete_OrderProof[0].CRNNo + '</strong></p></div><div class="col-lg-4"> <p><strong> Vehicle No : ' + list.CRN_Complete_OrderProof[0].Vehicle + ' </strong></p></div><div class="col-lg-2"> <p><strong> No Of Champs : ' + list.CRN_Complete_OrderProof[0].NoOfChamps + ' </strong></p></div></div><div class="row"> <div class="col-lg-5"> <p><strong> Actual PickUp : ' + ActualPickUpTime + ' <br> ' + ActualPickUp + '</strong></p></div><div class="col-lg-5"> <p><strong> Actual Delivery : ' + ActualDeliveryTime + ' <br> ' + ActualDelivery + '</strong></p></div></div><div class="row"> <div class="col-lg-3"> <img src="' + src_pick_UP + '" style="width:220px;height:250px;box-shadow:2px 2px 10px;background-color:rgb(228, 222, 222);padding:5px;"/> </div><div class="col-lg-3"> <img src="' + src_destination + '" style="width:220px;height:250px;box-shadow:2px 2px 10px;background-color:rgb(228, 222, 222);padding:5px;"/> </div><div class="col-lg-3"> <img src="' + list.CRN_Complete_OrderProof[0].RouteImage + '" style="width:220px;height:250px;box-shadow:2px 2px 10px;background-color:rgb(228, 222, 222);padding:5px;"/> </div><div class="col-lg-3"> <p><strong> Time Taken : ' + TimeTookForOrderCompletion + ' </strong></p></div><div class="col-lg-2"> <p><strong> Quantity : ' + quantity + ' </strong></p></div><div class="col-lg-2"> <p><strong> Distance : ' + distance + ' </strong></p></div></div></tr>';

                $('#POD_table_body').append(str);

                for (var j = 0; j < list.CRN_Complete_OrderProofDetails.length; j++) {
                    str = "";
                    if (list.CRN_Complete_OrderProofDetails[j].EventType == "P") {

                        src_pick_UP += list.CRN_Complete_OrderProofDetails[j].PhotoUrl;
                        quantity = list.CRN_Complete_OrderProofDetails[j].Quantity;
                        //Time 
                        var d1 = list.CRN_Complete_OrderProofDetails[j].GPSDatetimeString.split(' ');
                        ActualPickUpTime = d1[1] + " " + d1[2];
                        //Location
                        ActualPickUp = list.CRN_Complete_OrderProofDetails[j].GPSAddress;
                        var ActualPickUp_New = ActualPickUp.split(',');
                        ActualPickUp = ActualPickUp_New[0] + ActualPickUp_New[1] + ActualPickUp_New[2];


                        str += '<br /><div class="row"> <div class="col-lg-8"> <div class="col-lg-6"> <img src="' + src_pick_UP + '" style="width:220px;height:250px;box-shadow:2px 2px 10px;background-color:rgb(228, 222, 222);padding:5px;"> </div><div class="col-lg-6" style=" padding-top: 25px;"> <p><strong>Event Type : Pick Up <br><br>Time : ' + ActualPickUpTime + ' <br><br>Quantity : ' + quantity + '<br><br>Location : ' + ActualPickUp + '</strong></p></div></div><div class="col-lg-5"></div></div> ';

                        $('#row1').append(str);



                    }
                    if (list.CRN_Complete_OrderProofDetails[j].EventType == "D") {


                        src_destination += list.CRN_Complete_OrderProofDetails[j].PhotoUrl;
                        quantity = list.CRN_Complete_OrderProofDetails[j].Quantity;
                        //Time
                        var d1 = list.CRN_Complete_OrderProofDetails[j].GPSDatetimeString.split(' ');
                        ActualDeliveryTime = d1[1] + " " + d1[2];
                        //Location
                        ActualDelivery = list.CRN_Complete_OrderProofDetails[j].GPSAddress;
                        var ActualDelivery_New = ActualDelivery.split(',');
                        ActualDelivery = ActualDelivery_New[0] + ActualDelivery_New[1] + ActualDelivery_New[2];


                        str += ' <br /><div class="row"> <div class="col-lg-8"> <div class="col-lg-6"> <img src="' + src_destination + '" style="width:220px;height:250px;box-shadow:2px 2px 10px;background-color:rgb(228, 222, 222);padding:5px;"> </div><div class="col-lg-6" style=" padding-top: 25px;"> <p><strong>Event Type : Delivery <br><br>Time : ' + ActualDeliveryTime + ' <br><br>Quantity : ' + quantity + '<br><br>Location : ' + ActualDelivery + '</strong></p></div></div><div class="col-lg-5"></div></div>';

                        $('#row1').append(str);

                    }
                }










            }

        }

    });

    $('.details_row').hide();

    $('.trigger').click(function () {
        $(this).next().toggle("slow");
        // also tried this...
        // $(this).parents("table").nextAll(".details").slideToggle();
        return false;
    });














});