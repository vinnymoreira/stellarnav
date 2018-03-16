/*
 * Stellarnav.js 2.3.0
 * Responsive, lightweight, multi-level dropdown menu.
 * Copyright (c) 2018 Vinny Moreira - http://vinnymoreira.com
 * Released under the MIT license
 */
(function($) {
	$.fn.stellarNav = function(options, width, breakpoint) {

		var $nav, $width, $breakpoint, $parentItems;
		nav = $(this);
		width = $(window).width();

		// default settings
		var settings = $.extend( {
			theme: 'plain', // adds default color to nav. (light, dark)
			breakpoint: 768, // number in pixels to determine when the nav should turn mobile friendly
			menuLabel: 'Menu', // label for the mobile nav
			sticky: false, // makes nav sticky on scroll (desktop only)
			position: 'static', // 'static', 'top', 'left', 'right' - when set to 'top', this forces the mobile nav to be placed absolutely on the very top of page
			openingSpeed: 250, // how fast the dropdown should open in milliseconds
			closingDelay: 250, // controls how long the dropdowns stay open for in milliseconds
			showArrows: true, // shows dropdown arrows next to the items that have sub menus
			phoneBtn: '', // adds a click-to-call phone link to the top of menu - i.e.: "18009084500"
	    locationBtn: '', // adds a location link to the top of menu - i.e.: "/location/", "http://site.com/contact-us/"
			closeBtn: false, // adds a close button to the end of nav
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

			if (settings.menuLabel) {
				menuLabel = settings.menuLabel;
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
			if ( settings.position == 'right' || settings.position == 'left' ) {
				nav.prepend('<a href="#" class="menu-toggle"><i class="fa fa-bars"></i> ' + menuLabel + '</a>');
			} else {
				nav.prepend('<a href="#" class="menu-toggle ' + cssClass + '"><i class="fa fa-bars"></i> ' + menuLabel + '</a>');
			}

			// adds a click-to-call link
			if (settings.phoneBtn && !(settings.position == 'right' || settings.position == 'left')) {
				var btn = '<a href="tel:'+ settings.phoneBtn +'" class="call-btn-mobile ' + cssClass + '"><i class="fa fa-phone"></i> <span>Call Us</span></a>';
				nav.find('a.menu-toggle').after(btn);
			}

			// adds a location page link to the beginning of nav
			if (settings.locationBtn && !(settings.position == 'right' || settings.position == 'left')) {
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

			if (settings.position == 'left' || settings.position == 'right') {
				var closeBtn = '<a href="#" class="close-menu ' + cssClass + '"><i class="fa fa-close"></i> <span>Close</span></a>';
				var phoneBtn = '<a href="tel:'+ settings.phoneBtn +'" class="call-btn-mobile ' + cssClass + '"><i class="fa fa-phone"></i></a>';
				var locationBtn = '<a href="'+ settings.locationBtn +'" class="location-btn-mobile ' + cssClass + '" target="_blank"><i class="fa fa-map-marker"></i></a>';

				nav.find('ul:first').prepend(closeBtn);

				if (settings.locationBtn) {
					nav.find('ul:first').prepend(locationBtn);
				}
				if (settings.phoneBtn) {
					nav.find('ul:first').prepend(phoneBtn);
				}
			}

			if (settings.position == 'right') {
				nav.addClass('right');
			}

			if (settings.position == 'left') {
				nav.addClass('left');
			}

			if (!settings.showArrows) {
				nav.addClass('hide-arrows');
			}

			if (settings.closeBtn && !(settings.position == 'right' || settings.position == 'left')) {
				// adds a link to end of nav to close it
				nav.find('ul:first').append('<li><a href="#" class="close-menu"><i class="fa fa-close"></i> Close Menu</a></li>');
			}

			if (settings.scrollbarFix) {
				$('body').addClass('stellarnav-noscroll-x');
			}

			// opens and closes menu
			$('.menu-toggle').on('click', function(e) {
				e.preventDefault();

				// if nav position is left or right, uses fadeToggle instead of slideToggle
				if (settings.position == 'left' || settings.position == 'right') {
					nav.find('ul:first').stop(true, true).fadeToggle(settings.openingSpeed);
					nav.toggleClass('active');

					if(nav.hasClass('active') && nav.hasClass('mobile')) {
						// closes the menu when clicked outside of it
						$(document).on('click', function(event) {
							// ensures menu hides only on mobile nav
							if(nav.hasClass('mobile')) {
							  	if (!$(event.target).closest(nav).length) {
							  		nav.find('ul:first').stop(true, true).fadeOut(settings.openingSpeed);
							  		nav.removeClass('active');
								}
							}
						});
					}

				} else {
					// static position - normal open and close animation
					nav.find('ul:first').stop(true, true).slideToggle(settings.openingSpeed);
					nav.toggleClass('active');
				}
			});

			// activates the close button
			$('.close-menu').click(function() {

				nav.removeClass('active');

				if (settings.position == 'left' || settings.position == 'right') {
					nav.find('ul:first').stop(true, true).fadeToggle(settings.openingSpeed);
				} else {
					nav.find('ul:first').stop(true, true).slideUp(settings.openingSpeed).toggleClass('active');
				}
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
				$(this).parent('li').children('ul').stop(true, true).slideToggle(settings.openingSpeed);
				$(this).parent('li').toggleClass('open');
			});

			var resetTriggers = function() {
				nav.find('li').unbind('mouseenter');
				nav.find('li').unbind('mouseleave');
			}

			// defines top level items
			parentItems = nav.find('> ul > li');

			var setTriggers = function() {
				$(parentItems).each(function() {
					if( $(this).hasClass('mega') ) {
						// mega dropdown
						$(this).on('mouseenter', function(){
							$(this).find('ul').first().stop(true, true).slideDown(settings.openingSpeed);
						});
						$(this).on('mouseleave', function(){
							$(this).find('ul').first().stop(true, true).slideUp(settings.openingSpeed);
						});
					} else {
						// normal dropdown
						// first-level
						$(this).on('mouseenter', function(){
							$(this).children('ul').stop(true, true).slideDown(settings.openingSpeed);
						});
						$(this).on('mouseleave', function(){
							$(this).children('ul').stop(true, true).delay(settings.closingDelay).slideUp(settings.openingSpeed);
						});

						// second level and below
						$(this).find('li.has-sub').on('mouseenter', function(){
							$(this).children('ul').stop(true, true).slideDown(settings.openingSpeed);
						});
						$(this).find('li.has-sub').on('mouseleave', function(){
							$(this).children('ul').stop(true, true).delay(settings.closingDelay).slideUp(settings.openingSpeed);
						});
					}
				});
			}

			windowCheck();

			// check browser width in real-time
			function windowCheck() {
				var browserWidth = window.innerWidth;

				if(browserWidth <= breakpoint) {
					// mobile/tablet nav

					resetTriggers();
					nav.addClass('mobile');
					nav.removeClass('desktop');

					// closes the menu when resizing window back to desktop
					if( !nav.hasClass('active') && nav.find('ul:first').is(':visible') ) {
						nav.find('ul:first').hide();
					}

					// resets all the styles back to normal that are added on the desktop for the mega dropdown
					nav.find('li.mega').each(function() {
						$(this).find('ul').first().removeAttr('style');
						$(this).find('ul').first().children().removeAttr('style');
					});

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

					// mega dropdown
					navWidth = 0;

					// gets the initial left position of nav - needed to align mega dropdowns to the same left position
					//navIniPos = nav.find('li').first().offset().left;
					navIniPos = 0;

					$(parentItems).each(function() {
			    		// calculates the nav width based on the sum of all top-level items
			    		navWidth += $(this)[0].getBoundingClientRect().width;
						navWidth = Math.round(navWidth);

						if($(this).hasClass('mega')) {
							// left aligns mega dropdown with nav
							$(this).find('ul').first().css({'left': navIniPos});

							// gets the data-column attribute and divides the columns equally
							numCols = $(this).attr('data-columns');
							if(numCols==2) {
								$(this).find('li.has-sub').width('50%');
							} else if (numCols==3) {
								$(this).find('ul').first().children().width('33.33%');
							} else if (numCols==4) {
								$(this).find('ul').first().children().width('25%');
							} else if (numCols==5) {
								$(this).find('ul').first().children().width('20%');
							} else if (numCols==6) {
								$(this).find('ul').first().children().width('16.66%');
							} else if (numCols==7) {
								$(this).find('ul').first().children().width('14.28%');
							} else if (numCols==8) {
								$(this).find('ul').first().children().width('12.5%');
							} else {
								// defaults to 4 column
								$(this).find('ul').first().children().width('25%');
							}
						}

					});

					// defines the mega dropdown width to be the same as nav width
					if(parentItems.hasClass('mega')) {
						nav.find('li.mega ul').css({'max-width':navWidth});
					}
					// end mega dropdown

				} // end desktop nav
			} // windowCheck()

			$(window).on('resize', function() {
				windowCheck();
			});

		});
	}
}(jQuery));
