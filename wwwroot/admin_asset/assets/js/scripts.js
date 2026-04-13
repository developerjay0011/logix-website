/*
--------------------------------------------------------------------------------------------------------
* Template Name             :                                                                          *
* Author                    :                                                                          *
* Version                   : 1.0                                                                      *
* Design and Developed by   :                                                                          * 
*-------------------------------------------------------------------------------------------------------
NOTE: This is main stylesheet of template, This file contains the styling for the actual Template.*/ 


(function(window, undefined) {
  'use strict';

    var PUS = {};  
 

    $('.select-select2').select2({
    });

    $('[data-toggle="popover"]').popover();
    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            if (!$(this).is(e.target) && 
                $(this).has(e.target).length === 0 && 
                $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    }); 


    // :: Copyright Year   
    var currentYear = (new Date).getFullYear();
    $("#copyright-year").text((new Date).getFullYear()); 


    /*==========================================
            :: carousel
    ==========================================*/          
    PUS.carousel = function () {
        var owlslider = jQuery(".totalrecords");
        if (owlslider.length > 0) {
            owlslider.each(function () {
                var $this = $(this),
                $items = ($this.data('items')) ? $this.data('items') : 1,
                $loop = ($this.attr('data-loop')) ? $this.data('loop') : false,
                $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
                $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : true,
                $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : false,
                $autospeed = ($this.attr('data-autospeed')) ? $this.data('autospeed') : 5000,
                $smartspeed = ($this.attr('data-smartspeed')) ? $this.data('smartspeed') : 1000,
                $autohgt = ($this.data('autoheight')) ? $this.data('autoheight') : false,
                $space = ($this.attr('data-space')) ? $this.data('space') : 30,
                $animateOut = ($this.attr('data-animateOut')) ? $this.data('animateOut') : false;

                $(this).owlCarousel({
                    loop: $loop,
                    items: $items,
                    responsive: {
                        0: {
                            items: $this.data('xx-items') ? $this.data('xx-items') : 1,
                            space: $this.data('data-space') ? $this.data('data-space') : 0
                        },
                        480: {
                            items: $this.data('xs-items') ? $this.data('xs-items') : 1,
                            space: $this.data('data-space') ? $this.data('data-space') : 0
                        },
                        768: {
                            items: $this.data('sm-items') ? $this.data('sm-items') : 2,
                            space: $this.data('data-space') ? $this.data('data-space') : 0
                        },
                        980: {
                            items: $this.data('md-items') ? $this.data('md-items') : 3,
                            space: $this.data('data-space') ? $this.data('data-space') : 0
                        },
                        1200: {
                            items: $items
                        }
                    },
                    dots: $navdots,
                    space: $space,
                    autoplayTimeout: $autospeed,
                    smartSpeed: $smartspeed,
                    autoHeight: $autohgt,
                    margin: $space,
                    nav: $navarrow,
                    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                    autoplay: $autoplay,
                    autoplayHoverPause: true
                });
            });
        }
    }



    PUS.PanelFlag = function () {
        $(".flags-panel").click(function(){
            $(".right-panel-flags").removeClass("flags-active"); 
        });
        $(".toolbar-filter a.toolbar-link-filter").click(function(){
            $(".right-panel-flags").addClass("flags-active"); 
        });    
        $(".panel-overlay").click(function(){
            $(".right-panel-flags").removeClass("flags-active"); 
        });        
    }; 



    /*==========================================
            :: Document Ready
    ==========================================*/
    $(document).ready(function () {   
        PUS.carousel(), //carousel 
        PUS.PanelFlag()



        $.fn.datepicker.defaults.format = "mm/dd/yyyy";
        $('.datepicker').datepicker({
            startDate: '-3d'
        });

        $.fn.datepicker.defaults.format = "mm/dd/yyyy";
        $('.rangpicker').daterangepicker({
            autoUpdateInput: true, 
            opens: 'left'
        });

    });

})(window);

 
 
 

 