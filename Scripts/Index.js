$(document).ready(function (){

    $('#SelectCompany').change(function () {
        
        //This should be added on load to the add_purchase page.
        //The page would send data and receive & diplay.

        var cid = $('#SelectCompany').val();
        
        $.ajax({
            url: '/Order/CurrentOrderStatus',
            data: '{"cid":"' + cid + '"}',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (list) {

            }



        }); 
    });


    


});