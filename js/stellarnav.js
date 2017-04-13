/*
 * Stellarnav.js 1.0.0
 * jQuery responsive multi-level dropdown menu designed to do most of the heavy CSS work for you.    
 *
 * Copyright (c) 2016 Vinny Moreira - http://vinnymoreira.com
 *
 * Released under the MIT license
 */
(function($) {
	$.fn.stellarNav = function(options, width, breakpoint) {

		var $nav, $width, $breakpoint;
		nav = $(this);
		width = $(window).width();

		// default settings
		var settings = $.extend( {
			theme     : 'plain', // adds default color to nav. (light, dark)
			breakpoint: 768, // number in pixels to determine when the nav should turn mobile friendly
			phoneBtn: false, // adds a click-to-call phone link to the top of menu - i.e.: "18009084500"
	    	locationBtn: false, // adds a location link to the top of menu - i.e.: "/location/", "http://site.com/contact-us/"
			sticky     : false, // makes nav sticky on scroll (desktop only)
			position: 'static', // 'static' or 'top' - when set to 'top', this forces the mobile nav to be placed absolutely on the very top of page 
			showArrows: true, // shows dropdown arrows next to the items that have sub menus
			closeBtn     : false, // adds a close button to the end of nav
			scrollbarFix: false // fixes horizontal scrollbar issue on very long navs
		}, options );

		return this.each( function() {

			// defines black or white themes
			if (settings.theme == 'light' || settings.theme == 'dark') {
				nav.addClass(settings.theme);
			}

			if (settings.breakpoint) {
				breakpoint = settings.breakpoint;
			}

			// css classes for main menu mobile buttons
			if( settings.phoneBtn && settings.locationBtn ) {
				var cssClass = 'third';
			} else if( settings.phoneBtn || settings.locationBtn ) {
				var cssClass = 'half';
			} else {
				var cssClass = 'full';
			}

			// adds the toggle button to open and close nav 
			nav.prepend('<a href="#" class="menu-toggle ' + cssClass + '"><i class="fa fa-bars"></i> Menu</a>');

			// adds a click-to-call link
			if (settings.phoneBtn) {

				var btn = '<a href="tel:'+ settings.phoneBtn +'" class="call-btn-mobile ' + cssClass + '"><i class="fa fa-phone"></i> <span>Call us</span></a>';

				nav.find('a.menu-toggle').after(btn);

			}

			// adds a location page link to the beginning of nav
			if (settings.locationBtn) {
				
				var btn = '<a href="'+ settings.locationBtn +'" class="location-btn-mobile ' + cssClass + '" target="_blank"><i class="fa fa-map-marker"></i> <span>Location</span></a>';

				nav.find('a.menu-toggle').after(btn);

			}

			// Makes nav sticky on scroll
			if (settings.sticky) {
				navPos = nav.offset().top;			
				if(width >= breakpoint) {
					$(window).bind('scroll', function() {
				         if ($(window).scrollTop() > navPos) {
				             nav.addClass('fixed');
				         }
				         else {
				             nav.removeClass('fixed');
				         }
				    });
				}
			}

			if (settings.position == 'top') {
				nav.addClass('top');
			}

			if (!settings.showArrows) {
				nav.addClass('hide-arrows');
			}

			if (settings.closeBtn) {
				// adds a link to end of nav to close it
				nav.find('ul:first').append('<li><a href="#" class="close-menu"><i class="fa fa-close"></i> Close Menu</a></li>');
			}

			if (settings.scrollbarFix) {
				$('body').addClass('stellarnav-noscroll-x');
			}
					
			// opens and closes menu			
			$('.menu-toggle').on('click', function(e) {
				e.preventDefault();
				nav.find('ul:first').stop(true, true).slideToggle(250);
				nav.toggleClass('active');
			});

			// actives the close button
			$('.close-menu').click(function() {
				nav.find('ul:first').stop(true, true).slideUp(250).toggleClass('active');
				nav.removeClass('active');
			});
			

			// adds toggle button to li items that have children
			nav.find('li a').each(function() {
				if ($(this).next().length > 0) {
					$(this).parent('li').addClass('has-sub').append('<a class="dd-toggle" href="#"><i class="fa fa-plus"></i></a>');
				}
			});

			// expands the dropdown menu on each click 
			nav.find('li .dd-toggle').on('click', function(e) {
				e.preventDefault();
				//$(this).parent('li').toggleClass('hover');
				$(this).parent('li').children('ul').stop(true, true).slideToggle(250);
				$(this).parent('li').toggleClass('open');
			});

			var resetTriggers = function() {
				nav.find('li').unbind('mouseenter');
				nav.find('li').unbind('mouseleave');
			}
			
			var setTriggers = function() {
				nav.find('li').on('mouseenter', function(){
					$(this).addClass('hover');
					$(this).children('ul').stop(true, true).slideDown(250);
				});
				nav.find('li').on('mouseleave', function(){
					$(this).removeClass('hover');
					$(this).children('ul').stop(true, true).slideUp(250);
				});
			}
			windowCheck();
			
			// check browser width in real-time
			function windowCheck() {
				var browserWidth = window.outerWidth;
				
				if(browserWidth <= breakpoint) {
					// mobile/tablet nav
					
					resetTriggers();
					nav.addClass('mobile');
					nav.removeClass('desktop');

					// closes the menu when resizing window back to desktop
					if( !nav.hasClass('active') && nav.find('ul:first').is(':visible') ) {
						//nav.addClass('active');
						nav.find('ul:first').hide();
					}

				} else {
					// desktop nav
					nav.addClass('desktop');					
					nav.removeClass('mobile');

					if(nav.hasClass('active')) {
						nav.removeClass('active');
					}

					// ensures stellarnav is visible after resizing window
					if( !nav.hasClass('active') && nav.find('ul:first').is(':hidden') ) {
						nav.find('ul:first').show();
					}

					// hides items that were open on mobile
					$('li.open').removeClass('open').find('ul:visible').hide();

					resetTriggers();
					setTriggers();
				}
			}

			$(window).on('resize', function() {
				windowCheck();
			});
		});
	}
}(jQuery));
