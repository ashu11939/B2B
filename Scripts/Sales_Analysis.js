$(document).ready(function() {

    // Bar Graph for weekly sale report.
    

    //To display LIVE data
    $(function () {

        $.ajax({
            url: '/Analytics/Sales_Live_Data',
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (list) {
                count = list.length;
                //var sum = 0;
                //for (var i = 0 ; i < count; i++) {
                //    sum += list[i].clientOrder;
                //}
                $('#totalsalestoday').html("<h1 id=" + "inc_total" + " >" + list.Total_Amount + "</h1>");
                $({ someValue: 0 }).animate({ someValue: list.Total_Amount }, {
                    duration: 1000,
                    easing: 'swing', // can be anything

                    step: function () { // called on every step
                        // Update the element's text with rounded-up value:
                        $('#inc_total').text(Math.ceil(this.someValue));
                    }
                });

                $('#totalproductstoday').html("<h1 id=" + "inc_products" + " >" + list.Total_Products + "</h1>");
                $({ someValue: 0 }).animate({ someValue: list.Total_Products }, {
                    duration: 1000,
                    easing: 'swing', // can be anything

                    step: function () { // called on every step
                        // Update the element's text with rounded-up value:
                        $('#inc_products').text(Math.ceil(this.someValue));
                    }
                });

                $('#totaladvancetoday').html("<h1 id=" + "inc_advance" + " >" + list.Advance + "</h1>");
                $({ someValue: 0 }).animate({ someValue: list.Advance }, {
                    duration: 1000,
                    easing: 'swing', // can be anything

                    step: function () { // called on every step
                        // Update the element's text with rounded-up value:
                        $('#inc_advance').text(Math.ceil(this.someValue));
                    }
                });

                $('#totalduestoday').html("<h1 id=" + "inc_dues" + " >" + list.Dues + "</h1>");
                $({ someValue: 0 }).animate({ someValue: list.Dues }, {
                    duration: 1000,
                    easing: 'swing', // can be anything

                    step: function () { // called on every step
                        // Update the element's text with rounded-up value:
                        $('#inc_dues').text(Math.ceil(this.someValue));
                    }
                });
            }
        });
    });

});