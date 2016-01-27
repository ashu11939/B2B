$(document).ready(function () {
    //TODO: add Keyboard shortcuts.
    //Select Customer Details From database.
    $.ajax({
        url: '/Sales/Customer_Details',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (list) {

            for (var i = 0; i < list.length; i++) {
                $('#Customer_Name').append("<option value=" + list[i].Customer_Id + ">" + list[i].Customer_Name + "</option>");
            }
            
            //cid = list[0].cid;
        }
    });
      

    //TO ADD SALES BILL SIMILAR FUNCTION TO PURCHASE

    var cid = 0;
    //To retrieve product list
    $.ajax({
        url: '/Purchase/Product_List',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (list) {

            for (var i = 0; i < list.length; i++) {
                $('#Product_Name').append("<option value=" + list[i].Prod_Id + ">" + list[i].Product_Name + "</option>");
            }
            debugger;
            cid = list[0].cid;
        }
    });

    //To add product after selecting.

    //After Clicking.

    var Total_Amount = 0;

    $('#Add_Product').click(function () {

        debugger;

        var Prod_Name = $('#Product_Name').find('option:selected').text();
        var Qty = $('#Qty').val();
        var Free = $('#Free').val();
        var Discount = $('#Discount').val();
        var Rate = $('#Rate').val();
        var VAT = $('#VAT').val();

        var Amount = Qty * Rate;

        Total_Amount += Amount;
        $('#Total_Amount').val(Total_Amount);

        var str = "";
        str += "<tr>";
        str += "<td>" + Prod_Name + "<input type='text' name='txtProd_Name' value='" + $('#Product_Name').val() + "' style='display:none' /></td>";
        str += "<td>" + Qty + "<input type='text' name='txtQty' value='" + Qty + "' style='display:none' /></td>";
        str += "<td class=" + "hidden-phone" + ">" + Free + "<input type='text' name='txtFree' value='" + Free + "' style='display:none' /></td>";
        str += "<td>" + Rate + "<input type='text' name='txtRate' value='" + Rate + "' style='display:none' /></td>";
        str += "<td class=" + "hidden-phone" + ">" + Discount + "<input type='text' name='txtDiscount' value='" + Discount + "' style='display:none' /></td>";
        str += "<td class=" + "hidden-phone" + ">" + VAT + "<input type='text' name='txtVAT' value='" + VAT + "' style='display:none' /></td>";
        //str += "<input type='hidden' name='txtAmount' value='" + Amount + "' style='display:none' />";
        str += "<input type='hidden' name='txtcid' value='" + cid + "' style='display:none' />";
        str += "<td>" + Amount + "<input type='text' name='txtAmount' value='" + Amount + "' style='display:none' /></td>";
        str += "<td class='ImgRemove' style=" + "cursor:pointer"
            + " onclick=" + "Remove(this)" + "><i class="
            + "icon-remove" + "></i>" + "</td>"
        str += "</tr>";

        $('#Purchase_Table').append(str);

    });

    $('#Cash_Payment').change(function () {

        var Payable = $('#Total_Amount').val();
        var Deposit = $('#Cash_Payment').val();
        if (Payable > Deposit) {
            $('#Dues').val(Payable - Deposit);
            $('#Advance').val(0);
        }
        else {
            $('#Dues').val(0);
            $('#Advance').val(Deposit - Payable);
        }

    })


});













