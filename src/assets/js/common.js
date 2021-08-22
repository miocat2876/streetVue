$(function () {
    $('.combo_box select').SumoSelect();

    $('.contents_box .calendar .add_bt').click(function() {
        $(this).toggleClass('on');
        $(this).parent().find(".add_class").slideToggle();
    });

    var schedule
    var detail
    
        

      $("td").hover(function () {
        $.ajax({
            url: 'http://kgm2876.iptime.org:9500/test5',
            success: function (data) {
                // var obj = JSON.parse(data)
                // console.log(obj)
                schedule = { 'date': '2021/02', 'schedule': { '24': [{ 'startTime': '12:00', 'endTime': '14:00', 'genre': '브레이크댄스 기초', 'level': 'Beginer', 'subscribe': 'n' }, { 'startTime': '16:00', 'endTime': '18:00', 'genre': '브레이크댄스 고급', 'level': 'Master', 'subscribe': 'n' }] } }
                detail = schedule.schedule['24'][0];
                
            }
        })
      })

    // var schedule = { 'date': '2021/02', 'schedule': { '24': [{ 'startTime': '12:00', 'endTime': '14:00', 'genre': '브레이크댄스 기초', 'level': 'Beginer', 'subscribe': 'n' }, { 'startTime': '16:00', 'endTime': '18:00', 'genre': '브레이크댄스 고급', 'level': 'Master', 'subscribe': 'n' }] } }
    // var detail = schedule.schedule['24'][0];
    // console.log(detail);


    function SetTooltipContent(instance, obj) {
        // var date = new Date(); 
        // var year = date.getFullYear(); 
        // var month = new String(date.getMonth()+1); 
        // var day = new String(date.getDate()); 
        var date = schedule.date;
        var startTime = detail.startTime;
        var endTime = detail.endTime;
        var genre = detail.genre;
        var level = detail.level;
        var subscrib = detail.subscrib;

        
        
        // if(month.length == 1) { 
        //     month = "0" + month; 
        // } 

        // if(day.length == 1) { 
        //     day = "0" + day; 
        // } 

        var tooltip_html = "<div id='calendar'><div class='top'><h2>"+ date;
        
        // var cur_day = obj;
        // if(cur_day.length == 1) { 
        //     cur_day = "0" + cur_day; 
        // } 

        // tooltip_html += cur_day;
        tooltip_html += "</h2></div>";
        tooltip_html += "<div class='bottom'><ul>";
        tooltip_html += "<li><h3>"+startTime+"-"+endTime+"</h3><p>"+"["+genre+"]"+"</p><span>Class Level:"+ level+"</span><a></a></li>";
        tooltip_html += "<li><h3>"+startTime+"-"+endTime+"</h3><p>"+"["+genre+"]"+"</p><span>Class Level:"+ level+"</span><a></a></li>";
        tooltip_html += "<li><h3>"+startTime+"-"+endTime+"</h3><p>"+"["+genre+"]"+"</p><span>Class Level:"+ level+"</span><a></a></li>";
        tooltip_html += "</ul></div>"
        tooltip_html += "</div>";

        instance.content(tooltip_html);
    };

    $('.calendar_tooltip').tooltipster({
        functionBefore: function(instance, helper) {
            SetTooltipContent(instance, $(helper.origin).html());
        },
        content: "Loading...",
        interactive: true,
        contentAsHTML: true
    });   

    function UpdateInstructorImg() {
        var boardwidth = $(".instructor_list .list_box .bottom img").width();
        var boardheight = boardwidth * 0.47;

        $(".instructor_list .list_box .bottom img").each(function () {
            $(this).css({ "height": boardheight + "px" });
        });
    }

    //swipe
    UpdateInstructorImg();
    $(window).resize(function () {
        UpdateInstructorImg();
    });

    var appendNumber = 2;
    var swiper = new Swiper(".swiper-container", {
        slidesPerView: 2,
        centeredSlides: true,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
    });
     var swiper = new Swiper(".notice_list .swiper-container", {
        slidesPerView: 2,
        centeredSlides: true,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
     });
    var swiper = new Swiper(".calender_teacther .review_list", {
        slidesPerView: 2,
        centeredSlides: true,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
    });


    $(".swiper-button-next").click(function (e) {
        e.preventDefault();
        swiper.appendSlide([
            '<div class="swiper-slide">' +
                '<div class="review_box">' +
                    '<div class="border-top"></div>' +
                    '<div class="border-middle">' +
                        'Slide ' + (++appendNumber) +
                    '</div>' +
                    '<div class="border-bottom"></div>' +
                '</div>' +
            '</div>'
        ]);
    });



    $(".index .top a").click(function(e) {
        $(".index .top a").removeClass("on");
        $(this).addClass("on");
        
        $(".index .search_box .bottom ul li").removeClass("on");
        $(".index .search_box .bottom ul li").eq($(this).index()).addClass("on");
    });


// show menu
     $(".menu_toggle").click(function () {

        $("nav").stop().animate({
            "margin-right": 0

        }, 500)
       
    })
    $(".nav_toggle").click(function () {
        $("nav").stop().animate({
            "margin-right": "-100%"

        }, 500)
    })

//toggle sub menu
    
    $(".nav_search").click(function () {
        $(".nav_search_sub").slideToggle(400);
    })

//sns popup
    $("#layerPopup").hide();
    $(".nav_login").click(function () {
        $("#layerPopup").show();
    })
    $(".popup_login .close").click(function () {
        $("#layerPopup").hide();
    })



  

});
