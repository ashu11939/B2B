$(document).ready(function () {

   
    // To view Invoice List
    $.ajax({
        url: '/Purchase/Invoice_List',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (list) {

            for (var i = 0; i < list.length; i++) {

                var date = new Date(parseInt(list[i].DateOfPurchase.substr(6)));
                var date1 = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                //getMonth function returns values from 0-11 so add 1 to compensate.
                var divID = "ID" + list[i].Invoice_Id;
                var trID = "TR" + list[i].Invoice_Id;
                var str = "";
                str += "<tr>";
                str += "<td>" + list[i].Invoice_Id + "<input type='text' name='txtInvoice_Id' value='" + list[i].Invoice_Id + "' style='display:none' /></td>";
                str += "<td class=" + "hidden-phone" + ">" + date1 + "</td>";
                str += "<td class=" + "hidden-phone" + ">" + date1 + "</td>";
                str += "<td class=" + "hidden-phone" + ">" + list[i].Grand_Total + "</td>";
                str += "<td>" + "<button id=" + list[i].Invoice_Id + ' class="modify_button btn btn-primary"><i class="icon-refresh"></i><a href="#myModal" data-toggle="modal" class="btn btn-xs btn-primary">Modify </a>' + "</button></td>";
                str += "</tr>";
                //str += "<tr id=" + trID + "><td id=" + divID + ">" + "<div></div></td></tr>";

                $('#Invoice_Table').append(str);
                
                //On Modify Click 

                $('.modify_button').unbind().click(function () {

                    $("#Modify_Invoice_Product").empty();
                    $('#Total_Amount').empty();
                    //$(this).parent().parent().next("tr").toggle('fast');
                    var Invoice_Id = $(this).attr("id");

                    $.ajax({
                        url: '/Purchase/Modify_Invoice',
                        data: '{"Invoice_Id":"' + Invoice_Id + '"}',
                        type: 'POST',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: true,
                        cache: false,
                        success: function (list1) {

                            var Total_Amount = 0;
                            for (var j = 0; j < list1.length; j++) {
                                debugger;
                                Total_Amount += list1[j].Amount;
                                var str1 = "<tr>";
                                str1 += "<td>" + list1[j].Product_Name + "<input type='hidden' class='sam' name='txtProd_Id' value='" + list1[j].Prod_Id + "' style='display:none' /></td>";
                                str1 += "<td>" + list1[j].Quantity + "<input type='hidden' name='txtQty' value='" + list1[j].Quantity + "' style='display:none' /></td>";
                                str1 += "<td class=" + "hidden-phone" + ">" + list1[j].Rate + "<input type='hidden' name='txtFree' value='" + list1[j].Rate + "' style='display:none' /></td>";
                                str1 += "<td class=" + "hidden-phone" + ">" + list1[j].Rate + "<input type='hidden' name='txtRate' value='" + list1[j].Rate + "' style='display:none' /></td>";
                                str1 += "<td class=" + "hidden-phone" + ">" + list1[j].Rate + "<input type='hidden' name='txtDiscount' value='" + list1[j].Rate + "' style='display:none' /></td>";
                                str1 += "<td>" + list1[j].Amount + "<input type='hidden' name='txtAmount' value='" + list1[j].Amount + "' style='display:none' /></td>";
                                str1 += '<td> <button id="save" class="btn btn-success btn-xs" onclick="return false"><i class="icon-ok"></i></button> <button id="modify" class="btn btn-primary btn-xs" onclick="return false"><i class="icon-pencil"></i></button> <button class="delete1 btn btn-danger btn-xs"><i class="icon-trash "></i></button> </td></tr>'
                                str1 += "<input type='hidden' name='txtInvoice_Id' value='" + Invoice_Id + "' style='display:none' />";
                                str1 += "<input type='hidden' name='txtTotal_Amount' value='" + Total_Amount + "' style='display:none' />";
                                str1 += "</tr>";

                                $("#Modify_Invoice_Product").append(str1);

                            }
                            $('#Total_Amount').html(Total_Amount);

                        }

                    });

                });

            }
        }

    });

    
});