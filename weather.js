$(function () {

    $("#search").on("click", function () {

        var city = $("#city").val();
        if (city != "") {

            $.ajax({

                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=197130569bef0aa4a6ffccae0964e325",
                type: "GET",
                dataType: "jsonp",
                success: function (data) {
                    console.log(data);
                    var show = Temperatura(data);
                    var details = Details(data);
                    $("#show_info1, #show_info2").show();
                    $("#show_info1").html(show);
                    $("#show_info2").html(details);
                    $("#city").val("");
                    var condition = data.weather[0].main;
                    if(condition == "Clear")
                        {
                            $('body').css('background-image', "url('https://res.cloudinary.com/emamador/image/upload/v1478194477/weatherApp/clearclouds_amf7da.jpg')");
                        }
                    if(condition == "Thunderstorm")
                        {
                        $('body').css('background-image', "url('https://res.cloudinary.com/emamador/image/upload/v1478194478/weatherApp/thunderstorm_rlk4dz.jpg')");
                        }
                    if(condition == "Drizzle")
                        {
                            $('body').css('background-image', "url('https://res.cloudinary.com/emamador/image/upload/v1478194469/weatherApp/drizzle_vf8jhb.jpg')");
                        }
                    if(condition == "Rain")
                        {
                            $('body').css('background-image', "url('https://res.cloudinary.com/emamador/image/upload/v1478194469/weatherApp/rain_wy8mvb.jpg')");
                        }
                    if(condition == "Snow")
                        {
                            $('body').css('background-image', "url('https://res.cloudinary.com/emamador/image/upload/v1478194477/weatherApp/snow_mg8s6g.jpg')");
                        }
                    if(condition == "Clouds")
                        {
                            $('body').css('background-image', 
                            "url('https://i.pinimg.com/originals/6a/15/d0/6a15d073cb8dbdb00cba7d8da283ae72.jpg')");
                        }
                }

            });

        } else {
            alert("Empty input!");
        }

    });

});

function Temperatura(data) {
    var condition = data.weather[0].main;
    var ikona = "";
    if(condition == "Clear")
    {
       
        ikona = "<div class='col-md-4  col-md-offset-2'><div class='icon sunny'><div class='sun'><div class='rays'></div></div></div></div>";
    }
    if(condition == "Snow")
    {
        ikona = "<div class='col-md-4  col-md-offset-2'><div class='icon flurries'><div class='cloud'></div><div class='snow'><div class='flake'></div><div class='flake'></div></div></div></div>";
    }
    if(condition == "Clouds")
    {
        ikona = "<div class='col-md-4  col-md-offset-2'><div class='icon cloudy'><div class='cloud'></div><div class='cloud'></div></div></div>";
    }
    if(condition == "Rain")
    {
        ikona = "<div class='col-md-4  col-md-offset-2'><div class='icon rainy'><div class='cloud'></div><div class='rain'></div></div></div>";
    }
    if(condition == "Thunderstorm")
    {
        ikona = "<div class='col-md-4  col-md-offset-2'><div class='icon thunder-storm'><div class='cloud'></div><div class='lightning'><div class='bolt'></div><div class='bolt'></div></div></div></div>";
    }
    if(condition == "Drizzle")
    {
        ikona = "<div class='col-md-4'><div class='icon sun-shower'><div class='cloud'></div><div class='sun'><div class='rays'></div></div><div class='rain'></div></div></div>";
    }
    return "<h2 class='title'>" + data.name + ", " + data.sys.country + "</h2>" +
        /*"<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>*/
        ikona + 
        "<div class='col-md-4'><span class='desc'>" + data.weather[0].description + "</span>" +
        "<div  class='stil_temp'>" + parseInt(data.main.temp) + " &deg;C</div>" + 
        "<span  class='min'  style='padding-right: 20px;'><i class='fa fa-angle-double-up'></i> " + parseInt(data.main.temp_max) + " &deg;C</span>" +
        "<span  class='min'><i class='fa fa-angle-double-down'></i> " + parseFloat(data.main.temp_min) + " &deg;C</span></div>";
}

function Details(data) {
    var rise = data.sys.sunrise;
    var set = data.sys.sunset;
    var date1 = new Date(rise * 1000);
    var date2 = new Date(set * 1000);
    var timestr1 = date1.toLocaleTimeString();
    var timestr2 = date2.toLocaleTimeString();
    return "<div class='col-md-6'><br><h3 class='desc2'>Pressure: " + data.main.pressure + " hPa</h3>" +
        "<h3  class='desc2'>Humidity: " + data.main.humidity + " %</h3>" +
        "<h3  class='desc2'>Wind Speed: " + data.wind.speed + " m/s</h3>" +
        "<h3  class='desc2'>Wind Direction: " + data.wind.deg.toFixed(2) + " &deg;</h3></div>" + "<div class='col-md-6'><br><br><br><img src='dawn1.png' class='suntime'>" + "<span class='time'>" + timestr1 + "</span><br><br><br>" + "<img src='sunset.png' class='suntime'>" + "<span class='time'>" + timestr2 + "</span>" + "</div>";
} 

/* function initMap(data) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 40.731, lng: -73.997}
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    document.getElementById('search').addEventListener('click', function() {
        geocodeLatLng(geocoder, map, infowindow, data);
    });
}

function geocodeLatLng(geocoder, map, infowindow, data) {
    var latlng = {lat: data.coord.lat, lng: data.coord.lon};
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(11);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
} */

