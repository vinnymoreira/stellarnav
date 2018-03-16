# StellarNav.js
jQuery responsive, lightweight, multi-level dropdown menu. Ideal solution for long navigation menus with lots of items.

<a href="http://vinnymoreira.com/stellarnav-js-demo/">Click here</a> to see StellarNav.js in action.

## Installation

### CSS
Include FontAwesome for the menu icons and the StellarNav stylesheet.
```html
<link rel="stylesheet" type="text/css" media="all" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" media="all" href="css/stellarnav.min.css">
```
### HTML
Add a `stellarnav` class to your menu div.
```html
<div class="stellarnav">
     <ul>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
     </ul>
</div>
```

### Javascript
Include `stellarnav.min.js` and call `stellarNav()`.
```javascript
<script type="text/javascript" src="js/stellarnav.js"></script>
<script type="text/javascript">
	jQuery(document).ready(function($) {
		jQuery('.stellarnav').stellarNav();
	});
</script>
```
## Options

Here's a list of available settings.

```javascript
jQuery('.stellarnav').stellarNav({
	theme: 'plain',
	breakpoint: 768,
	menuLabel: 'Menu',
	sticky: false,
	position: 'static',
	openingSpeed: 250,
	closingDelay: 250,
	showArrows: true,
	phoneBtn: '',
	locationBtn: '',
	closeBtn: false,
	scrollbarFix: false
});	
```

Attribute			| Type				| Default		| Description
---						| ---					| ---				| ---
`theme`		| *String*		| `plain`		| Adds default color to nav. [plain, light, dark]
`breakpoint`	| *Integer*		| `768`		| Number in pixels to determine when the nav should turn mobile friendly.
`menuLabel`	| *String*		| `Menu`		| Label (text) for the mobile nav.
`sticky`	| *Boolean*		| `false`		| Makes nav sticky on scroll.
`position`	| *String*		| `static`		| [static, top, left, right] - When set to 'top', this forces the mobile nav to be placed absolutely on the very top of page. When set to 'left' or 'right', mobile nav fades in/out from left or right, accordingly.  
`openingSpeed`	| *Integer*		| `250`		| Controls how fast the dropdowns open in milliseconds.
`closingDelay`	| *Integer*		| `250`		| Controls how long the dropdowns stay open for in milliseconds.
`showArrows`	| *Boolean*		| `true`		| Shows dropdown arrows next to the items that have sub menus.
`phoneBtn`	| *String*		| `[empty]`		| Adds a click-to-call phone link to the top of menu - i.e.: "18009084500".
`locationBtn`	| *String*		| `[empty]`		| Adds a location link to the top of menu - i.e.: "/location/", "http://site.com/contact-us/".
`closeBtn`	| *Boolean*		| `false`		| Adds a close button to the end of nav.
`scrollbarFix`	| *Boolean*		| `false`		| Fixes horizontal scrollbar issue on very long navs.

## Mega Dropdowns

The mega dropdown feature allows you to fully extend the width of the dropdown and group the sub-dropdown items by a specific number of columns. This is extremely useful when dealing large menus.

You can turn any dropdown into a mega dropdown menu by simply adding a class of `mega` and an html attribute of `data-columns` to the top-level item. The number of columns for the `data-columns` attribute that can be any integer from `2 to 8`. Example:

```html
<div class="stellarnav">
     <ul>
        <li class="mega" data-columns="4">
          <a href="#">Item</a>
          <a href="#">Item</a>
          <a href="#">Item</a>
          <a href="#">Item</a>
          <a href="#">Item</a>
          <a href="#">Item</a>
          <a href="#">Item</a>
          <a href="#">Item</a>
        </li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
     </ul>
</div>
```

**&ast;Note:** `data-columns` defaults to `4`. If you specify a number other than 2-8 or forget to add the `data-columns` attribute to the list item, the dropdown menu will automatically be divided into 4 columns.

## Extra

For long dropdown menus and for some of the last navigation items, you may use the class `drop-left` to the list item so that the dropdown drops leftward. This prevents menu from breaking the grid and getting a horizontal scrollbar.

```html
<div class="stellarnav">
     <ul>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
        <li class="drop-left"><a href="#">Last Dropdown Item</a>
        	<ul>
        		<li><a href="#">Item</a></li>
        		<li><a href="#">Item</a>
        			<ul>
        				<li><a href="#">Drop left menu item</a></li>
        				<li><a href="#">Drop left menu item</a></li>
        			</ul>
        		</li>
        	</ul>
        </li>
     </ul>
</div>
```

If this is not an option and you are still getting a scrollbar, you may also set the `scrollbarFix` option to `true`. 
