$(document).ready(function () {
    //global apid key
    var id = "721ae9d9cbc904e7d892c4c6869274ed"
        //avoid keyboard getting in the way in mobile devices
    $("#input").focus(function () {
        var height = $("body").css('height');
        $("body").css('height', height);
    });
    //lat and longitude
    $.getJSON("http://ip-api.com/json", function (data) {
            var lat = data.lat;
            console.log(lat);
            var long = data.lon;
            console.log(long);
            //get todays weather api initially
            $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=" + id + "&units=metric", function (weather) {
                console.log(weather);
                var city = weather.city.name;
                var weatherDesc = weather.list[0].weather[0].description;
                var maintemp = weather.list[0].main.temp;
                var lowtemp = weather.list[0].main.temp_min;
                var hightemp = weather.list[0].main.temp_max;
                var icon = weather.list[0].weather[0].id;
                var date = weather.list[0].dt_txt;
                var dayornighttoday = getTime(date);
                //forecast grab for tom
                var iconTom = weather.list[8].weather[0].id;
                var tomTemp = weather.list[8].main.temp;
                //forecast grab for two days
                var twoDaysUnix = weather.list[16].dt;
                var twoDays = dayConverter(twoDaysUnix);
                var iconTwoDays = weather.list[16].weather[0].id;
                var twoDayTemp = weather.list[16].main.temp;
                //forecast grab for 3 days
                var threeDaysUnix = weather.list[24].dt;
                var threeDays = dayConverter(threeDaysUnix);
                var iconThreeDays = weather.list[24].weather[0].id;
                var threeDayTemp = weather.list[24].main.temp;
                //forecast grab for 4 days
                // var fourDaysUnix = weather.list[26].dt;
                // var fourDays = dayConverter(fourDaysUnix);
                // var iconFourDays = weather.list[26].weather[0].id;
                // var fourDayTemp = weather.list[26].main.temp;
                var fourDaysUnix = weather.list[32].dt;
                var fourDays = dayConverter(fourDaysUnix);
                var iconFourDays = weather.list[32].weather[0].id;
                var fourDayTemp = weather.list[32].main.temp;
                //testing
                //var icon=957;
                //input for main day

                $("#city").html(city);
                setMainDate();
                $("#weatherDesc").html(weatherDesc);
                $("#maintemp").html(maintemp + "&deg;");
                $("#lowtemp").html("&#8595;" + lowtemp + "&deg;");
                $("#hightemp").html("&#8593;" + hightemp + "&deg;");
                $("#icon").addClass("wi wi-owm-day-" + icon);
                //input forecast for tomz
                $("#icontom").removeClass().addClass("wi wi-owm-" + dayornighttoday + iconTom);
                $("#tomtemp").html(tomTemp + "&deg;");
                //input forecast for two days
                $("#twodays").html(twoDays);
                $("#icontwodays").removeClass().addClass("wi wi-owm-" + dayornighttoday + iconTwoDays);
                $("#twodaytemp").html(twoDayTemp + "&deg;");
                //input forecast for 3 days
                $("#threedays").html(threeDays);
                $("#iconthreedays").removeClass().addClass("wi wi-owm-" + dayornighttoday + iconThreeDays);
                $("#threedaytemp").html(threeDayTemp + "&deg;");
                //input forecast for 4 days
                $("#fourdays").html(fourDays);
                $("#iconfourdays").removeClass().addClass("wi wi-owm-" + dayornighttoday + iconFourDays);
                $("#fourdaytemp").html(fourDayTemp + "&deg;");
                changeTheme(icon);
            })
        }) // end of daily update using lat and long
        //Enter and keypress call function getWeather 
    $("#input").keypress(function () {
        if (event.which == 13) {
            getWeather();
        }
    });
    $('#button').click(getWeather);
    //gets userinput and make sure no space and there is something entered
    function getWeather() {
        var userinput = $("#input").val();
        //no space regex expression
        userinput = userinput.replace(/\s+/g, '');
        console.log(userinput);
        if (userinput === "") {
            alert("Please Enter a City Before Submitting");
            return false;
        }
        //gets json from and sets to variables
        $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=" + userinput + "&appid=721ae9d9cbc904e7d892c4c6869274ed&units=metric", function (weather) {
            console.log(weather);
            var city = weather.city.name;
            var weatherDesc = weather.list[0].weather[0].description;
            var maintemp = weather.list[0].main.temp;
            var lowtemp = weather.list[0].main.temp_min;
            var hightemp = weather.list[0].main.temp_max;
            var icon = weather.list[0].weather[0].id;
            var date = weather.list[0].dt_txt;
            var dayornighttoday = getTime(date);
            //forecast grab for tom
            var iconTom = weather.list[8].weather[0].id;
            var tomTemp = weather.list[8].main.temp;
            //forecast grab for two days
            var twoDaysUnix = weather.list[16].dt;
            var twoDays = dayConverter(twoDaysUnix);
            var iconTwoDays = weather.list[16].weather[0].id;
            var twoDayTemp = weather.list[16].main.temp;
            //forecast grab for 3 days
            var threeDaysUnix = weather.list[24].dt;
            var threeDays = dayConverter(threeDaysUnix);
            var iconThreeDays = weather.list[24].weather[0].id;
            var threeDayTemp = weather.list[24].main.temp;
            //forecast grab for 4 days
            var fourDaysUnix = weather.list[32].dt;
            var fourDays = dayConverter(fourDaysUnix);
            var iconFourDays = weather.list[32].weather[0].id;
            var fourDayTemp = weather.list[32].main.temp;
//            
//            var fourDaysUnix = weather.list[32].dt;
//            var fourDays = dayConverter(fourDaysUnix);
//            var iconFourDays = weather.list[32].weather[0].id;
//            var fourDayTemp = weather.list[32].main.temp;
            //input for main day
            $("#city").html(city);
            setMainDate();
            $("#weatherDesc").html(weatherDesc);
            $("#maintemp").html(maintemp + "&deg;");
            $("#lowtemp").html("&#8595;" + lowtemp + "&deg;");
            $("#hightemp").html("&#8593;" + hightemp + "&deg;");
            $("#icon").removeClass().addClass("wi wi-owm-" + dayornighttoday + icon);
            //input forecast for tomz
            $("#icontom").removeClass().addClass("wi wi-owm-" + dayornighttoday + iconTom);
            $("#tomtemp").html(tomTemp + "&deg;");
            //input forecast for two days
            $("#twodays").html(twoDays);
            $("#icontwodays").removeClass().addClass("wi wi-owm-" + dayornighttoday + iconTwoDays);
            $("#twodaytemp").html(twoDayTemp + "&deg;");
            //input forecast for 3 days
            $("#threedays").html(threeDays);
            $("#iconthreedays").removeClass().addClass("wi wi-owm-" + dayornighttoday + iconThreeDays);
            $("#threedaytemp").html(threeDayTemp + "&deg;");
            //input forecast for 4 days
            $("#fourdays").html(fourDays);
            $("#iconfourdays").removeClass().addClass("wi wi-owm-" + dayornighttoday + iconFourDays);
            $("#fourdaytemp").html(fourDayTemp + "&deg;");
            changeTheme(icon);
        });
    };
    //get and day,month and time for main card
    function setMainDate() {
        var d_names = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        var d = new Date();
        var curr_min = d.getMinutes();
        curr_min = curr_min > 9 ? curr_min : '0' + curr_min;
        var curr_hour = d.getHours();
        var curr_day = d.getDay();
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var sup = "";
        if (curr_date == 1 || curr_date == 21 || curr_date == 31) {
            sup = "st";
        }
        else if (curr_date == 2 || curr_date == 22) {
            sup = "nd";
        }
        else if (curr_date == 3 || curr_date == 23) {
            sup = "rd";
        }
        else {
            sup = "th";
        }
        $("#day").html(d_names[curr_day] + " | ");
        $("#date").html(m_names[curr_month] + " " + curr_date + "<SUP>" + sup + "</SUP>" + " | ");
        $("#time").html(curr_hour + ":" + curr_min);
    }
    //convert unixtimestamp to day of the week
    function dayConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var dayArray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        var day = dayArray[a.getDay()];
        return day;
    }

    function getTime(unix) {
        var a = new Date(unix);
        console.log(a);
        var curr_hour = a.getHours();
        console.log(curr_hour);
        if (curr_hour >= 0 && curr_hour <= 12) {
            return "day-"
        }
        else {
            return "night-"
        }
    }
    //theme change to the weather condition
    function changeTheme(icon) {
        //200-232 ---> thunderstorms
        if (icon >= 200 && icon <= 232) {
            //theme background color          
            $(".card").css("background-color", "#131021");
            $(".card__search").css("background-color", "#131021");
            $("#input").css("background-color", "#131021");
            //theme primary
            $("body, #searchicon").css("color", "#FDD023");
            $("#input").css('border-bottom', 'solid 1px #FDD023');
            $(".card__moreinfo").css({
                    "border-bottom": "1px solid #FDD023"
                    , "border-top": "1px solid #FDD023"
                })
                //theme secondary
            $("#day, #date, #time, #weatherDesc").css("color", "#ab694d");
            $("input").addClass('inputcolorstorm');
            $("#input").css("color", "#ab694d");
        }
        //300-321 ---> drizzle
        else if (icon >= 300 && icon <= 321) {
            //theme background color          
            $(".card").css("background-color", "#0071FE");
            $(".card__search").css("background-color", "#0071FE");
            $("#input").css("background-color", "#0071FE");
            //theme primary
            $("body, #searchicon").css("color", "#FFFFFE");
            $("#input").css('border-bottom', 'solid 1px #FFFFFE');
            $(".card__moreinfo").css({
                    "border-bottom": "1px solid #FFFFFE"
                    , "border-top": "1px solid #FFFFFE"
                })
                //theme secondary
            $("#day, #date, #time, #weatherDesc").css("color", "#b6d7f1");
            $("input").addClass('inputcolordrizzle');
            $("#input").css("color", "#b6d7f1");
        }
        //500-531 ---> Rain
        else if (icon >= 500 && icon <= 531) {
            //theme background color          
            $(".card").css("background-color", "#004785");
            $(".card__search").css("background-color", "#004785");
            $("#input").css("background-color", "#004785");
            //theme primary
            $("body, #searchicon").css("color", "#e7f3fd");
            $("#input").css('border-bottom', 'solid 1px #e7f3fd');
            $(".card__moreinfo").css({
                    "border-bottom": "1px solid #e7f3fd"
                    , "border-top": "1px solid #e7f3fd"
                })
                //theme secondary
            $("#day, #date, #time, #weatherDesc").css("color", "#53b3ff");
            $("input").removeClass().addClass('inputcolorrain');
            $("#input").css("color", "#53b3ff");
        }
        //600-622 ---> Snow
        else if (icon >= 600 && icon <= 622) {
            //theme background color          
            $(".card").css("background-color", "#E8E9F1");
            $(".card__search").css("background-color", "#E8E9F1");
            $("#input").css("background-color", "#E8E9F1");
            //theme primary
            $("body, #searchicon").css("color", "#4a4c54");
            $("#input").css('border-bottom', 'solid 1px #4a4c54');
            $(".card__moreinfo").css({
                    "border-bottom": "1px solid #4a4c54"
                    , "border-top": "1px solid #4a4c54"
                })
                //theme secondary
            $("#day, #date, #time, #weatherDesc").css("color", "#88888a");
            $("input").addClass('inputcolorsnow');
            $("#input").css("color", "#88888a");
        }
        //700-781 ---> smokey
        else if (icon >= 701 && icon <= 781) {
            //theme background color          
            $(".card").css("background-color", "#546e7a");
            $(".card__search").css("background-color", "#546e7a");
            $("#input").css("background-color", "#546e7a");
            //theme primary
            $("body, #searchicon").css("color", "#ebeff1");
            $("#input").css('border-bottom', 'solid 1px #ebeff1');
            $(".card__moreinfo").css({
                    "border-bottom": "1px solid #ebeff1"
                    , "border-top": "1px solid #ebeff1"
                })
                //theme secondary
            $("#day, #date, #time, #weatherDesc").css("color", "#88888a");
            $("input").addClass('inputcolorsmokey');
            $("#input").css("color", "#88888a");
        }
        //clear
        else if (icon === 800) {
            //theme background color          
            $(".card").css("background-color", "#FEF2C0");
            $(".card__search").css("background-color", "#FEF2C0");
            $("#input").css("background-color", "#FEF2C0");
            //theme primary
            $("body, #searchicon").css("color", "#DA5920");
            $("#input").css('border-bottom', 'solid 1px #DA5920');
            $(".card__moreinfo").css({
                    "border-bottom": "1px solid #DA5920"
                    , "border-top": "1px solid #DA5920"
                })
                //theme secondary
            $("#day, #date, #time, #weatherDesc").css("color", "#ab694d");
            $("input").addClass('inputcolorclear');
            $("#input").css("color", "#ab694d");
        }
        //801-804 ---> cloudy
        else if (icon >= 801 && icon <= 804) {
            //theme background color          
            $(".card").css("background-color", "#DDDCD9");
            $(".card__search").css("background-color", "#DDDCD9");
            $("#input").css("background-color", "#DDDCD9");
            //theme primary
            $("body, #searchicon").css("color", "#1d1a1a");
            $("#input").css('border-bottom', 'solid 1px #1d1a1a');
            $(".card__moreinfo").css({
                    "border-bottom": "1px solid #1d1a1a"
                    , "border-top": "1px solid #1d1a1a"
                })
                //theme secondary
            $("#day, #date, #time, #weatherDesc").css("color", "#9e9e9e");
            $("input").addClass('inputcolorcloudy');
            $("#input").css("color", "#9e9e9e");
        }
        //900-906 ---> extreme
        else if (icon >= 900 && icon <= 906) {
            //theme background color          
            $(".card").css("background-color", "#e74c3c");
            $(".card__search").css("background-color", "#e74c3c");
            $("#input").css("background-color", "#e74c3c");
            //theme primary
            $("body, #searchicon").css("color", "white");
            $("#input").css('border-bottom', 'solid 1px white');
            $(".card__moreinfo").css({
                    "border-bottom": "1px solid white"
                    , "border-top": "1px solid white"
                })
                //theme secondary
            $("#day, #date, #time, #weatherDesc").css("color", "#9a3206");
            $("input").addClass('inputcolorextreme');
            $("#input").css("color", "#9a3206");
        }
        //951-962 --->windy
        else {
            return false;
        }
    };
    //loading animation   
    function loader() {
        $("#overlay").fadeOut();
    }
    setTimeout(loader, 1000);
});