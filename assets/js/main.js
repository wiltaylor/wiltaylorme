/**
 * createIT main javascript file.
 */


var $devicewidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var $deviceheight = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var $bodyel = jQuery("body");
var $navbarel = jQuery(".navbar");

/* ========================== */
/* ==== HELPER FUNCTIONS ==== */

function validatedata($attr, $defaultValue) {
    "use strict";
    if ($attr !== undefined) {
        return $attr
    }
    return $defaultValue;
}

function parseBoolean(str, $defaultValue) {
    "use strict";
    if (str == 'true') {
        return true;
    } else if (str == "false") {
        return false;
    }
    return $defaultValue;
}


(function ($) {
    "use strict";

    /********Init Snap*********/

    if(document.getElementById('ct-js-wrapper')){
        var snapper = new Snap({
            element: document.getElementById('ct-js-wrapper')
        });

        snapper.settings({
            disable: "left",
            addBodyClasses: true
        });
    }

    $(window).load(function(){

        var $preloader = $('.ct-preloader');
        var $content = $('.ct-preloader-content');

        var $timeout = setTimeout(function(){
            $($preloader).addClass('animated').addClass('fadeOut');
            $($content).addClass('animated').addClass('fadeOut');
        }, 0);
        var $timeout2 = setTimeout(function(){
            $($preloader).css('display', 'none').css('z-index', '-9999');
        }, 500);

        // Animations Init // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($().appear) {
            if (device.mobile() || device.tablet()) {
                $("body").removeClass("cssAnimate");
            } else {

                $('.cssAnimate .animated').appear(function () {
                    var $this = $(this);

                    $this.each(function () {
                        if ($this.data('time') != undefined) {
                            setTimeout(function () {
                                $this.addClass('activate');
                                $this.addClass($this.data('fx'));
                            }, $this.data('time'));
                        } else {
                            $this.addClass('activate');
                            $this.addClass($this.data('fx'));
                        }
                    });
                }, {accX: 50, accY: -350});
            }
        }

        /********Parallax Disable*********/

            if (($(window).width()<=1024)) {
                $(".ct-mediaSection").removeAttr("data-stellar-background-ratio").removeAttr("data-type").addClass("ct-u-backgroundfix");
            }
    });

    $(document).ready(function () {
        if (navigator.userAgent.match(/Trident\/7\./)) {
            $('body').on('mousewheel', function() {
                event.preventDefault();
                window.scrollTo(0, window.pageYOffset - event.wheelDelta / 2);
            });
        }

        //Logo change in navbar(solid and transparent)

        if($('.navbar').hasClass('ct-navbar--solid')){
            $('.navbar-brand .ct-logo-navbar--transparent').css('display', 'none');
            $('.navbar-brand .ct-logo-navbar--solid').css('display', 'block');
        }

        /*******Snapper disable******/

        if ($devicewidth > 767 && document.getElementById('ct-js-wrapper')) {
            snapper.disable();
        }

        // Snap Navigation in Mobile // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $(".navbar-toggle").on("click", function () {
            if ($bodyel.hasClass('snapjs-right')) {
                snapper.close();
            } else {
                snapper.open('right');
            }
        });

        if ($devicewidth<=767) {
            if($('body').hasClass('onepager')){
                $(".ct-menuMobile-navbar li").addClass("onepage");
            }
        }

        $('.ct-menuMobile .ct-menuMobile-navbar .onepage > a').on("click", function (e) {
            snapper.close();
        })

        $('.ct-menuMobile-navbar li.dropdown').on("click", function () {
            $( this ).has( "ul" ).toggleClass("ct-js-dropdown-mobile").siblings().removeClass('ct-js-dropdown-mobile');//accordion
        });

        if($('.ct-menuMobile-navbar ul li').has('ul')){
            $('.ct-menuMobile-navbar li.dropdown>a').append("<i class='fa fa-angle-down'></i>"); //Arrow in mobile
        }

        /********Onepager Scroll to section********/

        if($('body').hasClass('onepager')) {
            if ($().pageScroller) {
                $('body.onepager').pageScroller({
                    navigation: '.onepage',
                    sectionClass: 'scroll',
                    scrollOffset: -50
                });
            }
        }
        // Button Scroll to Section // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $('.ct-js-btnScroll[href^="#"]').on("click", function (e) {
            e.preventDefault();

            var target = this.hash, $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': -50+$target.offset().top
            }, 900, 'swing', function () {
                window.location.hash = target;
            });
        });

