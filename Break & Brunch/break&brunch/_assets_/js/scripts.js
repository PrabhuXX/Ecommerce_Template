 /*-----------------------------------------------------------------------------------

	Theme Name: Break & Brunch
	Front-end developer: Prayagraj Behera
	Author Design: 
	Author URI: http://www.sayvirtual.com/
	Date: 14.03.2024

-----------------------------------------------------------------------------------*/

(function($) {

	'use strict';

	var $window = $(window),
		$body = $('body');

	/*!
	 * IE10 viewport hack for Surface/desktop Windows 8 bug
	 * Copyright 2014-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */

	// See the Getting Started docs for more information:
	// http://getbootstrap.com/getting-started/#support-ie10-width
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement('style');
		msViewportStyle.appendChild(
			document.createTextNode(
			  '@-ms-viewport{width:auto!important}'
			)
		); document.querySelector('head').appendChild(msViewportStyle);
	}

	// RZ Class
	if(typeof RZ !== "undefined"){
		if(RZ.login){
			$body.addClass("user-logged-in");
		} else{
			$body.addClass("user-not-logged-in");
		}
	}

	// Keyboard Navigation: Nav, flyout
	var isClick = false;
	$("#nav li a, #flyout  li a, a, button, .toggle, .toggle2").on('focusin', function(e) {
		if( isClick === false ) {
			$(".focused").removeClass("focused");
			$(e.currentTarget).parents("#nav li, #flyout li").addClass("focused");
			$(".opened:not(.focused) ul:visible,.opened2:not(.focused) ul:visible").slideUp().parent().removeClass("opened opened2");
		} else {
			$(".focused").removeClass("focused");
			isClick = false;
		}
	});

	// prevent focused class changes on click - This way arrows wont pop when clicking nav links
	$("#nav a,#flyout a").on('mousedown',function(){
		isClick = true;
	});

	// Search Toggle
	$('#search-toggle').on('click',function(e){
		$('#search').stop().slideToggle(200);
		$(this).toggleClass('fa-search fa-close');
	});

	// Navigation Toggle
	$("#nav-toggle").on("click", function(){
		$("#nav").stop().slideToggle();
		$(this).toggleClass("fa-bars fa-close");
	});

	// Menu Arrows and Toggles
	$("#nav >li>ul,#flyout >li>ul").addClass('first-level');
	$("#nav  li ul ul").addClass('second-level');
	$("#nav>li:has(ul)").each(function(){
		$('<a href="#" class="fa fa-angle-down toggle d-lg-none" tabindex="0" aria-haspopup="true" aria-expanded="false" id="dropdown-toggle-'+$(this).index()+'" aria-label="Show Dropdown for '+ $(this).find('a:first').text() +'"></a>').insertAfter($(this).find('a:first'));
		$(this).find('ul:first').attr('aria-labelledby', 'dropdown-toggle-'+$(this).index());
	});
	$('#nav li ul>li:has(ul)').each(function(index) {
		$('<a href="#" class="fa fa-angle-down toggle2 d-lg-none" tabindex="0" aria-haspopup="true" aria-expanded="false" id="sub-dropdown-toggle-'+index+'" aria-label="Show Dropdown for '+ $(this).find('a:first').text() +'"></a>').insertAfter($(this).find('a:first'));
		$(this).find('ul:first').attr('aria-labelledby', 'sub-dropdown-toggle-'+index);
	});
	$('#flyout >li:has(ul)').each(function() {
		$('<a href="#" class="fa fa-angle-down toggle d-lg-none" tabindex="0" aria-haspopup="true" aria-expanded="false" id="flyout-dropdown-toggle-'+$(this).index()+'" aria-label="Show Flyout for '+ $(this).find('a:first').text() +'"></a>').insertAfter($(this).find('a:first'));
		$(this).find('ul:first').attr('aria-labelledby', 'flyout-dropdown-toggle-'+$(this).index());
	});



	$(".toggle").on("click keydown",function(e) {
		if (e.keyCode === 13 || e.type === 'click') {
			e.preventDefault();
			var $parent = $(this).parent();
			var $parentLi = $parent.parent();
			$parent.toggleClass('opened');
			if($parent.addClass('active') && $(this).next('.first-level').is(":visible")){
				$(this).next('.first-level').slideUp();
				$parent.removeClass('active');
				$(this).attr({'aria-expanded': 'false'});
			} else {
				$(this).attr({'aria-expanded': 'true'});
				$(".first-level").slideUp("slow");
				$parent.addClass('active');
				$(this).next('.first-level').slideToggle();
			}
		}
	});
	$(".toggle2").on("click keydown",function(e) {
		if (e.keyCode === 13 || e.type === 'click') {
			e.preventDefault();
			var $parent = $(this).parent();
			var $parentLi = $parent.parent();
			$parent.toggleClass('opened2');
			if($parent.addClass('active') && $(this).next('.second-level').is(":visible")){
				$(this).next('.second-level').slideUp();
				$parent.removeClass('active');
				$(this).attr({'aria-expanded': 'false'});
			} else {
				$(this).attr({'aria-expanded': 'true'});
				$(".second-level").slideUp("slow");
				$parent.addClass('active');
				$(this).next('.second-level').slideToggle();
			}
		}
	});

	// close nav if left
	$(".desktop *").focus(function(e){
		var $opened = $(".opened");
		var $opened2 = $(".opened2");
		if( $opened.length > 0 || $opened2.length > 0 ) {
			if( $(".opened :focus").length < 1 ){
				$opened.children("ul").slideUp();
				$opened.removeClass("opened");
				$(".opened2").removeClass("opened2");
			}
			if( $(".opened2 :focus").length < 1 ){
				$opened2.children("ul").slideUp();
				$opened2.removeClass("opened2");
			}
		}
	});

	

	// Flyout
	var flyout = $('#flyout'),
		flyoutHeader = $('#flyout-header');

	if (flyout.text().length){
		flyoutHeader.append('<div id="flyout-toggle" class="d-lg-none"><i class="fa fa-bars"></i> Sub Menu</div>');
	}

	$("#flyout-toggle").on("click", function(){
		flyout.slideToggle();
		$(this).toggleClass("active");
	});
  

	/*
	* E-Notify Auto submit
	*/
	$.urlParam=function(n){var e=new RegExp("[?&]"+n+"=([^]*)").exec(window.location.href);return null==e?null:e[1]||0};
	var $enotify = $('iframe[src*="/revize/plugins/notify/notify.jsp"]');
	if( $enotify.length > 0 ){
		var emailStr = $.urlParam("email");
		if( emailStr != null ){
			$enotify.attr("src", $enotify.attr("src") + "&email=" + emailStr);
		}
	}

	// Make sure all calendars have unique ids
	$('iframe[name="calendar"]').each(function (index, calendar) {
		calendar.id = 'calendar-' + index;
	});

	// Start Frame Resizer
	function resizeIframe(height, frameElement) {
		if ( frameElement ) {
			frameElement.height = "";
			frameElement.height = height;
		}
	}

	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventHandler = window[eventMethod];
	var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
	eventHandler(messageEvent, function (e) {
		if ( Array.isArray(e.data) ) {
			if( e.data[0] === "setCalHeight" || e.data[0] === "setNotifyHeight") {
				var frames = document.querySelectorAll('iframe');
				for( var i = 0; i < frames.length; i++ ) {
					if( frames[i].contentWindow === e.source ){
						resizeIframe(e.data[1], frames[i]);
					}
				}
			}
		}
	});
	// End Frame Resizer

	// revizeWeather
	if( typeof $.fn.revizeWeather !== "undefined" ){
		$.fn.revizeWeather({
			zip: '60453',
			city_name: '',
			unit: 'f',
			success: function(weather) {
				var date = new Date();
				date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
				var html = '<span>'+date+'</span> <span class="forecast">'+weather.temp+'&deg; '+weather.forecast+'</span>';
				html += '<i class="'+weather.icon+'"></i>';

				$("#weather").html(html);
			},
			error: function(error) {
				// better to just hide the secion if there is an error
				$('.weather').hide();
				console.log(error);
			}
		});
	}

	// Alert Close Caching
	if ($("div.alert").length) {
		var hide = window.sessionStorage && parseInt(window.sessionStorage.getItem("alertClosed")) > 1;
		if (!hide || $(".user-logged-in").length != 0) {
			$("div.alert").addClass('show');
		}
		$("div.alert button.close").on('click', function(e) {
			if (window.sessionStorage) {
				window.sessionStorage.setItem("alertClosed",parseInt(window.sessionStorage.getItem("alertClosed")||0)+1);
			}
		});
	}

	var $translateButton = $('#translate-button');
	$translateButton.on('keydown click', function(e){
		if (e.keyCode === 13 || e.type === 'click') {
			$('#translation-links ul').stop().fadeToggle();
			$translateButton.attr('aria-expanded', !('true' === $translateButton.attr('aria-expanded')));
		}
	});

	$('#translation-links ul').on('mouseleave',function(){
		$(this).fadeOut();
		$translateButton.attr('aria-expanded', false);
	});

	function removeCookieString(value, domain) {
		domain = domain ? 'domain='+domain+'; ' : '';
		return value+'; expires=Thu, 01 Jan 1970 00:00:01 GMT; '+domain+'path=/';
	}

	function unsetGoogtransCookie() {
		for (var domains = window.location.hostname.split('.'); domains.length >= 2; domains.shift()) {
			var cookieString = removeCookieString('googtrans=unset', domains.join('.'));
			document.cookie=cookieString;
			if	(domains.length === 2) {
				cookieString = removeCookieString('googtrans=unset', '.'+domains.join('.'));
				document.cookie=cookieString;
			}
		}
		document.cookie=removeCookieString('googtrans=unset');
	}

	if (document.cookie.split(';').some(function(item) { return item.trim().startsWith('googtrans=/auto/en'); })) {
		unsetGoogtransCookie();
	}



	 // Translate Script
	var translateURL =
	"//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
	$.getScript(translateURL);
	$('#translation-links a').click(function() {
		var lang = $(this).data('lang');
		var $frame = $('iframe.skiptranslate');
		if (lang === 'English') {
			$frame.contents().find('span.text:contains("English")').parent().parent().get(0).click();
		return false;
		}
		if (!$frame.length) {
			return false;
		}
		var $el = $frame.contents().find('span.text:contains(' + lang +')').parent().parent().get(0);
			console.log($el);
		if (!$el) {
			$frame.contents().find('span.text:contains("English")').parent().parent().get(0).click();
		}
		$el.click();
		return false;
	});
    
	// Tiny Slider
	if (typeof tns !== "undefined") {
		$('.tiny-slider').each(function(i, el) {
			tns({
				autoplay: true,
				autoplayTimeout: 8000,
				container: el,
				items: 1,
				lazyload: true,
				lazyloadSelector: '.tns-lazy-img', // accompanied with data src or data-style
				mode: "gallery",
				preventScrollOnTouch: 'force',
                nav: false,
                controlsText: [
                    '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
                    '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
                ],
                autoplayButtonOutput: false
			});
		});

		$('#menu-wrap .tiny-carousel').each(function(i, el) {
			var newsCount = $('#menu-wrap .menu').length;
			var $el = $(el);
			var tinyItemCount = $el.children().length;
			var tinyItemData = $el.data('tinyItems') ? $el.data('tinyItems') : 6;
			tns({
				container: el,
				items: Math.min(tinyItemCount, tinyItemData),
				lazyload: true,
				lazyloadSelector: '.tns-lazy-img', // accompanied with data src or data-style
				preventScrollOnTouch: 'force',
				nav: false,
				speed:500,
				controlsText: [
					'<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
                    '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
				],
				autoplayButtonOutput: false,
				responsive: {
					991: {
						items: newsCount >= 3 ? 3 : newsCount
					},
					767: {
						items: newsCount >= 2 ? 2 : newsCount
					},
					0: {
						items: newsCount >= 1 ? 1 : newsCount
					}
				},
				loop: false,
				gutter:77
			});
		});

		$('#brunch-wrap .tiny-carousel').each(function(i, el) {
			var newsCount = $('#brunch-wrap .brunch').length;
			var $el = $(el);
			var tinyItemCount = $el.children().length;
			var tinyItemData = $el.data('tinyItems') ? $el.data('tinyItems') : 6;
			tns({
				container: el,
				items: Math.min(tinyItemCount, tinyItemData),
				lazyload: true,
				lazyloadSelector: '.tns-lazy-img', // accompanied with data src or data-style
				preventScrollOnTouch: 'force',
				nav: false,
				speed:500,
				controlsText: [
					'<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
                    '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
				],
				autoplayButtonOutput: false,
				responsive: {
					991: {
						items: newsCount >= 3 ? 3 : newsCount
					},
					767: {
						items: newsCount >= 2 ? 2 : newsCount
					},
					0: {
						items: newsCount >= 1 ? 1 : newsCount
					}
				},
				loop: false,
				gutter:77
			});
		});
	}

	// Responsive Tables
	$('.post table:not(.layout-table):not(.not-responsive)').wrap('<div class="table-responsive"></div>');
	$('.layout-table').attr('role', 'presentation');

	window.onscroll = function() {scrollFunction()};

		function scrollFunction() {
		if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
			document.getElementById("header-btm").classList.remove("header-btm-content");
		} else {
			document.getElementById("header-btm").classList.add("header-btm-content");
		}
		}

		$(window).on('scroll', function(){

            if($(window).width() > 992){

                if($(window).scrollTop() > 50){

                    $('header').addClass('sticky');
                } else {

                    $('header').removeClass('sticky');

                }

            }

        })


	$window.ready(function(){

		function windowResizer() {
			if ($window.width() < 992) {
				// Insert needed for mobile
			} else{
				// Insert needed for desktop
				// slider margin-top
				var headerHeight = $('header').height();
				$('#slider').css('margin-top',headerHeight);
			}
		}
		windowResizer();
		$window.resize(windowResizer);

        
        // nav mega menu
        $('#nav').addClass('mega');


		


			
		// fillside
		function fillSide(){
			$('.fillRight').each(function(){
				var cContainer = parseFloat($(this).closest('.container').css('margin-right')) + 15;
				// console.log('fillright', cContainer)
				$('.fillRight').css('margin-right',-cContainer);
				$('.fillRight.withPadding').css('padding-right',cContainer);
			});
			$('.fillLeft').each(function(){
				var cContainer = parseFloat($(this).closest('.container').css('margin-left')) + 15;
				// console.log('fillleft', cContainer)
				$('.fillLeft').css('margin-left',-cContainer);
				$('.fillLeft.withPadding').css('padding-left',cContainer);
			});
		}
	
	
		fillSide();
		$window.resize(fillSide);


        // closes the alert banner on click
        $('#alert-banner-close').click(function(e){
            e.preventDefault();
            $('#alert-banner').stop().slideUp();
        })
        
		// matchHeight
		if(typeof $.fn.matchHeight !== "undefined"){
			$('.equal').matchHeight({
				//defaults
				byRow: true,
				property: 'height', // height or min-height
				target: null,
				remove: false
			});
		}


			//#Smooth Scrolling
			$('a[href*="#"]').not('[href="#"]').not('[href*="#collapse"]').not('.faq-header').click(function (event) {
				if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
					if (target.length) {
						event.preventDefault();
						$('html,body').animate({
							scrollTop: target.offset().top
						}, 1000, function () {
							var $target = $(target);
							$target.focus();
							if ($target.is(":focus")) {
								return false;
							} else {
								$target.attr('tabindex', '-1');
								$target.focus();
								$target.removeAttr('tabindex');
							};
						});
					}
				}
			});

			// scroll top by click
			$(document).ready(function(){ 
				$('#skip').click(function(){
						$("html, body").animate({ scrollTop: $('#main').offset().top }, 1000);
						return false;
				});
			});
	

		/*global jQuery */
		/*!
		* FlexVerticalCenter.js 1.0
		*
		* Copyright 2011, Paul Sprangers http://paulsprangers.com
		* Released under the WTFPL license
		* http://sam.zoy.org/wtfpl/
		*
		* Date: Fri Oct 28 19:12:00 2011 +0100
		*/
		$.fn.flexVerticalCenter = function( options ) {
			var settings = $.extend({
				cssAttribute:   'margin-top', // the attribute to apply the calculated value to
				verticalOffset: 0,            // the number of pixels to offset the vertical alignment by
				parentSelector: null,         // a selector representing the parent to vertically center this element within
				debounceTimeout: 25,          // a default debounce timeout in milliseconds
				deferTilWindowLoad: false     // if true, nothing will take effect until the $(window).load event
			}, options || {});

			return this.each(function(){
				var $this   = $(this); // store the object
				var debounce;

				// recalculate the distance to the top of the element to keep it centered
				var resizer = function () {

					var parentHeight = (settings.parentSelector && $this.parents(settings.parentSelector).length) ?
						$this.parents(settings.parentSelector).first().height() : $this.parent().height();

					$this.css(
						settings.cssAttribute, ( ( ( parentHeight - $this.height() ) / 2 ) + parseInt(settings.verticalOffset) )
					);
				};

				// Call on resize. Opera debounces their resize by default.
				$(window).resize(function () {
					clearTimeout(debounce);
					debounce = setTimeout(resizer, settings.debounceTimeout);
				});

				if (!settings.deferTilWindowLoad) {
					// call it once, immediately.
					resizer();
				}

				// Call again to set after window (frames, images, etc) loads.
				$(window).on('load', function () {
					resizer();
				});

			});

		};
		$('.v-align').flexVerticalCenter();

	}); // Ready

})(jQuery);
