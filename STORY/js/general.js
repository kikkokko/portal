const headerObj     = $('header'),
      headerH1Obj   = headerObj.children('h1'),
      menuObj       = $('.menu'),
      animateTime   = 400,
      mobile_point  = 1000,
      has_header    = $('header').length,
      user_agent    = window.navigator.userAgent.toLowerCase();
var window_size     = $(window).width(),
    header_point    = 0,
    menu_height     = menuObj.outerHeight(true);

if (has_header) {
    if (window_size < mobile_point) {
        header_point = $(window).height() - 200;
    } else {
        header_point = headerObj.offset().top + headerH1Obj.height() + 10;
    }
}

$('a[href^="#"]').click(function() {
    var href        = $(this).attr('href'),
        target      = $(href == "#" || href == "" ? 'html' : href),
        position;

    if (window_size < mobile_point){
        position    = target.offset().top - 60;
    } else {
        position    = target.offset().top;
    }
        
    
    if(position < 0) position = 0;
    
    scrollPosition(position);
    return false;
});

if (has_header) {
    if (window_size < mobile_point) {
        scrollMenu($(window).scrollTop() > header_point);
        $(window).on('scroll', function() {
            scrollMenu($(this).scrollTop() > header_point);
        });
    }
    $(window).on('resize', function() {
        window_size = $(window).width();
        if (window_size < mobile_point) {
            scrollMenu($(window).scrollTop() > header_point);
        }
    });
}

$('#pageTop').on('click', function () {
    scrollPosition(0);
});

$('.toggler').on('click', function() {
    var click_obj       = $(this),
        top_position    = 0,
        target          = click_obj.data('target'),
        target_obj      = $('#' + target),
        is_collapse     = false;
        is_accordion    = false;

    if (typeof click_obj.data('content_type') !== "undefined") {
        if (click_obj.data('content_type') == "collapse"
            || click_obj.data('content_type') == "accordion") {
            is_collapse = true;
            
            if (click_obj.data('content_type') == "accordion") {
                is_accordion = true;
            }
        }
    }
    if (is_collapse) {
        var is_open = target_obj.data('open');
        $('.collapse-body').slideUp(animateTime).data('open', false);
        if (!is_open) {
            target_obj.slideDown(animateTime).data('open', true);
        }
    } else {
        target_obj.slideToggle(animateTime);
    }
    
    if (is_accordion) {
        var diff    = 0;
        if (window_size <= sp_point) {
            diff = 10;
        } else {
            diff = 60;
        }

        if (click_obj.prev().hasClass('collapse-body')) {
            var prev_obj = click_obj.prev().prev();
            top_position = prev_obj.offset().top + prev_obj.height() - headerHeight;
        } else {
            top_position = click_obj.offset().top - diff;
        }
        scrollPosition(top_position);
    }
    click_obj.removeClass('hover');
});

function scrollPosition(position) {
    $('body,html').animate({
        scrollTop: position
    }, animateTime);
}

function scrollMenu(is_scroll) {
    if (is_scroll) {
        menuObj.addClass('scroll');
    } else {
        menuObj.removeClass('scroll');
    }
}