// TO top

        $('#ct-js-totop').on("click", function () {
            $("body,html").animate({scrollTop: 0}, 1200);
            return false;
        });

//ACTIVE NAVBAR TABS

        if($('.navbar').hasClass('ct-navbar--solid')){
            $('.nav>li.dropdown').hover(function(){
                $( this ).has( "ul" ).toggleClass("ct-u-active--color--solid");
            });
        }
        else{
            $('.nav>li.dropdown').hover(function(){
                $( this ).has( "ul" ).toggleClass("ct-u-active--color--transparent");
            });
        }


        /****** Tooltip **************/

        $("[data-toggle='tooltip']").tooltip();
    });


/*********sticky menu************/

$(window).scroll(function() {

    if ($devicewidth>= 767) {

                var scrollTop = $(window).scrollTop();
                if (scrollTop >= 50) {

                    if($('.ct-topbar').hasClass('ct-topbar--stickyToTop') && $('.navbar').hasClass('ct-navbar--solid')){
                        $('.navbar').css('padding-top', '0');
                    }

                    if($('.ct-topbar').hasClass('ct-topbar--default')){
                        $('.ct-topbar').addClass('ct-hide--topbar');
                    }
                    else{
                        $('.navbar').addClass('ct-navbar-fix');
                    }

                    if($('.navbar').hasClass('ct-navbar--solid')){
                        $('.navbar').addClass('ct-navbar--stickyWITHsolid')
                    }else{
                        $('.ct-navbar--stickyToTop').addClass('ct-navbar--sticky');
                    }

                } else {
                    $('.ct-navbar--stickyToTop').removeClass('ct-navbar--sticky');
                    $('.ct-topbar').removeClass('ct-hide--topbar');
                    $('.navbar').removeClass('ct-navbar-fix, ct-navbar--stickyWITHsolid');
                }
    }
});

    $(window).on('resize', function() {
        if ($(window).width() < 768) {
            snapper.enable();
        } else{
            snapper.close();
            snapper.disable();
        }
    })

    // Init Scripts

        //MAGNIFIC POPUP

    $.fn.magnificinfinitescroll = function(options) {
        if(jQuery().magnificPopup){
            jQuery('.ct-js-magnificPortfolioPopupGroup').each(function() { // the containers for all your galleries
                jQuery(this).magnificPopup({

                    type: 'ajax',
                    delegate: '.ct-js-magnificPortfolioPopup',
                    //mainClass: 'ct-magnificPopup-bottomArrows',
                    fixedContentPos: false,
                    closeBtnInside: true,
                    closeOnContentClick: false,
                    closeOnBgClick: true,
                    gallery: {
                        enabled: false
                    },
                    callbacks: {
                        ajaxContentAdded: function() {
                            var $container = $('.ct-slider-afterANDbefore');

                            imagesLoaded( $container, function() {
                                $container.twentytwenty();
                            });
                        }
                        /*buildControls: function() {
                         // re-appends controls inside the main container
                         this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
                         }*/

                    }
                });
            });

            $('.ct-js-magnificPopupMedia').magnificPopup({
                //disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: true,

                fixedContentPos: false
            });
            $('.ct-js-magnificPopupImage').magnificPopup({
                //disableOn: 700,
                type: 'image',
                mainClass: 'ct-magnificPopup--image',
                removalDelay: 160,
                preloader: true,

                fixedContentPos: false,
                gallery:{
                    enabled: true
                }
            });
        }
    };
    $(window).load(function(){
        $('.ct-gallery').magnificinfinitescroll();
    });

    /* ==== GOOGLE MAP ==== */

    var $maphelp = $('.hidemap .ct-googleMap');
    $(".hidemap .mapToggle").click(function () {
        var $this = $(this);
        var $map = $this.parent().find('.googlemapcontainer');
        $this.html($this.html() == 'Hide the map' ? 'Show the map' : 'Hide the map');

        if ($map.height() != "0") {
            $map.animate({height: '0px'}, 500);
        } else {
            $map.animate({height: $maphelp.data("height") + "px"}, 500);
            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: $map.offset().top
                }, 2000);
            }, 500);
        }
    });

    function initmap() {
        var icongmap = $('.ct-googleMap').attr('data-icon');

        if (($(".ct-googleMap").length > 0) && (typeof google === 'object' && typeof google.maps === 'object')) {
            $('.ct-googleMap').each(function () {
                var atcenter = "";
                var $this = $(this);
                var location = $this.data("location");
                var zoom = $this.data("zoom");

                var offset = -30;

                if (validatedata($this.data("offset"))) {
                    offset = $this.data("offset");
                }

                if (validatedata(location)) {
                    $this.gmap3({
                        marker: {
                            //latLng: [40.616439, -74.035540],
                            address: location, options: {
                                //visible: false
                                icon: new google.maps.MarkerImage(icongmap)
                            }, callback: function (marker) {
                                atcenter = marker.getPosition();
                            }
                        }, map: {
                            options: {
                                //maxZoom:11,
                                zoom: zoom,
                                mapTypeId: google.maps.MapTypeId.ROADMAP, // ('ROADMAP', 'SATELLITE', 'HYBRID','TERRAIN');
                                scrollwheel: false,
                                disableDoubleClickZoom: false,
                                draggable: true, //disableDefaultUI: true,
                                mapTypeControlOptions: {
                                    //mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
                                    //style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                                    //position: google.maps.ControlPosition.RIGHT_CENTER
                                    mapTypeIds: []
                                }
                            }, events: {
                                idle: function () {
                                    if (!$this.data('idle')) {
                                        $this.gmap3('get').panBy(0, offset);
                                        $this.data('idle', true);
                                    }
                                }
                            }
                        }, overlay: {
                            address: location, options: {
                                offset: {
                                    y: -100, x: -25
                                }
                            }
                        }
                        //},"autofit"
                    });

                    // center on resize
                    google.maps.event.addDomListener(window, "resize", function () {
                        //var userLocation = new google.maps.LatLng(53.8018,-1.553);
                        setTimeout(function () {
                            $this.gmap3('get').setCenter(atcenter);
                            $this.gmap3('get').panBy(0, offset);
                        }, 400);

                    });

                    // set height
                    $this.css("min-height", $this.data("height") + "px");
                }

                if ($this.parent().parent().hasClass('hidemap')) {
                    $this.parent().animate({height: '0px'}, 500);
                }

            })
        }
    }

    initmap();

    /* ==================== */
    /* ==== FLEXSLIDER ==== */

    $(document).ready(function () {

        if ($().flexslider) {

            if ($(".ct-js-flexslider").length > 0) {
                $(".ct-js-flexslider").each(function () {

                    var $this = $(this);
                    var ctanimations = validatedata($this.attr("data-animations"), false);
                    if(ctanimations) {
                        $this.css('min-height', $this.attr('data-height'));
                        $this.css('height', $this.attr('data-height'));
                        $this.find(".slides > li").each(function () {
                            var $slide_item = $(this);
                            var bg = validatedata($slide_item.attr('data-bg'), false);
                            if (bg) {
                                $slide_item.css('background-image', 'url("' + bg + '")');
                            }
                            $slide_item.css('min-height', $this.attr('data-height'));
                            $slide_item.css('height', $this.attr('data-height'));

                            // hide slider content due to fade animation

                            /*
                             $slide_item.find(".inner").hide();

                             $slide_item.find(".inner [data-fx]").each(function () {
                             $(this).removeClass("animated");
                             })
                             */
                        })
                    }
                    var ctnamespace = validatedata($this.attr("data-namespace"), "flex-");
                    var ctselector = validatedata($this.attr("data-selector"), ".slides > li");
                    var ctanimation = validatedata($this.attr("data-animation"), "slide");
                    var cteasing = validatedata($this.attr("data-easing"), "swing");
                    var ctdirection = validatedata($this.attr("data-direction"), "horizontal");
                    var ctreverse = parseBoolean($this.attr("data-reverse"), false);
                    var ctanimationloop = parseBoolean($this.attr("data-animationloop"), false);
                    var ctsmoothheight = parseBoolean($this.attr("data-smoothheight"), false);
                    var ctstartat = parseInt(validatedata($this.attr("data-startat"), 0));
                    var ctslideshow = parseBoolean($this.attr("data-slideshow"), true);
                    var ctslideshowspeed = parseInt(validatedata($this.attr("data-slideshowspeed"), 7000));
                    var ctanimationspeed = parseInt(validatedata($this.attr("data-animationspeed"), 600));
                    var ctinitdelay = parseInt(validatedata($this.attr("data-initdelay"), 0));
                    var ctrandomize = parseBoolean($this.attr("data-randomize"), false);
                    var ctthumbcaptions = parseBoolean($this.attr("data-thumbcaptions"), false);

                    var ctpauseonaction = parseBoolean($this.attr("data-pauseonaction"), true);
                    var ctpauseonhover = parseBoolean($this.attr("data-pauseonhover"), false);
                    var ctpauseinvisible = parseBoolean($this.attr("data-pauseinvisible"), true);
                    var ctusecss = parseBoolean($this.attr("data-usecss"), true);
                    var cttouch = parseBoolean($this.attr("data-touch"), true);
                    if (device.mobile()) {
                        cttouch = false;
                    }
                    var ctvideo = parseBoolean($this.attr("data-video"), false);
                    var ctcontrolnav = parseBoolean($this.attr("data-controlnav"), true);
                    if (ctcontrolnav == false) {
                        $this.addClass("ct-flexslider-js-noMargin");
                    }
                    var ctdirectionnav = parseBoolean($this.attr("data-directionnav"), false);
                    var ctprevtext = validatedata($this.attr("data-prevtext"), "Previous");
                    var ctnexttext = validatedata($this.attr("data-nexttext"), "Next");

                    var ctkeyboard = validatedata(parseBoolean($this.attr("data-keyboard")), true);
                    var ctmultiplekeyboard = parseBoolean($this.attr("data-multiplekeyboard"), false);
                    var ctmousewheel = parseBoolean($this.attr("data-mousewheel"), false);
                    var ctpauseplay = parseBoolean($this.attr("data-pauseplay"), false);
                    var ctpausetext = validatedata($this.attr("data-pausetext"), "Pause");
                    var ctplaytext = validatedata($this.attr("data-playtext"), "Play");
                    var ctitemwidth = parseInt(validatedata($this.attr("data-itemwidth"), 0));
                    var ctitemmargin = parseInt(validatedata($this.attr("data-itemmargin"), 0));
                    var ctminitems = parseInt(validatedata($this.attr("data-minitems"), 0));
                    var ctmaxitems = parseInt(validatedata($this.attr("data-maxitems"), 0));
                    var ctmove = parseInt(validatedata($this.attr("data-move"), 0));
                    var ctallowoneslide = parseBoolean($this.attr("data-allowoneslide"), false);

                    var ctcontrolscontainer = validatedata($this.attr("data-controlscontainer"), "");
                    var ctmanualcontrols = validatedata($this.attr("data-manualcontrols"), "");

                    var ctsync = validatedata($this.attr("data-sync"), "");
                    var ctasnavfor = validatedata($this.attr("data-asnavfor"), "");

                    $this.flexslider({
                        namespace: ctnamespace,             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
                        selector: ctselector,       //{NEW} Selector: Must match a simple pattern. "{container} > {slide}" -- Ignore pattern at your own peril
                        animation: ctanimation,              //String: Select your animation type, "fade" or "slide"
                        easing: cteasing,                //{NEW} String: Determines the easing method used in $ transitions. $ easing plugin is supported!
                        direction: ctdirection,        //String: Select the sliding direction, "horizontal" or "vertical"
                        reverse: ctreverse,                 //{NEW} Boolean: Reverse the animation direction
                        animationLoop: ctanimationloop,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
                        smoothHeight: ctsmoothheight,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
                        startAt: ctstartat,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
                        slideshow: ctslideshow,                //Boolean: Animate slider automatically
                        slideshowSpeed: ctslideshowspeed,           //Integer: Set the speed of the slideshow cycling, in milliseconds
                        animationSpeed: ctanimationspeed,            //Integer: Set the speed of animations, in milliseconds
                        initDelay: ctinitdelay,                   //{NEW} Integer: Set an initialization delay, in milliseconds
                        randomize: ctrandomize,               //Boolean: Randomize slide order
                        thumbCaptions: ctthumbcaptions,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

                        // Usability features


                        pauseOnAction: ctpauseonaction,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
                        pauseOnHover: ctpauseonhover,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
                        pauseInvisible: ctpauseinvisible,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
                        useCSS: ctusecss,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
                        touch: cttouch,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
                        video: ctvideo,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

                        // Primary Controls


                        controlNav: ctcontrolnav,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
                        directionNav: ctdirectionnav,             //Boolean: Create navigation for previous/next navigation? (true/false)
                        prevText: ctprevtext,           //String: Set the text for the "previous" directionNav item
                        nextText: ctnexttext,               //String: Set the text for the "next" directionNav item

                        // Secondary Navigation


                        keyboard: ctkeyboard,                 //Boolean: Allow slider navigating via keyboard left/right keys
                        multipleKeyboard: ctmultiplekeyboard,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
                        mousewheel: ctmousewheel,              //{UPDATED} Boolean: Requires $.mousewheel.js (https://github.com/brandonaaron/$-mousewheel) - Allows slider navigating via mousewheel
                        pausePlay: ctpauseplay,               //Boolean: Create pause/play dynamic element
                        pauseText: ctpausetext,             //String: Set the text for the "pause" pausePlay item
                        playText: ctplaytext,               //String: Set the text for the "play" pausePlay item

                        // Special properties
                        controlsContainer: ctcontrolscontainer,          //{UPDATED} $ Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
                        manualControls: ctmanualcontrols,             //{UPDATED} $ Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
                        sync: ctsync,                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
                        asNavFor: ctasnavfor,                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

                        // Carousel Options


                        itemWidth: ctitemwidth,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
                        itemMargin: ctitemmargin,                  //{NEW} Integer: Margin between carousel items.
                        minItems: ctminitems,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
                        maxItems: ctmaxitems,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
                        move: ctmove,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
                        allowOneSlide: ctallowoneslide,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

                        // Callback API
                        start: function () {
                            //$this.removeClass("loading-slider");
                            if(ctanimations){
                                setTimeout(function () {
                                    $this.find(".slides > li.flex-active-slide .inner [data-fx]").each(function () {
                                        var $content = $(this);
                                        if ($content.data('time') != undefined) {
                                            setTimeout(function () {
                                                $content.addClass($content.data('fx')).addClass("activate");
                                            }, $content.data('time'));
                                        } else{
                                            $content.addClass($content.data('fx')).addClass("activate");
                                        }
                                    })
                                }, 650);
                            }
                        },
                        before: function () {
                            if(ctanimations) {
                                $this.find(".slides > li .inner [data-fx]").each(function () {
                                    var $content = $(this);
                                    $content.removeClass($content.data('fx')).removeClass("activate");
                                })
                            }
                        },           //Callback: function(slider) - Fires asynchronously with each slider animation
                        after: function () {
                            if(ctanimations) {
                                setTimeout(function () {
                                    $this.find(".slides > li.flex-active-slide .inner [data-fx]").each(function () {
                                        var $content = $(this);
                                        if ($content.data('time') != undefined) {
                                            setTimeout(function () {
                                                $content.addClass($content.data('fx')).addClass("activate");
                                            }, $content.data('time'));
                                        } else{
                                            $content.addClass($content.data('fx')).addClass("activate");
                                        }
                                    })
                                }, 150);
                            }
                        },            //Callback: function(slider) - Fires after each slider animation completes
                        end: function () {
                        },              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
                        added: function () {
                        },            //{NEW} Callback: function(slider) - Fires after a slide is added
                        removed: function () {
                        }           //{NEW} Callback: function(slider) - Fires after a slide is removed
                    })
                })
            }
        }
    })

})(jQuery);
