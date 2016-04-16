$(document).ready(function () {
    //TODO : PAGINATION 
    //TODO : Editable table after track button
    //Current Collection Details - Today
    $.ajax({
        url: '/Collection/Collection_Status_Data',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        cache: false,
        success: function (list) {
            var Total_Cash = 0;
            var Total_Counters = 0;
            for (var i = 0; i < list.length; i++) {

                var str = '<tr class="trigger">';
                str += "<td>" + list[i].Name + "</td>";
                str += "<td>" + list[i].Count + "</td>";
                str += "<td>" + list[i].Cash + "</td>";
                str += "<td>" + "<button id=" + list[i].id + ' class="Track_Button btn btn-primary"><i class="icon-refresh"></i><a href="#myModal" data-toggle="modal" class="btn btn-xs btn-primary">Track </a>' + "</button></td>";

                str += "</tr>";
                Total_Cash += list[i].Cash;
                Total_Counters += list[i].Count;
                //Details Row
                str += ' <tr class="details_row"> <td colspan="5"> <div> <div class="row" id="row1"> <div class="col-lg-3"> <div id="map" style="height:300px;"></div></div> <div class="col-lg-3"> <p><strong> Vehicle No : ' + Total_Cash + ' </strong></p></div><div class="col-lg-2"> <p><strong> No Of Champs : ' + Total_Cash + ' </strong></p></div> <div class="col-lg-2"> <p><strong> Approx Weight : ' + Total_Cash + ' </strong></p></div> <div class="col-lg-2"> <p><strong> Distance : ' + Total_Cash + ' </strong></p></div> </div> </div> </div></tr><br>';
                
                $('#Collection_Table').append(str);
            }

            var str = "<tr>" + "<td>Total</td>" + "<td>" + Total_Counters + "</td> <td>" + Total_Cash + "</td></tr>";
            $('#Collection_Table').append(str);
            $('.details_row').hide();
        }
    });

    //Date Filter for Collection Details.
    $('#Collection_Date_submit').click(function () {
       
        var Collection_Date = $('#Collection_Date').val();
        $('#Collection_Table').empty();
        $.ajax({
            url: '/Collection/Collection_Status_Data',
            data: '{"d1":"' + Collection_Date + '"}',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            success: function (list) {
                var Total_Cash = 0;
                var Total_Counters = 0;
                for (var i = 0; i < list.length; i++) {
                    var str = '<tr class="trigger">';
                    str += "<td>" + list[i].Name + "</td>";
                    str += "<td>" + list[i].Count + "</td>";
                    str += "<td>" + list[i].Cash + "</td>";
                    str += "<td>" + "<button id=" + list[i].id + ' class="Track_Button btn btn-primary" style="z-index:5" ><i class="icon-refresh"></i><a href="#myModal" data-toggle="modal" class="btn btn-xs btn-primary">Track </a>' + "</button></td>";

                    str += "</tr>";
                    Total_Cash += list[i].Cash;
                    Total_Counters += list[i].Count;
                    //Details Row
                    str += ' <tr class="details_row"> <td colspan="5"> <div> <div class="row" id="row1"> <div class="col-lg-3"> <p><strong> CRN No :' + Total_Cash + '</strong></p></div><div class="col-lg-3"> <p><strong> Vehicle No : ' + Total_Cash + ' </strong></p></div><div class="col-lg-2"> <p><strong> No Of Champs : ' + Total_Cash + ' </strong></p></div> <div class="col-lg-2"> <p><strong> Approx Weight : ' + Total_Cash + ' </strong></p></div> <div class="col-lg-2"> <p><strong> Distance : ' + Total_Cash + ' </strong></p></div> </div> </div> </div></tr><br>';
                    $('#Collection_Table').append(str);
                }
                var str = "<tr>" + "<td>Total</td>" + "<td>" + Total_Counters + "</td> <td>" + Total_Cash + "</td></tr>";
                $('#Collection_Table').append(str);
                $('.details_row').hide();

            }
        });
    });
    
    //TODO : Check IF Date Empty. Error msg.

    //$("body").on("click", ".trigger", function () {
    //    debugger;
    //    $(this).next().toggle('slow');
    //    return false;
    //});
        
        



























});